// Importowanie potrzebnych modułów
import "../../CSS/EditTaskWindow.css"
import updateInputData from "../inputModules/updateInputData.js"
import editTask from "../taskModules/editTask.js";
export default function EditTaskWindow(props){
    // Funkcja zamykająca okno do edytowania zadania 
    async function closeEditTaskWindow(id){
        const editTaskWindow = document.querySelector(`#${id}_editTask`);
        editTaskWindow.classList.add("invisible");
        return true;
    }
    return(
        <div id={`${props.id}_editTask`} className="editTask taskComponentWindow invisible">
        <div>
            <label htmlFor="newTitle" >Wprowadź nowy tytuł</label>
            <input type="text" name={`${props.id}_newTaskTitle`} id={`${props.id}_newTaskTitle`} onChange={(e)=>updateInputData(e,props.changeInputState)} defaultValue={props.inputState[`${props.id}_newTaskTitle`]}></input>
        </div>
        <div>
            <label htmlFor="newTaskDescription" >Wprowadź nowy opis</label>
            <input type="text" name={`${props.id}_newTaskDescription`} id={`${props.id}_newTaskDescription`} defaultValue={props.inputState[`${props.id}_newTaskDescription`]} onChange={(e)=>updateInputData(e,props.changeInputState)}></input>
        </div>
        <div>
            <label htmlFor={`${props.id}_newTaskPriority`}>Wprowadź nową ważność:</label>
            <select name={`${props.id}_newTaskPriority`} id={`${props.id}_newTaskPriority`} onChange={(e)=>updateInputData(e,props.changeInputState)} defaultValue={props.inputState[`${props.id}_newTaskPriority`]}>
                <option value="1">Mało ważne</option>
                <option value="2">Średnio ważne</option>
                <option value="3">Ważne</option>
                <option value="4">Bardzo ważne</option>
            </select>
        </div>
        <div>
            <label htmlFor={`${props.id}_newDeadlineDate`}>Wprowadź nową datę realizacji</label>
            <input type="date" name={`${props.id}_newDeadlineDate`} id={`${props.id}_newDeadlineDate`} defaultValue={props.inputState[`${props.id}_newDeadlineDate`]} onChange={(e)=>updateInputData(e,props.changeInputState)}></input>
            <p className="error"></p>
        </div>
        <div className="buttons">
            <button onClick={()=>editTask(props.id,props.inputState,props.changeInputState,props.oldTaskTitle,closeEditTaskWindow,props.changeTaskState)} id="submitChanges">Potwierdź zmiany</button>
            <button onClick={()=>closeEditTaskWindow(props.id)}>Zamknij okno</button>
        </div>
     </div>
    )
}