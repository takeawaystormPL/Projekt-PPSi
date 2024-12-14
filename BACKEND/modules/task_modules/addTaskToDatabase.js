// Pobranie potrzebnych modułów
const mongoose = require("mongoose");
const taskModel = require("../mongoDB/Models_and_schemas/taskModel");
// Eksportowanie funkcji dodawania zadania do bazy danych
module.exports = async function addTaskToDatabase(mongooseURI, data) {
  try {
    // Połączenie z bazą danych
    await mongoose.connect(mongooseURI);
    console.log(data);
    // Zmienna przechowująca zadanie,które ma zostać dodane
    const task = new taskModel({
      taskTitle: data.taskTitle,
      taskDescription: data.taskDescription,
      taskStatus: data.taskStatus,
      dateAdded: data.dateAdded,
      taskPriority: data.taskPriority,
      taskCategory: data.taskCategory,
      deadlineDate: data.deadlineDate,
      username: data.username,
    });
    // Sprawdzenie czy zadanie z taką nazwą już istnieje
    const ifSameTaskExists = await taskModel.findOne({
      taskTitle: task.taskTitle,
      taskDescription: data.taskDescription,
      taskCategory: data.taskCategory,
      deadlineDate: data.deadlineDate,
    });
    // Spełnia się jeżeli istnieje
    if (ifSameTaskExists) {
      return {
        status: 409,
        message: "Zadanie z tą nazwą już istnieje",
      };
    }
    // Wysłanie zadania do bazy danych
    await task.save();
    // Wiadomość zwrotna
    return {
      status: 200,
      message: "Utworzono zadanie",
    };
  } catch (err) {
    // Spełnia sie jeżeli wystąpił wewnętrzny bład serwera
    return {
      status: 500,
      message: err.message,
    };
  }
};
