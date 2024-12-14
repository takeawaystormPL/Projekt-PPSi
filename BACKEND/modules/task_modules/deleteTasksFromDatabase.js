// Importowanie potrzebnych modułów
const mongoose = require("mongoose");
const taskModel = require("../mongoDB/Models_and_schemas/taskModel");
// Eksportowanie funkcji usuwającej zadania z bazy danych
module.exports = async function deleteTasksFromDatabase(mongooseURI, tasks) {
  console.log(tasks);
  try {
    // Połązcenie z bazą danych
    await mongoose.connect(mongooseURI);
    // Przechodzenie przez każdy element tablicy z zadaniami do usunięcia i usunięcie go
    tasks.forEach(async (task) => {
      await taskModel.deleteOne({
        taskTitle: task.taskTitle,
        taskDescription: task.taskDescription,
        deadlineDate: task.deadlineDate,
        taskCategory: task.taskCategory,
      });
    });
    // Wiadomość zwrotna
    return {
      status: 200,
      message: "Usunięto wykonane zadania",
    };
  } catch (err) {
    // Spełnia się jeżeli wystąpił wewnętrzny błąd serwera
    return {
      status: 500,
      message: err.message,
    };
  }
};
