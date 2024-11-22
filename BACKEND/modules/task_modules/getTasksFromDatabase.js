// Importowanie potrzebnych modułów
const mongoose = require("mongoose");
const taskModel = require('../mongoDB/Models_and_schemas/taskModel');
// Eksportowanie funkcji zwracającej wszystkie zadania z bazy danych
module.exports = async function getTasksFromDatabase(mongooseURI,username){
    try{
        // Połączenie z bazą danych 
        await mongoose.connect(mongooseURI);
        // Zmienna przechowująca wszystkie zadania użytkownika z podaną nazwą
        const findTasks = await taskModel.find({username:username});
        // Zwrócenie zmiennej z zadaniami
        return findTasks;
    }
    // Spełnia się jeżeli wystąpił wewnętrzny błąd serwera
    catch(error){
        console.error(error);
        return null;
    }
}