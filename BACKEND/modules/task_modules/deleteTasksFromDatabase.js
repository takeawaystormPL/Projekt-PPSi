const mongoose = require('mongoose');
const taskModel = require('./Models_and_schemas/taskModel');
async function deleteTasksFromDatabase(mongooseURI,tasks){
    try{
        await mongoose.connect(mongooseURI);
     
        tasks.forEach(async task=>{
            console.log(await taskModel.deleteOne({taskName:task.taskTitle}));
        });
        return{
            status:200,
            message:"Tasks deleted successfully"
        }
    }catch(err){
       console.error(err);
       return{
        status:500,
        message:"Internal server error"
       }
    }
}
module.exports = deleteTasksFromDatabase;