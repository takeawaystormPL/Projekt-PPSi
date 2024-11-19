import React from "react";
import {useState,useEffect} from "react";
import checkInputData from "../inputModules/checkInputData";
import AddTaskWindow from "./AddTaskWindow";
import resetInputValues from "../inputModules/resetInputValues";
import updateInputData from "../inputModules/updateInputData";
import Tasklist from "./Tasklist";
import checkIfSameTaskExists from "../inputModules/checkIfSameTaskExists";
import getTasksFromDatabase from "../databaseModules/getTasksFromDatabase";
import deleteTasksFromDatabase from "../databaseModules/deleteTasksFromDatabase";
export default function Taskinterface(props){
    // Referencje
    const window = document.querySelector("#addTask");
    const errorParagraph = document.querySelector('.error');
    // State dla listy zadań
    const [taskList,changeTaskList] = useState([]);
    // State for text inputs
    const [inputDataForTask,changeInputData] = useState({
        "taskTitle":"",
        "taskDescription":"",
        "taskDate":""
    });
    // Funkcja pokazująca i chowająca okno z możliwością dodania zadania 
    function showWindow(){
        if(window.classList.contains("invisible")){
            window.classList = "visible";
        }else{
            window.classList = "invisible";
        }
    }
 
    // Funkcja dodająca zadania po kliknięciu przycisku dodaj
    async function createTask(){
        const ifValid = checkInputData(inputDataForTask);
       if(ifValid == null){
        const newTask = {
            taskTitle:inputDataForTask.taskTitle,
            taskDescription:inputDataForTask.taskDescription,
            taskDate:inputDataForTask.taskDate,
            taskStatus:false,
            ifShowing:false
        };
        const ifExists = checkIfSameTaskExists(taskList,newTask);
        if(ifExists){
            return errorParagraph.innerText="Task with same name already exists";
        }
            changeTaskList(prev=>[...prev,newTask]);
            resetInputValues(changeInputData);
            console.log("task added");
       }
       else{
            return console.log("Invalid data");
       }
    
    }
    // Funkcja usuwająca zadania
   function deleteTasks(){
    const tasksToDelete = taskList.filter(el=>el.taskStatus == true);
        const updatedTaskList = taskList.filter(el => el.taskStatus !== true);
        changeTaskList(updatedTaskList);
        return deleteTasksFromDatabase(tasksToDelete);
    }
    // Pobieranie zadań z bazy danych 
    useEffect(()=>{
        async function initTaskList(){
            const tasks = await getTasksFromDatabase();
            changeTaskList(tasks);
        }
        initTaskList();
   },[]);
    return (    
        <div id="taskInterface">
            <section id="opcje">
                    <button onClick={showWindow}>Dodaj zadanie</button>
                    <button onClick={deleteTasks}>Usuń wykonane zadania</button>
            </section>
            <Tasklist taskList ={taskList} username={props.username} changeTaskList={changeTaskList}/>
            <AddTaskWindow updateInputData={()=>updateInputData(event,changeInputData)} createTask={createTask} showWindow={showWindow}/>
        </div>
)
}