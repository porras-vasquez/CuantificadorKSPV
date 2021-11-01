'use strict'
require('../connection');
var Electricity = require("../models/Electricity");
var electricityController = {};


electricityController.save = function(req, res) {
    var electricity = new Electricity(req.body);
    electricity.save(function(err) {
        if (err) { console.log('Error: ', err); return; }
        res.redirect("/electricities/create/");

    });
};


electricityController.list = function(req, res) {
    Electricity.find({}).exec(function(err, electricities) {
        if (err) { console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/electricities/AllElectricities', { electricities: electricities });

    });

};

electricityController.search = function(req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function(err, electricity) {
        if (err) { console.log('Error: ', err); return; }


        res.render('../views/electricities/search', { electricity: electricity });
    });

};

electricityController.edit = function(req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function(err, electricity) {
        if (err) { console.log("Error:", err); return; }

        res.render('../views/electricities/search', { electricity: electricity });

    });
};
electricityController.update = function(req, res) {
    Electricity.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email
            }
        }, { new: true },
        function(err, electricity) {
            if (err) {
                console.log('Error: ', err);
                res.redirect('/electricities/show');
            }

            console.log(electricity);

            res.redirect('/electricities/show');

        });
};

electricityController.delete = function(req, res) {

    Electricity.remove({ _id: req.params.id }, function(err) {

        if (err) { console.log('Error: ', err); return; }

        console.log("Product deleted!");
        res.redirect("/electricities/show/");

    });

};
module.exports = electricityController;