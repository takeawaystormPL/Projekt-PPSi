const mongoose = require('mongoose');
// Eksportowanie schematu użytkownika
const userSchema = mongoose.Schema({
    "username":String,
    "password":String,
    "role":String,
    "refreshToken":Object
},{collection:"users"});

module.exports = userSchema;