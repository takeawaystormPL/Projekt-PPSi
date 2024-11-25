 // Funkcja sprawdzająca czy data realizacji zadania nie mineła
 export default function checkIfTaskIsDoneBeforeDeadline(taskState,changeClasses){
    // Pobranie dzisiejszej daty
    const todayDate = new Date().getTime();
    // Pobranie daty realizacji zadania
    console.log(taskState.deadlineDate);
    const taskDeadlineDate = new Date(taskState.deadlineDate).getTime();
    // Jeżeli data realizacji zadania mineła,dodawana jest klasa expired
    if(todayDate > taskDeadlineDate && !taskState.taskStatus){
        changeClasses("task detailsHidden expired");
    }
}