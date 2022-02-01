'use strict'
require('../connection');
const Gases = require("../models/Gaseslp");
const Company = require("../models/Company");
const Gaseslp = require('../models/Gaseslp');
var gasesController = {};

gasesController.save = async function(req, res) {
    var gases = new Gaseslp(req.body);
    var comp = await Company.findById(req.params.id);
    gases.company = comp;
    //console.log(comp);
    await gases.save(function(err, elec) {
        console.log(elec);
        if (err) { 
         //   res.render('../views/electricity/NewElectricity', { message : "error", company: elec.company._id });
        }
        else{
            comp.gaseslp.push(gases);
            
            comp.save(function(err, company){
                if (err) { 
            //        res.render('../views/electricity/NewElectricity', { message : "error", company: company });
                }
                else{
            //        res.render('../views/electricity/NewElectricity', { message : "success", company: company });
                }
            });
        }
    });
};