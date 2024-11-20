module.exports = function checkIfPasswordIsValid(password){
    const numbers = [1,2,3,4,5,6,7,8,9,0];
    const specialCharacters = ["#","@","!","%","^","&","*","?","/","'",'"',":",";","{","}","[","]","|",",",".","$"];
    let ifHasNumbers = false;
    let ifHasSpecialCharacters = false;
    if(password.length < 4){
        return{
            status:406,
            message:"Password must contain atleast 4 characters"
        }
    }
    numbers.forEach(number =>{
        if(password.includes(number)){
            return ifHasNumbers = true;
        }
    });
    specialCharacters.forEach(character =>{
        if(password.includes(character)){
            return ifHasSpecialCharacters = true;
        }
    })
    if(!ifHasNumbers){
        return{
            status:406,
            message:"Password doesn't contain any numbers"
        }
    }
    if(!ifHasSpecialCharacters){
        return {
            status:406,
            message:"Password doesn't contain any special characters"
        }
    }
    return {
        status:200,
        message:"Your password is good to set"
    }
}