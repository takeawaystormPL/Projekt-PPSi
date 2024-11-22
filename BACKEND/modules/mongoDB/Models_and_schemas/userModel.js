const mongoose = require('mongoose');
const userSchema = require('./userSchema');
// Eksportowanie modelu użytkownika
const userModel = mongoose.model("applicationUsers",userSchema);
module.exports = userModel;