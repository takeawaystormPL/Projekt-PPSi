const mongoose = require('mongoose');
// Eksportowanie schematu zadania 
module.exports = mongoose.Schema({
    "taskTitle":String,
    "taskDescription":String,
    "taskStatus":Boolean,
    "taskPriority":String,
    "dateAdded":String,
    "deadlineDate":String,
    "username":String,

},{collection:"tasks"});