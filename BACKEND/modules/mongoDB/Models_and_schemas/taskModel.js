const mongoose = require('mongoose');
const taskSchema = require("./taskSchema");
module.exports = mongoose.model("task",taskSchema);