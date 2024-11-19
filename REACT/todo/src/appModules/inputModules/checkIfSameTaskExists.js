export default function checkIfSameTaskExists(taskList,newTask){
    let ifExists=false;
    taskList.forEach(task=>{
        if(task.taskTitle === newTask.taskTitle){
            console.log(task.taskTitle,newTask.taskTitle,"znaleziono");
            ifExists=true;
        }
    });
    return ifExists;
}