const mongoose = require('mongoose');
const taskModel = require("./Models_and_schemas/taskModel");
async function changeStatusOfTask(mongooseURI,taskTitle){
    try{
        await mongoose.connect(mongooseURI);
        const foundTask = await taskModel.findOne({taskName:taskTitle.title});
        if(!foundTask){
            return false;
        }
        console.log(foundTask);
        return await taskModel.updateOne(foundTask,{taskStatus:!foundTask.taskStatus});
    }catch(err){
        return console.error(err);
    }

}
module.exports = changeStatusOfTask;