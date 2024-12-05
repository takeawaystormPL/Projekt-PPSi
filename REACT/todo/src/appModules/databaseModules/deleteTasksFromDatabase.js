// Funkcja usuwająca zadania z bazy danych 
export default async function deleteTasksFromDatabase(tasks){
    // Obiekt przechowujący odpowiedź na request do serwera o usunięcie zadań
    const response = await fetch("http://localhost:3500/deleteTasks",{
        method:"POST",
        body:new URLSearchParams({tasks:JSON.stringify(tasks)}),
        credentials:"include",
        headers:{
            'Content-type':'application/x-www-form-urlencoded'
        }
    });
    // Spełnia sie jeżeli coś jest nie tak z requestem
    if(!response.ok){
        // Spełnia się jeżeli kod HTTP requesta to 500
        if(response.status == 500){
            return console.log("Internal server error");
        }
        // Spełnia się jeżeli kod HTTP to 401 lub 403
        if(response.status == 403 || 401){
            await fetch("http://localhost:3500/logout",{credentials:'include'});
            return window.location.href="http://localhost:3500/login";
        }
    }
    // Konwersja odpowiedzi na obiekt JSON
    const data = await response.json();
    console.log(data);
}