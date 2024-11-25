import Task from "./Task";
import React from "react";
export default function Tasks(props){
        return(
            <div id="taskContainer">
                {
                 props.taskList.sort(props.sortMethod).map((task,index)=>{
                        return <Task id={`task${index}`} name={task.taskTitle} description={task.taskDescription} dateAdded={task.dateAdded} deadlineDate={task.deadlineDate} taskPriority={task.taskPriority} taskStatus={task.taskStatus} ifShowing={task.ifShowing} key={task.taskTitle} changeTaskList={props.changeTaskList}/>
                })
                }
            </div>
        ) 
}