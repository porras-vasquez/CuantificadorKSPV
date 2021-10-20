'use strict'
require('../connection');
var User = require("../models/User");

var userController = {};


userController.save = function(req, res) {
    var user = new User(req.body);

    user.save(function(err) {
        if (err) { console.log('Error: ', err); return; }

        console.log("Successfully created a product. :)");
        //res.redirect("/products/show/"+product._id);

    });
};


userController.list = function(req, res) {

    User.find({}).exec(function(err, users) {
        if (err) { console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/users/Allusers', { users: users });

    });

};

userController.show = function(req, res) {
    User.findOne({ username: req.params.id }).exec(function(err, user) {
        if (err) { console.log('Error: ', err); return; }

        res.render('../views/users/ver', { user: user });
    });

};
module.exports = userController;