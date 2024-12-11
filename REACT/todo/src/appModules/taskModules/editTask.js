// Importowanie potrzebnych modułów
import resetInputValues from "../inputModules/resetInputValues";
import checkInputData from "../inputModules/checkInputData";
export default async function editTask(
  id,
  inputState,
  changeInputState,
  oldTaskTitle,
  closeEditTaskWindow,
  changeTaskState,
  changeTaskList
) {
  // Zmienna przechowująca referencje do okna edycji zadania

  const window = document.querySelector(`#${id}_editTask`);
  // Zmienne przechowujące dane do edycji zadania
  const newTaskTitle = inputState[`${id}_newTaskTitle`];
  const newDeadlineDate = inputState[`${id}_newDeadlineDate`];
  const newTaskPriority = inputState[`${id}_newTaskPriority`];
  const newTaskDescription = inputState[`${id}_newTaskDescription`];
  const newTaskCategory = inputState[`${id}_newTaskCategory`];
  console.log(newTaskCategory);
  // Zmienna przechowująca informacje czy wprowadzone dane są poprawne
  const ifValidInputData = checkInputData(
    window,
    newTaskTitle,
    newDeadlineDate
  );
  // Spełnia się jeżeli nie są
  if (ifValidInputData == "error") {
    return false;
  }
  // Obiekt z danyni do edycji zadania
  const dataToSend = {
    newTaskTitle: newTaskTitle,
    newTaskDescription: newTaskDescription,
    newDeadlineDate: newDeadlineDate,
    newTaskPriority: newTaskPriority,
    newTaskCategory: newTaskCategory,
    oldTaskTitle: oldTaskTitle,
  };
  // Zmienna przechowująca odpowiedź serwera na request o edycje zadania
  const response = await fetch("http://localhost:3500/editTask", {
    method: "POST",
    body: new URLSearchParams({ editedData: JSON.stringify(dataToSend) }),
    credentials: "include",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
  });
  // Spełnia się jeżeli status odpowiedzi nie jest równy 200
  if (response.status !== 200) {
    if (response.status == 401 || response.status == 403) {
      await fetch("http://localhost:3500/logout", { credentials: "include" });
      return (window.location.href = "http://localhost:3500/");
    }
  }
  // Pobieranie zaktualizowanych zadań z bazy danych
  const newTasks = await response.json();
  // Ustawienie taskList na pobrane zadania z bazy danych
  changeTaskList(newTasks.tasks);
  // Edycja zadania w liście zadań
  changeTaskState((prevTaskState) => {
    const editedTask = {
      ...prevTaskState,
      taskTitle: newTaskTitle,
      taskDescription: newTaskDescription,
      taskPriority: newTaskPriority,
      taskCategory: newTaskCategory,
      deadlineDate: newDeadlineDate,
    };
    return editedTask;
  });
  // Zresetowanie wartości pól edycji
  resetInputValues(changeInputState, id, {
    taskTitle: newTaskTitle,
    taskDescription: newTaskDescription,
    taskPriority: newTaskPriority,
    taskCategory: newTaskCategory,
    deadlineDate: newDeadlineDate,
  });

  // Zamknięcie okna do edycji zadania
  return closeEditTaskWindow(id);
}
