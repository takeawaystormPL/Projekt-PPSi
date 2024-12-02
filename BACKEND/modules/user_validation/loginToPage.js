// importowanie potrzebnych modułów
const mongoose = require('mongoose');
const userModel = require('../mongoDB/Models_and_schemas/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//funkcja logowania 
module.exports = async function loginToPage(uri,userData){
        try{
            // Połączenie z bazą danych 
            await mongoose.connect(uri);
            // Pobranie nazwy użytkownika,hasła i roli
            const username = userData.username;
            const password = userData.password;
            const role = checkIfAdmin(username);
            // Zmienna przechowująca uzytkownika o takim nicku i takiej roli
            const ifFound =await userModel.findOne({username:username,role:role});
            // Spełnia się jeżeli znaleziono
            if(ifFound){
                // Przypisanie tokenów do użytkownika
                const {refreshToken,accessToken} = await setJWTTokens(username);
                // Spełnia się jeżeli znaleziony użytkownik ma takie hasło
                if(ifFound.password == password){
                    return {
                        status:200,
                        message:"Zalogowano",
                        refreshToken:refreshToken,
                        accessToken:accessToken
                    }
                }
                // Spełnia się jeżeli użytkownik ma inne hasło
                else{
                    return{
                        status:403,
                        message:"Niepoprawne hasło,spróbuj ponownie"
                    }
                }
                // Spełnia się jeżeli nie znaleziono
            }else{
                return{
                    status:401,
                    message:"Nie ma użytkownika z takim nickiem"
                }
            }
          
        }catch(error){  
            return {
                status:500,
                message:error.message
            }
        }
}
// Funkcja przypisująca role
function checkIfAdmin(username){
    switch(username == "takeawaystormPL"){
        case true:{
            return "admin"
        }case false:{
            return "user"
        }
    }
}
// Funkcja przypisująca tokeny do użytkownika
async function setJWTTokens(username){
    // Utworzenie tokena dostępu
    const accessToken = jwt.sign({"username":username},process.env.ACCESS_TOKEN_SECRET,{expiresIn:1000*60*15});
    // Utworzenie tokena odświeżania
    const refreshToken = jwt.sign({"username":username},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'});
    // Przypisanie tokena odświeżenia do użytkownika
    await userModel.updateOne({username:username},{refreshToken:refreshToken});
    // Zwrócenie tokenu dostępu i odświeżenia
    return {refreshToken,accessToken};
}
// 
