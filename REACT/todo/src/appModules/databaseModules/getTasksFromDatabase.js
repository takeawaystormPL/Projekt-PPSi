export default async function getTasksFromDatabase(){
    const response = await fetch("http://localhost:3500/getTasks");
    if(!response.ok || response.status!==200){
        return console.log("Cannot load tasks");
    }
    const tasks = await response.json();
    return tasks.tasks.map(task=>{
        return{
            taskTitle:task.taskName,
            taskDescription:task.taskDescription,
            taskDate:task.taskDate,
            taskStatus:task.taskStatus,
            ifShowing:false,
          
    }})};