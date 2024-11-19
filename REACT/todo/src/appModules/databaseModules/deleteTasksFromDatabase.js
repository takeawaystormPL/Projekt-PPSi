export default async function deleteTasksFromDatabase(tasks){
    const response = await fetch("http://localhost:3500/deleteTasks",{
        method:"POST",
        body:new URLSearchParams({tasks:JSON.stringify(tasks)}),
        headers:{
            'Content-type':'application/x-www-form-urlencoded'
        }
    });
    if(!response.ok || response.status!==200){
        return console.log("Couldn't complete fetch");
    }
    const data = await response.json();
    console.log(data);
}