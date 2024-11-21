const mongoose = require('mongoose');
module.exports = mongoose.Schema({
    "taskName":String,
    "taskDescription":String,
    "taskStatus":Boolean,
    "taskDate":String,
    "username":String,

},{collection:"tasks"});