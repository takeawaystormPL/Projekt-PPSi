// Importowanie potrzebnych modułów
import deleteTasksFromDatabase from "../databaseModules/deleteTasksFromDatabase";
// Funkcja usuwająca zadania
export default function deleteTasks(changeTaskList, taskData = null) {
  let tasksToDelete;
  let updatedTaskList;
  changeTaskList((prevTaskList) => {
    // Spełnia się jeżeli funkcja ma usunąć kilka zadań
    if (taskData == null) {
      // Zmienna przechowująca zadania do usunięcia
      tasksToDelete = prevTaskList.filter((el) => el.taskStatus == true);
      // Zmienna przechowująca liste zadań bez usuniętych zadań
      updatedTaskList = prevTaskList.filter((el) => el.taskStatus !== true);
    } else {
      const { taskTitle, deadlineDate, taskDescription, taskCategory } =
        taskData;
      // Zmienna przechowująca zadania do usunięcia
      tasksToDelete = prevTaskList.filter(
        (el) =>
          el.taskTitle == taskTitle &&
          el.taskDescription == taskDescription &&
          el.deadlineDate == deadlineDate &&
          el.taskCategory == taskCategory
      );
      // Zmienna przechowująca liste zadań bez usuniętych zadań
      updatedTaskList = prevTaskList.filter((el) => el !== tasksToDelete[0]);
    }
    // Usunięcie zadań
    return updatedTaskList;
  });
  console.log(tasksToDelete);
  // Usunięcie zadań z bazy danych
  return deleteTasksFromDatabase(tasksToDelete);
}
