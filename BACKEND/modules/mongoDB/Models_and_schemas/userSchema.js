const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    "username":String,
    "password":String,
    "tasks":Array,
    "role":String,
    "refreshToken":Object
},{collection:"users"});

module.exports = userSchema;