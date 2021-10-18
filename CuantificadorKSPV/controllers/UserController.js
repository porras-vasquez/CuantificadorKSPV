'use strict'
require('../connection');
var User = require("../models/User");

var userController = {};


userController.save = function(req, res){
    var user = new User( req.body );
    res.render('../views/users/NewUser');
    user.save(function(err){
        if( err ){ console.log('Error: ', err); return; }
        
        console.log("Successfully created a product. :)");
        //res.redirect("/products/show/"+product._id);
        
    });
};
module.exports = userController;