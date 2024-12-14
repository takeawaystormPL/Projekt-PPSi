// Eksportowanie funkcji sprawdzającej czy zadanie o danym tytule juz istnieje
export default function checkIfSameTaskExists(taskList, newTask) {
  // Zmienna przechowująca informację czy zadanie o danym tytule już istnieje
  const ifExists = taskList.find((task) => findSameTask(newTask, task));
  // Pętla sprawdzająca tablicę z zadaniami
  console.log(ifExists);
  return ifExists;
}
function findSameTask(newTask, task) {
  // Spełnia się jeżeli tytuł nie jest taki sam
  if (task.taskTitle !== newTask.taskTitle) {
    return false;
  }
  // Spełnia się jeżeli data nie jest taka sama
  if (task.deadlineDate !== newTask.deadlineDate) {
    return false;
  }
  // Spełnia się jeżeli kategoria zadania nie jest taka sama
  if (task.taskCategory !== newTask.taskCategory) {
    return false;
  }
  // Spełnia się jeżeli opis zadania nie jest taki sam
  if (task.taskDescription !== newTask.taskDescription) {
    return false;
  }
  return task;
}
