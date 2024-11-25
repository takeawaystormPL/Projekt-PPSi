 // Funkcja zmieniająca status zadania 
 export default async function changeTaskStatus(taskTitle,changeTaskState,changeTasklistState){
    // Wysłanie do serwera requestu o zmiane statusu zadania 
    const response = await fetch("http://localhost:3500/changeStatus",{
        method:"POST",
        body:new URLSearchParams({title:taskTitle}),
        headers:{
            'Content-type':'application/x-www-form-urlencoded'
        }
    });
    // Spełnia się jeżeli coś było nie tak z requestem
    if(!response.ok){
        return console.log("Couldn't complete fetch");
    }
    // Konwersja odpowiedzi na obiekt JSON
    const data = await response.json();
    // Spełnia się jeżeli kod HTTP odpowiedzi nie jest równy 200
    if(response.status !== 200){
        return console.log(data.message);
    }
    // Zmiana statusu zadania w stacie zadania
    changeTaskState(prevTaskState=>{
    let editedTask={
        ...prevTaskState,
        taskStatus:!prevTaskState.taskStatus
    }
    changeTasklistState(prevTasklistState=>{
        const newList = prevTasklistState.filter(task=>task.taskTitle!==taskTitle);
        return [...newList,editedTask];
    })
    return editedTask;
});
    return true;
}