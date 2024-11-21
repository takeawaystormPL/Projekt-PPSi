// importowanie potrzebnych modułów
const mongoose = require('mongoose');
const userModel = require('./Models_and_schemas/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//funkcja logowania 
async function loginToPage(uri,userData){
        try{
            await mongoose.connect(uri);
            const username = userData.username;
            const password = userData.password;
            const role = checkIfAdmin(username);
            const ifFound =await userModel.findOne({username:username,role:role});
            if(ifFound){
                const {refreshToken,accessToken} = await setJWTTokens(username);
                if(ifFound.password == password){
                    return {
                        status:200,
                        message:"Successfully logged",
                        refreshToken:refreshToken,
                        accessToken:accessToken
                    }
                }else{
                    return{
                        status:403,
                        message:"Wrong password,try again"
                    }
                }
                
            }else{
                return{
                    status:401,
                    message:"There is no user with such nickname or such role"
                }
            }
          
        }catch(error){  
            return console.error(error);
        }
}
function checkIfAdmin(username){
    switch(username == "takeawaystormPL"){
        case true:{
            return "admin"
        }case false:{
            return "user"
        }
    }
}
async function setJWTTokens(username){
    const accessToken = jwt.sign({"username":username},process.env.ACCESS_TOKEN_SECRET,{expiresIn:60*15});
    const refreshToken = jwt.sign({"username":username},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'});
    await userModel.updateOne({username:username},{refreshToken:refreshToken});
    return {refreshToken,accessToken};
}
module.exports = loginToPage;