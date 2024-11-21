const mongoose = require('mongoose');
const taskModel = require('./Models_and_schemas/taskModel');
async function addTaskToDatabase(mongooseURI,data){
    try{
        await mongoose.connect(mongooseURI);
        const task = new taskModel({
            taskName:data.taskName,
            taskDescription:data.taskDescription,
            taskStatus:data.taskStatus,
            taskDate:data.taskDate,
            username:data.username
        });
        const ifSameTaskExists = await taskModel.findOne({taskName:task.taskName});
        if(ifSameTaskExists){
            return {
                status:409,
                message:"Task with same name already exists"
            }
        }
        await task.save();
        return{
            status:200,
            message:"Task successfully created"
        }
    }catch(err){
        return console.error(err);
    }
}
module.exports = addTaskToDatabase