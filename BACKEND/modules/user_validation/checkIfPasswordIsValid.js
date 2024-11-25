module.exports = function checkIfPasswordIsValid(password){
    const numbers = [1,2,3,4,5,6,7,8,9,0];
    const specialCharacters = ["#","@","!","%","^","&","*","?","/","'",'"',":",";","{","}","[","]","|",",",".","$"];
    // Zmienna przechowująca informację czy hasło zawiera przynajmniej jedną cyfrę
    let ifHasNumbers = false;
    // Zmienna przechowująca informację czy hasło zawiera przynajmniej jeden znak specjalny
    let ifHasSpecialCharacters = false;
    if(password.length < 4){
        return{
            status:400,
            message:"Hasło musi zawierać conajmniej 4 litery"
        }
    }
    // Sprawdzenie czy hasło zawiera przynajmniej jedną cyfrę
    numbers.forEach(number =>{
        if(password.includes(number)){
            return ifHasNumbers = true;
        }
    });
    // Sprawdzenie czy hasło zawiera przynajmniej jeden znak specjalny
    specialCharacters.forEach(character =>{
        if(password.includes(character)){
            return ifHasSpecialCharacters = true;
        }
    });
    // Spełnia się jeżeli hasło nie zawiera przynajmniej jednej cyfry
    if(!ifHasNumbers){
        return{
            status:400,
            message:"Hasło musi zawierać conajmniej jedną cyfrę"
        }
    }
    // Spełnia się jeżeli hasło nie zawiera przynajmniej jednego znaku specjalnego
    if(!ifHasSpecialCharacters){
        return {
            status:400,
            message:"Hasło musi zawierać conajmniej jeden znak specjalny"
        }
    }
    // Spełnia się jeżeli hasło spełnia wszystkie warunki
    return {
        status:200,
        message:"Hasło spełnia wszystkie warunki"
    }
}