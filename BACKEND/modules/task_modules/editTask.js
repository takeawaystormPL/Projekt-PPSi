// Importowanie potrzebnych modułów
const mongoose = require("mongoose");
const taskModel = require("../mongoDB/Models_and_schemas/taskModel");
// Eksportowanie funkcji edytującej zadanie
module.exports = async function editTask(
  mongooseURI,
  oldTaskTitle,
  newTaskTitle,
  newDeadlineDate,
  newTaskDescription,
  newTaskPriority,
  newTaskCategory
) {
  try {
    // Połączenie z bazą danych
    await mongoose.connect(mongooseURI);
    // Zmienna przechowująca informacje czy zadanie z podanym tytułem istnieje
    const taskToEdit = await taskModel.findOne({ taskTitle: oldTaskTitle });
    // Spełnia się jeżeli nie istnieje
    if (!taskToEdit)
      return {
        status: 404,
        message: "Nie ma zadania z takim tytułem",
      };
    await taskModel.findOneAndUpdate(
      { taskTitle: oldTaskTitle },
      {
        taskTitle: newTaskTitle,
        deadlineDate: newDeadlineDate,
        taskDescription: newTaskDescription,
        taskPriority: newTaskPriority,
        taskCategory: newTaskCategory,
      }
    );
    // Wiadomość zwrotna
    return {
      status: 200,
      message: "Zaktualizowano dane zadania",
    };
  } catch (err) {
    // Spełnia się jeżeli wystąpi błąd wewnętrzny serwera
    return {
      status: 500,
      message: err.message,
    };
  }
};
