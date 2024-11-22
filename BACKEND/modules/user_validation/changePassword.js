// Pobranie potrzebnych modułów
const mongoose = require("mongoose");
const userModel = require("../mongoDB/Models_and_schemas/userModel");
const checkIfPasswordIsValid = require("./checkIfPasswordIsValid");
// Eksportowanie funkcji do zmiany hasła
module.exports = async function changePassword(mongooseURI,username,previousPassword,newPassword){
    try{
        // Połączenie z bazą danych 
        await mongoose.connect(mongooseURI);
        // Sprawdzenie czy hasło spełnia wszystkie warunki poprawnego hasła
        const ifPasswordIsValid = checkIfPasswordIsValid(newPassword);
        if(ifPasswordIsValid.status !== 200) return ifPasswordIsValid
        // Znalezienie użytkownika o podanym nicku z tym hasłem
        const userWithPreviousPassword = await userModel.findOne({username:username,password:previousPassword});
        // Spełnia się jeżeli nie znaleziono
        if(!userWithPreviousPassword){
            return {
                status:404,
                message:"Nie ma użytkownika z takim nickiem"
            }
        }
        // Zmiana hasła użytkownika
        await userModel.updateOne({username:username},{password:newPassword});
        // Spełnia się po zmianie hasła 
        return{
            status:200,
            message:"Hasło zostało zmienione"
        }
    }catch(error){
        return{
            status:500,
            message:"Wewnętrzny błąd serwera"
        }
    }
}
