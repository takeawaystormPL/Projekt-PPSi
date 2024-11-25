// Funkcja dodająca zadanie do bazy danych 
export default async function addTaskToDatabase(task){
    // Zmienna przechowująca zadanie do dodania
    const requestData = {
        taskName:task.taskTitle,
        taskDescription:task.taskDescription,
        taskStatus:task.taskStatus,
        dateAdded:task.dateAdded,
        taskPriority:task.taskPriority,
        deadlineDate:task.deadlineDate,
        username:task.username
    }
    // Wysłanie requesta do serwera o wysłanie zadania do bazy danych 
    const response = await fetch("http://localhost:3500/createTask",{
        method:"POST",
        body:new URLSearchParams(requestData),
        headers:{
            'Content-type':'application/x-www-form-urlencoded'
         }
    });
    // Spełnia się jeżeli coś jest nie tak z requestem
    if(!response.ok){
        return console.log("Couldn't complete createTaskFetch");
    }
    // Konwersja odpowiedzi na obiekt JSON
    const data = await response.json();
    console.log(response.status,data.message);
}