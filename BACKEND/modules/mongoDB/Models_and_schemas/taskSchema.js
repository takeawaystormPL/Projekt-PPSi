const mongoose = require('mongoose');
// Eksportowanie schematu zadania 
module.exports = mongoose.Schema({
    "taskName":String,
    "taskDescription":String,
    "taskStatus":Boolean,
    "taskDate":String,
    "username":String,

},{collection:"tasks"});