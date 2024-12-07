// Importowanie potrzebnych modułów
import checkInputData from "../inputModules/checkInputData";
import checkIfSameTaskExists from "../inputModules/checkIfSameTaskExists";
import resetInputValues from "../inputModules/resetInputValues";
import addTaskToDatabase from "../databaseModules/addTaskToDatabase";
// Funkcja dodająca zadania po kliknięciu przycisku dodaj
export default function createTask(inputDataForTask,changeInputData,taskList,errorParagraph,changeTaskList,username){
    // Zmienna przechowująca referencje do okienka dodawania zadania
    console.log(inputDataForTask);
    const window = document.querySelector("#addTask");
    const {taskTitle,deadlineDate} = inputDataForTask
    // Sprawdzenie czy wprowadzone przez użytkownika dane są poprawne
    const ifValid = checkInputData(window,taskTitle,deadlineDate);
    // Spełnia się jezeli są
   if(ifValid == null){
    // Utworzenie obiektu zadania z wprowadzonymi przez użytkownika danymi
    const newTask = {
        taskTitle:inputDataForTask.taskTitle,
        taskDescription:inputDataForTask.taskDescription,
        dateAdded:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
        deadlineDate:inputDataForTask.deadlineDate,
        taskPriority:inputDataForTask.taskPriority,
        taskStatus:false,
        ifShowing:false,
    };
    // Sprawdzenie czy zadanie z tym samym tytułem juz istnieje 
    const ifExists = checkIfSameTaskExists(taskList,newTask);
    // Spełnia się jeżeli istnieje
    if(ifExists){
        // Ustawienie wiadomości z błędem
        return errorParagraph.innerText="Task with same name already exists";
    }
    // Dodanie zadania do listy zadań
        changeTaskList(prev=>[...prev,newTask]);
        // Dodanie zadania do bazy danych
     addTaskToDatabase({...newTask,username:username});
    // Zresetowanie pól tekstowych i pola daty
        resetInputValues(changeInputData,window.id);
        // Informacja o dodaniu zadania
        return console.log("task added");
   }
   // Spełnia się jeżeli wprowadzone dane nie są prawidłowe
   else{
        return console.log("Invalid data");
   }

}
