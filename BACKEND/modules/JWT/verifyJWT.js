const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyJWT(token){
    let ifValid = true;
    if(!token) return {status:401,message:"No token provided"}
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,data)=>{
        if(err) {return ifValid=!ifValid}
    });
    return ifValid == true?{status:200}:{status:403,message:"Invalid token"}
}
module.exports = verifyJWT;