// Eksportowanie funkcji sprawdzającej czy zadanie o danym tytule juz istnieje
export default function checkIfSameTaskExists(taskList,newTask){
    // Zmienna przechowująca informację czy zadanie o danym tytule już istnieje
    let ifExists=false;
    // Pętla sprawdzająca tablicę z zadaniami
    taskList.forEach(task=>{
        // Spełnia się jezeli znaleziono zadanie z takim samym tytułem
        if(task.taskTitle === newTask.taskTitle){
            console.log(task.taskTitle,newTask.taskTitle,"znaleziono");
            ifExists=true;
        }
    });
    // Zwrócenie zmiennej 
    return ifExists;
}