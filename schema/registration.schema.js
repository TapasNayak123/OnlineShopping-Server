var mongoose = require('mongoose');

var RegistrationSchema = new mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
    password:String,
    created : {type : Date,default : Date.now}
})
module.exports = mongoose.model('Registration',RegistrationSchema);