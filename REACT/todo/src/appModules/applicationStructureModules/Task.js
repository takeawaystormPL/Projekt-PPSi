import React from "react"
import {useState} from "react";
export default function Task(props){
    console.log(props.taskStatus)
    const [taskState,changeTaskState] = useState({
        "taskTitle":props.name,
        "taskDescription":props.description,
        "taskDate":props.date,
        "taskStatus":props.taskStatus,
        "ifShowing":props.ifShowing
    });
    const [classes,changeClasses] = useState("task detailsHidden");
    function showDetails(){
        const window = document.querySelector("#addTask");
        if(!taskState.ifShowing){
            changeClasses("task");
            changeTaskState(prevState=>({
                ...prevState,
                "ifShowing":!prevState.ifShowing
            }));
            console.log("Witam serdecznie");
        }else{
            console.log("Details window already showing");
        }
        window.classList="invisible";
    }
    function hideDetails(){
        changeClasses("task detailsHidden");
        changeTaskState(prevState=>({
            ...prevState,
            "ifShowing":!prevState.ifShowing
        }));
    }
    async function changeStatus(taskTitle){
        const response = await fetch("http://localhost:3500/changeStatus",{
            method:"POST",
            body:new URLSearchParams({title:taskTitle}),
            headers:{
                'Content-type':'application/x-www-form-urlencoded'
            }
        });
        if(!response.ok){
            return console.log("Cannot finish fetch");
        }
        const data = await response.json();
        if(response.status !== 200){
            return console.log(data.message);
        }
        console.log("Successfully changed status of task")
        changeTaskState(prevState=>({
            ...prevState,
            taskStatus:!prevState.taskStatus
        }));
        console.log(taskState);
        return true;
    }
    return(
        <div className={classes} onClick={showDetails} id={props.id}>
            <p>Tytuł zadania:{taskState.taskTitle}</p>
            <div className="taskDetails">
            <p>Tytuł zadania:{taskState.taskTitle}</p>
            <p>Opis:{taskState.taskDescription}</p>
            <p>Data realizacji:{taskState.taskDate}</p>
            <p>Status zadania:{taskState.taskStatus==false?"nie wykonane":"wykonane"}</p> 
            <div id="buttons">
                <button onClick={hideDetails}>Zamknij</button>
               <button onClick={()=>changeStatus(taskState.taskTitle)}>Zmien status zadania</button>
            </div>
         
            </div>
             
        </div>
        
    )
}