

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    email:String,
    password:String,
    

});

//class creation 

let User = mongoose.model('User', userSchema,'users');

module.exports = { User };
