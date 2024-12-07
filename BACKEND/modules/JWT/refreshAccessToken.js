const mongoose = require('mongoose');
const userModel = require('../mongoDB/Models_and_schemas/userModel');
const jwt = require('jsonwebtoken');
module.exports = async function refreshAccessToken(username,mongooseURI){
    try{    
        await mongoose.connect(mongooseURI);
        const ifFoundUser = await userModel.findOne({username:username});
        if(!ifFoundUser){
            return{
                status:400,
                message:"There is no user with such nickname"
            }
        }
        const refreshToken = ifFoundUser.refreshToken;
        let ifValidRefreshToken = true;
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,err=>{
            if(err){return ifValidRefreshToken=false}
        });
        if(!ifValidRefreshToken){
            return {
                status:403,
                message:"Refresh token is no longer active"
            }
        }
        const accessToken = jwt.sign({username:username},process.env.ACCESS_TOKEN_SECRET,{expiresIn:1000*60*15});
        return {
            status:200,
            message:"Token successfully refreshed",
            accessToken:accessToken
        }
    }catch(err){
        return{
            status:500,
            message:err.message
        }
    }
}