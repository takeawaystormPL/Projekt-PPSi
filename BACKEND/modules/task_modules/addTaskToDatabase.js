// Pobranie potrzebnych modułów
const mongoose = require('mongoose');
const taskModel = require('../mongoDB/Models_and_schemas/taskModel');
// Eksportowanie funkcji dodawania zadania do bazy danych 
module.exports = async function addTaskToDatabase(mongooseURI,data){
    try{
        // Połączenie z bazą danych 
        await mongoose.connect(mongooseURI);
        // Zmienna przechowująca zadanie,które ma zostać dodane 
        const task = new taskModel({
            taskName:data.taskName,
            taskDescription:data.taskDescription,
            taskStatus:data.taskStatus,
            taskDate:data.taskDate,
            username:data.username
        });
        // Sprawdzenie czy zadanie z taką nazwą już istnieje
        const ifSameTaskExists = await taskModel.findOne({taskName:task.taskName});
        // Spełnia się jeżeli istnieje
        if(ifSameTaskExists){
            return {
                status:409,
                message:"Zadanie z tą nazwą już istnieje"
            }
        }
        // Wysłanie zadania do bazy danych 
        await task.save();
        // Wiadomość zwrotna
        return{
            status:200,
            message:"Utworzono zadanie"
        }
    }
    // Spełnia sie jeżeli wystąpił wewnętrzny bład serwera
    catch(err){
        return {
            status:500,
            message:err.message
        };
    }
}
