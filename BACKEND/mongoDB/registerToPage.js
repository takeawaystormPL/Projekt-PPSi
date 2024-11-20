const mongoose = require('mongoose');
const userModel= require('./Models_and_schemas/userModel');
const checkIfPasswordIsValid = require('../modules/data_validation/checkIfPasswordIsValid');
// GŁÓWNA FUNKCJA
async function registerToPage(uri,userData){
    try{
        await mongoose.connect(uri);
        const {username,password} = userData;
        const ifExistsWithSameNickname = await userModel.findOne({username:username});
        if(ifExistsWithSameNickname){
            return{
                status:409,
                message:"User with this nickname already exists"
            }
        }
        const {status,message,user} = createUser(username,password);

        if(status == 200){
           await user.save();
        }
        return{
            status:status,
            message:message
        }
    }
    catch(error){
        return console.error(error);
    }
}
// FUNKCJA DODAJĄCA UŻYTKOWNIKA
function createUser(nickname,password){
    const ifValidPassword = checkIfPasswordIsValid(password);
    if(ifValidPassword.status !== 200){
        return {...ifValidPassword,user:null};
    }
    return{ 
        status:200,
        message:"User successfully created",
        user:new userModel({
            username:nickname,
            password:password,
            role:"user",
            refreshToken:""
        })
    } 
}
// FUNKCJA SPRAWDZAJĄCA HASŁO
function checkPassword(password){
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
module.exports = registerToPage;