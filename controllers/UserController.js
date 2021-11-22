'use strict'
require('../connection');
var User = require("../models/User");
var userController = {};
const passport = require('passport');


/*userController.getMessage = async function(req, res){
    res.render('../views/users/NewUser', {message : req.flash('message')});
}*/

userController.save = async function(req, res) {
    var user = new User(req.body);
    user.password = await user.encryptPassword(req.body.password);
    console.log(user.password);
   await user.save(function(err) {
        if (err) { 
            //res.send('error');
            if(err.errors.username){
                res.render('../views/users/NewUser', { message : "username" });
                console.log('Error: ', err); return;
            }else if(err.errors.email){
                res.render('../views/users/NewUser', { message : "email" });
                console.log('Error: ', err); return;
            } else{            
                res.render('../views/users/NewUser', { message : "error" });
                console.log('Error: ', err); return;
            }
        }
        else{
            console.log("Successfully created a user. :)");
            /*;
            return;*/
            //res.send({ message: "successfuly" });
            //res.send('success');
            res.render('../views/users/NewUser', { message : "success" });
        }

    });
};


userController.list = function(req, res) {
    User.find({}).exec(function(err, users) {
        if (err) { console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/users/AllUsers', { users: users });

    });

};
userController.list2 = function(req, res) {
    User.find({}).exec(function(err, users) {
        if (err) { 
            res.render('../views/users/AllUsers', { message : "error" });
        }
        else{
            res.render('../views/users/AllUsers', { users: users, message : "success"});
        }
        

    });
};
userController.search = function(req, res) {
    User.findOne({ _id: req.params.id }).exec(function(err, user) {
        if (err) { console.log('Error: ', err); return; }


        res.render('../views/users/search', { user: user });
    });

};
userController.update = function(req, res) {
    User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email
            }
        }, { new: true },
        function(err, user) {
            if (err) {
                console.log('Error: ', err);
                res.redirect('/users/show');
            }
            req.flash("success_msg", "updated");
            res.redirect('/users/show');
        });
};

userController.delete = function(req, res) {

    User.remove({ _id: req.params.id }, function(err) {

        if (err) { console.log('Error: ', err); return; }

        console.log("Product deleted!");
        req.flash("success_msg", "deleted");
        res.redirect('/users/show');

    });

};
userController.login = passport.authenticate('local-signin',{
  successRedirect: '/',
    failureRedirect: '/users/principal',
    
    failureFlash: true
});
userController.logout = (req, res) => {
    req.logout();
    //req.flash("success_msg", "You are logged out now.");
    res.redirect("/users/principal");
  };
module.exports = userController;