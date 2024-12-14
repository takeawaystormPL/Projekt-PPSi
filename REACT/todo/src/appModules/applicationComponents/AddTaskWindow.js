import React from "react";
import "../../CSS/addTaskWindow.css";
export default function AddTaskWindow(props) {
  return (
    <div id="addTask" className="invisible">
      <div>
        <label htmlFor="taskTitle">Podaj tytuł zadania:</label>
        <input
          type="text"
          name="taskTitle"
          id="taskTitle"
          onChange={props.updateInputData}
        />
      </div>
      <div>
        <label htmlFor="taskDescription">Podaj opis zadania:</label>
        <input
          type="text"
          name="taskDescription"
          id="taskDescription"
          onChange={props.updateInputData}
        />
      </div>
      <div>
        <label>Podaj priorytet zadania</label>
        <select
          name="taskPriority"
          id="taskPriority"
          onChange={props.updateInputData}
          defaultValue="2"
        >
          <option value="1">Mało ważne</option>
          <option value="2">Średnio ważne</option>
          <option value="3">Ważne</option>
          <option value="4">Bardzo ważne</option>
        </select>
      </div>
      <div>
        <label htmlFor="taskCategory">Wybierz priorytet zadania</label>
        <select
          name="taskCategory"
          id="taskCategory"
          onChange={props.updateInputData}
          defaultValue="2"
        >
          <option value="1">Szkoła</option>
          <option value="2">Sport</option>
          <option value="3">Rozwój osobisty</option>
          <option value="4">Zakupy</option>
        </select>
      </div>
      <div>
        <label htmlFor="deadlineDate">Podaj datę realizacji zadania</label>
        <input
          type="date"
          name="deadlineDate"
          id="deadlineDate"
          onChange={props.updateInputData}
        />
      </div>
      <div></div>
      <p className="error"></p>
      <div>
        <button onClick={props.createTask}>Dodaj zadanie</button>
        <button onClick={props.showWindow}>Zamknij okno</button>
      </div>
    </div>
  );
}
