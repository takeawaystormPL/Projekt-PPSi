const mongoose = require("mongoose");
const taskSchema = require("./taskSchema");
// Eksportowanie modelu zadania
module.exports = mongoose.model("task", taskSchema);
