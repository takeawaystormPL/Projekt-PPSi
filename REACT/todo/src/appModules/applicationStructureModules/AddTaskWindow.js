import React from "react";
export default function AddTaskWindow(props){
    
   return(
    <div id="addTask" className="invisible">
    <div>
        <label htmlFor="taskTitle">Podaj tytuł zadania:</label>
        <input type="text" name="taskTitle" id="taskTitle" onChange={props.updateInputData}/>
    </div>
    <div>
        <label htmlFor="taskDescription">Podaj opis zadania:</label>
        <input type="text" name="taskDescription" id="taskDescription" onChange={props.updateInputData}/>
    </div>
    <div>
        <label htmlFor="">Podaj datę realizacji zadania</label>
        <input type="date" name="taskDate" id="taskDate" onChange={props.updateInputData}/>
    </div>
    <p className="error"></p>
    <div>
        <button onClick={props.createTask}>Dodaj zadanie</button>
        <button onClick={props.showWindow}>Zamknij okno</button>
    </div>

</div>
   ) 
}