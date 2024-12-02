// Importowanie potrzebnych modułów
const jwt = require('jsonwebtoken');
require('dotenv').config();
// Eksportowanie funkcji weryfikującej token dostepu
module.exports = function verifyJWT(token){
    // Zmienna przechowująca informacje o tym czy token jest aktualny i poprawny
    let ifValidToken = true;
    // Spełnia się jeżeli nie podano tokena
    if(!token) return {status:401,message:"Brak tokena"}
    // Weryfikacja tokena 
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,data)=>{
        if(err) {;return ifValidToken=!ifValidToken}
    });
    // Jeżeli token jest aktualny,zwracanyjest status 200,jeżeli nie to status 403 
    return ifValidToken == true?{status:200}:{status:403,message:"Niepoprawny token"}
}
