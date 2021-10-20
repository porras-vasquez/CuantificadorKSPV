'use strict'
require('../connection');
var User = require("../models/User");

var userController = {};


userController.save = function(req, res) {
    var user = new User(req.body);

    user.save(function(err) {
        if (err) { console.log('Error: ', err); return; }

        console.log("Successfully created a product. :)");
        res.redirect("/users/create/");

    });
};


userController.list = function(req, res) {

    User.find({}).exec(function(err, users) {
        if (err) { console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/users/AllUsers', { users: users });

    });

};

userController.show = function(req, res) {
    User.findOne({ username: req.params.id }).exec(function(err, user) {
        if (err) { console.log('Error: ', err); return; }

        res.render('../views/users/ver', { user: user });
    });

};


userController.delete = function(req, res) {

    User.remove({ _id: req.params.id }, function(err) {

        if (err) { console.log('Error: ', err); return; }

        console.log("Product deleted!");
        res.redirect("/users/show/");

    });

};
module.exports = userController;