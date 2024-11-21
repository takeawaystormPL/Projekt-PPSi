const mongoose = require('mongoose');
const userModel = require('./Models_and_schemas/userModel');
async function removeRefreshToken(mongooseURI,username){
    try{
        await mongoose.connect(mongooseURI);
        await userModel.updateOne({username:username},{refreshToken:""});
        return{
            status:204,
            message:"Refresh token removed"
        }
    }catch(err){
        return{
            status:500,
            message:err
        }
    }
}
module.exports = removeRefreshToken;