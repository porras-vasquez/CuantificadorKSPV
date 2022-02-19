'use strict'
require('../connection');
const Company = require("../models/Company");
const Gaseslp = require('../models/Gaseslp');
var gasesController = {};

gasesController.save = async function(req, res) {
    var gases = new Gaseslp(req.body);
    var comp = await Company.findById(req.params.id);
    gases.company = comp;
    //console.log(comp);
    await gases.save(function(err, gas) {
        console.log(gas);
        if (err) { 
            res.render('../views/gaseslp/NewGas', { message : "error", company: gas.company._id });
        }
        else{
            comp.gaseslp.push(gases);
            
            comp.save(function(err, company){
                if (err) { 
                    res.render('../views/gaseslp/NewGas', { message : "error", company: company });
                }
                else{
                    res.render('../views/gaseslp/NewGas', { message : "success", company: company });
                }
            });
        }
    });
};
gasesController.searchCompany = function (req, res) {
    Company.findOne({ _id: req.params.id }).exec(function (err, company) {
        if (err) { console.log('Error: ', err); return; }
        res.render('../views/gaseslp/NewGas', { company: company._id });
    });
};
module.exports = gasesController;