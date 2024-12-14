// Funkcja resetująca pola do wprowadzania danych
export default function resetInputValues(
  changeInputValues,
  whichInput,
  editedTaskData = {}
) {
  // Zmienne przechowujące referencje do pól edycyjnych
  let taskTitleInput = document.querySelector("#taskTitle");
  let taskDescriptionInput = document.querySelector("#taskDescription");
  let taskDateInput = document.querySelector("#deadlineDate");
  // Spełnia się jeżeli funkcje wywołuje okno dodawawania zadania
  if (whichInput == "addTask") {
    // Wyzerowanie state'u pól edycyjnych
    changeInputValues({
      taskTitle: "",
      taskDescription: "",
      taskPriority: "2",
      taskCategory: "1",
      deadlineDate: "",
    });
    // Wyzerowanie widoku pól edycyjnych
    taskTitleInput.value = "";
    taskDescriptionInput.value = "";
    taskDateInput.value = "";
    return;
  }
  // Spełnia się jeżeli funkcje wywołujo okno edycji zadania
  if (whichInput !== "filter") {
    // Przypisanie do zmiennych referencji do pól edycyjnych z okna edycji zadania
    taskTitleInput = document.querySelector(`#${whichInput}_newTaskTitle`);
    taskDescriptionInput = document.querySelector(
      `#${whichInput}_newTaskDescription`
    );
    taskDateInput = document.querySelector(`#${whichInput}_newDeadlineDate`);
    // Ustawienie state'u pól edycyjnych na dane zedytowanego zadania
    changeInputValues({
      [`${whichInput}_newTaskTitle`]: editedTaskData.taskTitle,
      [`${whichInput}_newTaskDescription`]: editedTaskData.taskDescription,
      [`${whichInput}_newTaskPriority`]: editedTaskData.taskPriority,
      [`${whichInput}_newDeadlineDate`]: editedTaskData.deadlineDate,
      [`${whichInput}_newTaskCategory`]: editedTaskData.taskCategory,
    });
    // Ustawienie widoku pól edycyjnych na dane zedytowanego zadania
    taskTitleInput.value = editedTaskData.taskTitle;
    taskDescriptionInput.value = editedTaskData.taskDescription;
    taskDateInput.value = editedTaskData.deadlineDate;
    console.log(taskDateInput.value);
    return;
  } else {
    changeInputValues({
      filterTitle: "",
      filterByPriority: "",
      filterByDeadlineDate: "",
      filterByCategory: "",
      filterByDescription: "",
    });
    document.querySelector("#filterTitle").value = "";
    document.querySelector("#filterByPriority").value = "";
    document.querySelector("#filterByDeadlineDate").value = "";
    document.querySelector("#filterByCategory").value = "";
    document.querySelector("#filterByDescription").value = "";
    return;
  }
}
