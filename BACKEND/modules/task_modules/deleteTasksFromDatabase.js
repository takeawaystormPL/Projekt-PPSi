// Importowanie potrzebnych modułów
const mongoose = require('mongoose');
const taskModel = require('../mongoDB/Models_and_schemas/taskModel');
// Eksportowanie funkcji usuwającej zadania z bazy danych 
module.exports = async function deleteTasksFromDatabase(mongooseURI,tasks){
    try{
        // Połązcenie z bazą danych 
        await mongoose.connect(mongooseURI);
        // Przechodzenie przez każdy element tablicy z zadaniami do usunięcia i usunięcie go
        tasks.forEach(async task=>{
            await taskModel.deleteOne({taskTitle:task.taskTitle});
        });
        // Wiadomość zwrotna
        return{
            status:200,
            message:"Usunięto wykonane zadania"
        }
    }
    // Spełnia się jeżeli wystąpił wewnętrzny błąd serwera
    catch(err){
       return{
        status:500,
        message:err.message
       }
    }
}