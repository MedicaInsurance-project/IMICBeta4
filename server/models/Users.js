var mongoose = require('mongoose');
var cryptography = require('../helper/cryptography');

var customerSchema = new mongoose.Schema({
    title: String,
    firstname: String,
    lastname: String,
    email: String,
    phone: Number,
    address: String,
    adhar: Number,
    policy: String,
    nominie: String,
    relation: String,
    password: {
        type: String
    }
    // alternateEmails: {
    //   type : Object
    // }

});


customerSchema.methods.setPassword = function(password) {
    this.password = cryptography.sha256(password);
}


var User = mongoose.model('User', customerSchema);
module.exports = User;