// Importowanie potrzebnych modułów
const mongoose = require('mongoose');
const userModel= require('../mongoDB/Models_and_schemas/userModel');
const checkIfPasswordIsValid = require('./checkIfPasswordIsValid');
// Eksportownie funkcji rejestracji uzytkownika
module.exports = async function registerToPage(uri,userData){
    try{
        // Połączenie z bazą danych
        await mongoose.connect(uri);
        // Pobranie nazwy użytkownika i hasła
        const {username,password} = userData;
        // Zmienna przechowująca informacje czy użytkownik z podanym nickiem już istnieje
        const ifExistsWithSameNickname = await userModel.findOne({username:username});
        // Spełnia się jeżeli istnieje
        if(ifExistsWithSameNickname){
            return{
                status:409,
                message:"Użytkownik z tym nickiem już istnieje"
            }
        }
        // Zmienna przechowująca informacje czy użytkownik został utworzony i samego użytkownika
        const {status,message,user} = createUser(username,password);
        // Jeżeli kod HTTP jest równy 200 to użytkownik jest rejestrowany
        if(status == 200){
           await user.save();
        }
        // Wysłanie wiadomości zwrotnej 
        return{
            status:status,
            message:message
        }
    }
    // Spełnia się jeżeli wystąpił wewnętrzny błąd serwera
    catch(error){
        return {
            status:500,
            message:error.message
        }
    }
}
// FUNKCJA DODAJĄCA UŻYTKOWNIKA
function createUser(nickname,password){
    // Sprawdzenie czy hasło spełnia wszystkie wymagane warunki
    const ifValidPassword = checkIfPasswordIsValid(password);
    // Spełnia się jeżeli nie spełnia
    if(ifValidPassword.status !== 200){
        return {...ifValidPassword,user:null};
    }
    // Spełnia się jeżeli hasło spełnia wszystkie wymagane warunki
    return{ 
        status:200,
        message:"Utworzono użytkownika",
        user:new userModel({
            username:nickname,
            password:password,
            role:"user",
            refreshToken:""
        })
    } 
}
