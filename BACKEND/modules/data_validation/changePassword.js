const mongoose = require("mongoose");
const userModel = require("../../mongoDB/Models_and_schemas/userModel");
const checkIfPasswordIsValid = require("./checkIfPasswordIsValid");
module.exports = async function changePassword(mongooseURI,username,previousPassword,newPassword){
    try{
        await mongoose.connect(mongooseURI);
        const ifPasswordIsValid = checkIfPasswordIsValid(newPassword);
        if(ifPasswordIsValid.status !== 200) return ifPasswordIsValid
        const userWithPreviousPassword = await userModel.findOne({password:previousPassword});
        if(!userWithPreviousPassword){
            return {
                status:404,
                message:"There is no user with such password"
            }
        }
        await userModel.updateOne({username:username},{password:newPassword});
        return{
            status:200,
            message:"Password successfully changed"
        }
    }catch(err){
        return{
            status:500,
            message:"Internal server error"
        }
    }
}
