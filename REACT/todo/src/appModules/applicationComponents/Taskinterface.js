import React from "react";
import {useState,useEffect} from "react";
// Importowanie potrzebnych modułów i komponentów
import AddTaskWindow from "./AddTaskWindow";
import Tasklist from "./Tasklist";
import updateInputData from "../inputModules/updateInputData";
import getTasksFromDatabase from "../databaseModules/getTasksFromDatabase";
import createTask from "../taskModules/createTask";
import deleteTasks from "../taskModules/deleteTasks";
export default function Taskinterface(props){
    // Referencje
    const window = document.querySelector("#addTask");
    const errorParagraph = document.querySelector('.error');
    // Zmienna przechowująca state dla listy zadań
    const [taskList,changeTaskList] = useState([]);
    // Zmienna przechowująca state dla pól tekstowych i pola daty
    const [inputDataForTask,changeInputData] = useState({
        "taskTitle":"",
        "taskDescription":"",
        "taskPriority":"2",
        "deadlineDate":""
    });
    // Zmienna przechowująca state z informacja o metodzie sortowania
    const [sortMethod,changeSortMethod] = useState("status");
    // Zmienna przechowująca state z informacją czy sortować pierwsze zadania wykonane czy nie wykonane
    const [sortDoneFirst,changeSortDoneFirst] = useState(true);
    // Zmienna przechowująca state z informacją czy sortować pierwsze zadania z najnowszą datą dodania czy z najstarszą
    const [sortByNewestDateAdded,changeSortByNewestDateAdded] = useState(true);
    // Zmienna przechowująca state z informacją czy sortować pierwsze zadania z najbliższą datą deadline'a czy z najdalszą
    const [sortByNearestDeadlineDate,changeSortByNearestDeadlineDate] = useState(false);
    // Zmienna przechowująca state z informacją czy sortować zadania od najważniejszego do najmniej ważnego 
    const [sortByTaskPriority,changeSortByTaskPriority] = useState(true);
    // Funkcja pokazująca i chowająca okno z możliwością dodania zadania 
    function showWindow(){
        let ifCanBeShowed = true;
        const editTaskWindows = document.querySelectorAll('.editTask');
        editTaskWindows.forEach(editTaskWindow=>{
            if(!editTaskWindow.classList.contains("invisible")){
                ifCanBeShowed = false;
            }
        })
        if(ifCanBeShowed){
            // Spełnia się jeżeli okno ma klasę invisible
            if(window.classList.contains("invisible")){
                window.classList = "visible";
            }
        // Spełnia się jeżeli okno jej nie ma
            else{
                window.classList = "invisible";
            }
        }
    }
    
    // Funkcja wybierająca metodę sortowania 
    function selectSortingMethod(){
        // Spełnia się jeżeli użytkownik chce sortowania przez status 
        if(sortMethod == "status"){
            console.log("Status")
            return sortDoneFirst?(a,b)=>a.taskStatus ===b.taskStatus?0:a.taskStatus?-1:1:(a,b)=>a.taskStatus === b.taskStatus?0:a.taskStatus?1:-1
        }
        // Spełnia się jeżeli użytkownik chce sortowania przez datę realizacji 
        if(sortMethod == "deadlineDate"){
            console.log("deadlineDate");
            return sortByNearestDeadlineDate?(a,b)=>{
                const aDate = new Date(a.deadlineDate).getTime()
                const bDate = new Date(b.deadlineDate).getTime()
                console.log(sortByNearestDeadlineDate);
               return aDate == bDate?0:aDate > bDate?-1:1
            }:(a,b)=>{
                const aDate = new Date(a.deadlineDate).getTime();
                const bDate = new Date(b.deadlineDate).getTime();
                console.log(sortByNearestDeadlineDate);
               return aDate == bDate?0:aDate > bDate?1:-1
            }
        }
        // Spełnia się jeżeli użytkownik chce sortowania przez datę dodania 
        if(sortMethod =="dateAdded"){
            console.log("dateAdded")
            return sortByNewestDateAdded?(a,b)=>{
                const aDate = new Date(a.dateAdded).getTime()
                const bDate = new Date(b.dateAdded).getTime()
               return aDate == bDate?0:aDate > bDate?-1:1
            }:(a,b)=>{
                const aDate = new Date(a.dateAdded).getTime();
                const bDate = new Date(b.dateAdded).getTime();
               return aDate == bDate?0:aDate > bDate?1:-1
            }
        }
        // Spełnia się jeżeli użytkownik chce sortowania przez ważność zadania 
        if(sortMethod=="taskPriority"){
            console.log("taskPriority");
            return sortByTaskPriority?(a,b)=>a.taskPriority==b.taskPriority?0:a.taskPriority>b.taskPriority?-1:1:(a,b)=>a.taskPriority==b.taskPriority?0:a.taskPriority>b.taskPriority?1:-1
        }
    }
    // Funkcja wykrywająca która opcja sortowania została wybrana
    function buttonClicked(id){
        if(id== "sortByStatusButton"){
            changeSortMethod("status");
            changeSortDoneFirst(prevState => !prevState)
        }else if(id =="sortByDeadlineDateButton"){
            changeSortMethod("deadlineDate");
            changeSortByNearestDeadlineDate(prevState =>!prevState);
        }else if(id=="sortByDateAddedButton"){
            changeSortMethod("dateAdded");
            changeSortByNewestDateAdded(prevState => !prevState)
        }else if(id=="sortByTaskPriority"){
            changeSortMethod("taskPriority");
            changeSortByTaskPriority(prevState =>!prevState)
        }
    }
    // Pobieranie zadań z bazy danych 
    useEffect(()=>{
        // Funkcja pobierająca zadania z bazy danych 
        async function initTaskList(){
            // Zmienna przechowująca pobrane zadania
            const tasks = await getTasksFromDatabase();
            // Dodanie tych zadań do listy zadań
            changeTaskList(tasks);
        }
        initTaskList();
   },[]);
    return (    
        <div id="taskInterface">
            <section id="opcje">
                    <button onClick={showWindow}>Dodaj zadanie</button>
                    <button onClick={()=>deleteTasks(taskList,changeTaskList)}>Usuń wykonane zadania</button>
                    <button id="sortByStatusButton" onClick={(e)=>buttonClicked(e.target.id)}>Sortuj przez status</button>
                    <button id="sortByDateAddedButton" onClick={(e)=>buttonClicked(e.target.id)}>Sortuj przez datę dodania</button>
                    <button id="sortByDeadlineDateButton" onClick={(e) =>buttonClicked(e.target.id)}>Sortuj przez date realizacji</button>
                    <button id="sortByTaskPriority" onClick={(e) => buttonClicked(e.target.id)}>Sortuj przez ważność</button>
            </section>
            <Tasklist taskList ={taskList} username={props.username} changeTaskList={changeTaskList} sortMethod={selectSortingMethod()}/>
            <AddTaskWindow updateInputData={(e)=>updateInputData(e,changeInputData)} createTask={()=>createTask(inputDataForTask,changeInputData,taskList,errorParagraph,changeTaskList,props.username)} showWindow={showWindow}/>
        </div>
)}