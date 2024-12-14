import "../../CSS/Task.css";
import React from "react";
import { useState, useEffect } from "react";
import changeTaskStatus from "../taskModules/changeTaskStatus.js";
import checkIfTaskIsDoneBeforeDeadline from "../taskModules/checkIfTaskIsDoneBeforeDeadline.js";
import EditTaskWindow from "./EditTaskWindow.js";
import deleteTasks from "../taskModules/deleteTasks.js";
export default function Task(props) {
  // Zmienna przechowująca state zadania
  const [taskState, changeTaskState] = useState({
    taskTitle: props.name,
    taskDescription: props.description,
    dateAdded: props.dateAdded,
    taskPriority: props.taskPriority,
    taskCategory: props.taskCategory,
    deadlineDate: props.deadlineDate,
    taskStatus: props.taskStatus,
    ifShowing: props.ifShowing,
  });
  const [inputState, changeInputState] = useState({
    [`${props.id}_newTaskTitle`]: props.name,
    [`${props.id}_newTaskDescription`]: props.description,
    [`${props.id}_newDeadlineDate`]: props.deadlineDate,
    [`${props.id}_newTaskPriority`]: props.taskPriority,
    [`${props.id}_newTaskCategory`]: props.taskCategory,
  });
  // Zmienna przechowująca state klasy komponentu zadania
  const [divClasses, changeClasses] = useState("task detailsHidden");
  // Funkcja pokazująca okienko z informacjami o zadaniu
  function showTaskDetails() {
    // Zmienna przechowująca referencje do okna do dodawania zadań
    const window = document.querySelector("#addTask");
    // Spełnia się jeżeli okno z informacjami o zadaniu nie pokazuje się
    if (!taskState.ifShowing) {
      // Usunięcie klasy detailsHidden
      changeClasses("task");
      // Zmiana stanu wyświetlania się okna
      changeTaskState((prevState) => ({
        ...prevState,
        ifShowing: !prevState.ifShowing,
      }));
    }
    // Spełnia się jeżeli okno z informacjami o zadaniu pokazuje się
    else {
      console.log("Details window already showing");
    }
    // Zamknięcie okna do dodawania zadań
    window.classList = "invisible";
  }
  // Funkcja chowająca okienko z informacjami o zadaniu
  function hideTaskDetails() {
    // Dodanie do komponentu zadania klasy detailsHidden
    changeClasses("task detailsHidden");
    // Zmiana stanu wyświetlania się okna
    changeTaskState((prevState) => ({
      ...prevState,
      ifShowing: !prevState.ifShowing,
    }));
    checkIfTaskIsDoneBeforeDeadline(taskState, changeClasses);
  }
  async function showEditTaskWindow() {
    const editTaskWindow = document.querySelector(`#${props.id}_editTask`);
    editTaskWindow.classList.remove("invisible");
    return true;
  }

  // Sprawdzanie czy data realizacji zadania nie mineła
  useEffect(
    () => checkIfTaskIsDoneBeforeDeadline(taskState, changeClasses),
    []
  );
  return (
    <div className={divClasses} onClick={showTaskDetails} id={props.id}>
      <div>
        <h2>{taskState.taskTitle} </h2>
        <p>Data dodania: {taskState.dateAdded} </p>
        <p>Data realizacji: {taskState.deadlineDate}</p>
      </div>
      <div id="taskDetails" className="taskComponentWindow">
        <h2>{taskState.taskTitle}</h2>
        <p>Opis: {taskState.taskDescription}</p>
        <p>
          Ważność zadania:
          {taskState.taskPriority == 1
            ? " Mało ważne"
            : taskState.taskPriority == 2
            ? " Średnio ważne"
            : taskState.taskPriority == 3
            ? " Ważne"
            : " Bardzo ważne"}
        </p>
        <p>
          Kategoria zadania:
          {taskState.taskCategory == 1
            ? " Szkoła"
            : taskState.taskCategory == 2
            ? " Sport"
            : taskState.taskCategory == 3
            ? " Rozwój osobisty"
            : " Zakupy"}
        </p>
        <p>Data dodania: {taskState.dateAdded}</p>
        <p>Data realizacji: {taskState.deadlineDate}</p>
        <p>
          Status zadania:
          {taskState.taskStatus == false ? " nie wykonane" : " wykonane"}
        </p>
        <div className="buttons">
          <button onClick={hideTaskDetails}>Zamknij</button>
          <button
            onClick={() =>
              changeTaskStatus(
                taskState.taskTitle,
                changeTaskState,
                props.changeTaskList
              )
            }
          >
            Zmien status zadania
          </button>
          <button onClick={showEditTaskWindow}>Edytuj</button>
          <button onClick={() => deleteTasks(props.changeTaskList, taskState)}>
            Usuń zadanie
          </button>
        </div>
      </div>
      <EditTaskWindow
        id={props.id}
        inputState={inputState}
        changeInputState={changeInputState}
        oldTaskTitle={taskState.taskTitle}
        changeTaskState={changeTaskState}
        changeTaskList={props.changeTaskList}
      />
    </div>
  );
}
