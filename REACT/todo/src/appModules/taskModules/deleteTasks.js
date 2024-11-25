// Importowanie potrzebnych modułów
import deleteTasksFromDatabase from "../databaseModules/deleteTasksFromDatabase";
// Funkcja usuwająca zadania
export default function deleteTasks(taskList,changeTaskList){
    // Zmienna przechowująca zadania do usunięcia
    const tasksToDelete = taskList.filter(el=>el.taskStatus == true);
    // Zmienna przechowująca liste zadań bez usuniętych zadań
        const updatedTaskList = taskList.filter(el => el.taskStatus !== true);
    // Zmiana listy zadań 
        changeTaskList(updatedTaskList);
    // Dodanie zadań do bazy danych 
        return deleteTasksFromDatabase(tasksToDelete);
    }