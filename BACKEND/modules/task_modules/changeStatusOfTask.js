// Importowanie potrzebnych modułów
const mongoose = require('mongoose');
const taskModel = require("../mongoDB/Models_and_schemas/taskModel");
// Eksportowanie funkcji zmieniającej status zadania 
module.exports = async function changeStatusOfTask(mongooseURI,taskTitle){
    try{
        // Połączenie z bazą danych
        await mongoose.connect(mongooseURI);
        // Zmienna zawierająca informacje czy znaleziono zadanie z podaną nazwą
        const foundTask = await taskModel.findOne({taskName:taskTitle.title});
        // Jeżeli nie znaleziono
        if(!foundTask){
            return false;
        }
        // Zmiana statusu zadania
        return await taskModel.updateOne(foundTask,{taskStatus:!foundTask.taskStatus});
    }
    // Spełnia się jeżeli wystąpił wewnętrzny błąd serwera
    catch(err){
        return console.error(err);
    }

}
