const mongoose = require("mongoose");
const taskModel = require('../mongoDB/Models_and_schemas/taskModel');
async function getTasksFromDatabase(mongooseURI,username){
    try{
        await mongoose.connect(mongooseURI);
        const findTasks = await taskModel.find({username:username});
        return findTasks;
    }catch(error){
        console.error(error);
        return null;
    }
}
module.exports = getTasksFromDatabase