import Task from "./Task";
import React from "react";
import {useEffect,useState} from "react";
export default function Tasks(props){
        function checkTask(task){   
            if(task.taskName == 'undefined' || task.taskName == undefined || task.taskName == null || task.taskName.length <1){
                return false;
            }
            return true;
        }
        const sortMethod =(a,b)=>a.taskStatus ===b.taskStatus?0:a.taskStatus?-1:1
        async function addTaskToDatabase(task){
            const requestData = {
                taskName:task.taskTitle,
                taskDescription:task.taskDescription,
                taskStatus:task.taskStatus,
                taskDate:task.taskDate,
                username:props.username
            }
            const ifValid = checkTask(requestData);
            if(!ifValid){
                return false;
            }
            const response = await fetch("http://localhost:3500/createTask",{
                method:"POST",
                body:new URLSearchParams(requestData),
                headers:{
                    'Content-type':'application/x-www-form-urlencoded'
                 }
            });
            if(!response.ok){
                return console.log("Couldn't complete createTaskFetch");
            }
            const data = await response.json();
            console.log(response.status,data.message);
        }
    useEffect(()=>{
        props.taskList.forEach(async el=>{
            return await addTaskToDatabase(el);
        });
    },[props.taskList.length]);
    let taskCount = 0;
        return(
            <div id="taskContainer">
                {
                 props.taskList.sort(sortMethod).map((task,index)=>{
                     taskCount++;
                        return <Task id={`task${taskCount}`} name={task.taskTitle} description={task.taskDescription} date={task.taskDate} taskStatus={task.taskStatus} ifShowing={task.ifShowing} key={task.taskTitle}/>
                })
                }
            </div>
        ) 
}