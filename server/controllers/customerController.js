var mongoose = require("mongoose");
var Users = require("../models/Users");
const Joi = require('Joi');
const cryptography = require('../helper/cryptography');
//mongoose.set('findByIdAndUpdate', false);

var customerController = {};

// Show list of users
customerController.list = function(req, res) {
    Users.find({}).exec(function(err, users) {
        if (err) {
            console.log("Error:", err);
        } else {
            // res.render("../views/users/index", {users: users});
            res.send(users);
        }
    });

};

// Show Users by id
customerController.show = function(req, res) {
    Users.findOne({ _id: req.params.id }).exec(function(err, users) {
        if (err) {
            console.log("Error:", err);
        } else {
            res.send(users)
        }
    });
};

/*
    ! Not in function 
// Create new Users
customerController.create = function (req, res) {
  res.render("../views/users/create");
}; 
*/


//random password generate for customer during registration
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}




// Save new Users
customerController.save = function(req, res) {

    var users = new Users(req.body);
    const schema = Joi.object().keys({
        title: Joi.string(),
        firstname: Joi.string(),
        lastname: Joi.string(),
        email: Joi.string(),
        phone: Joi.number(),
        address: Joi.string(),
        adhar: Joi.number(),
        policy: Joi.string(),
        nominie: Joi.string(),
        relation: Joi.string()
            // alternateEmails: Joi.object()

    });
    Joi.validate(req.body, schema, (err, response) => {
        if (err) {
            console.log('error occured');
            console.log(err)
        } else {
            //password generate for user
            password = makeid(10);
            console.log("User password is " + password);
            users.setPassword(password);
            users.save(function(err) {
                if (err) {
                    console.log(err);
                    response.render("../views/users/create");
                } else {
                    console.log("Successfully created an Users.");
                    res.send(users);
                }
            })

        }

    })


};
/* 
    ! Not in function now
// Edit an Users
customerController.edit = function (req, res) {
  Users.findOne({ _id: req.params.id }).exec(function (err, Users) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/users/edit", { Users: Users });
    }
  });
};
*/

// Update an Users
customerController.update = function(req, res) {

    Users.findByIdAndUpdate(req.params.id, {
        $set: { name: req.body.name, phone: req.body.phone }
    }, { useFindAndModify: false }, function(err, Users) {
        if (err) {
            console.log(err);
        } else {
            res.send(Users)
        }
    });
};

// Delete an Users
customerController.delete = function(req, res) {
    Users.remove({ _id: req.params.id }, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.send({
                message: "Data deleted sucessfully"

            })
        }
    });
};


//register api for custmer
// update password an Users
customerController.registerNewPassword = function(req, res) {
    Users.findOne({ "email": req.params.email }, function(err, users) {
        if (!users) {
            res.send("Email  Not Found !! ");

        } else {
            //if email is found in the database
            //converting  user provided data to encryption
            const passcode = cryptography.sha256(req.body.password);
            if (users.password === passcode) {
                //if password matched
                newpassword = req.body.newpassword;
                users.setPassword(newpassword);

                users.save(function(err) {
                    if (err) {
                        console.log(err);
                        res.send(err)
                    } else {
                        res.send({
                            message: "Password change sucessfully !!"
                        });
                    }
                })
            } else {
                res.send({
                    message: "password is incorrect"
                })
            };
        }
    })

}

module.exports = customerController;