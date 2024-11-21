const mongoose = require('mongoose');
const userSchema = require('./userSchema');
const userModel = mongoose.model("applicationUsers",userSchema);
module.exports = userModel;