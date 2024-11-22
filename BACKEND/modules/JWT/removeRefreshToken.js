// Importowanie potrzebnych modułów
const mongoose = require('mongoose');
const userModel = require('../mongoDB/Models_and_schemas/userModel');
// Eksportowanie funkcji usuwającej token odświeżenia 
module.exports = async function removeRefreshToken(mongooseURI,username){
    try{
        // Połączenie z bazą danych 
        await mongoose.connect(mongooseURI);
        // Ustawienie tokena odświeżenia na pusty łańcuch znaków
        await userModel.updateOne({username:username},{refreshToken:""});
        // Wiadomość zwrotna
        return{
            status:204,
            message:"Usunięto token"
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