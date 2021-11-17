'use strict'
require('../connection');
const Electricity = require("../models/Electricity");
var electricityController = {};


/*electricityController.save = function(req, res) {
    var electricity = new Electricity(req.body);
    electricity.save(function(err) {
    if (err) { 
        res.render('../views/electricity/NewElectricity', { message : "error" });
    }
    else{
        res.render('../views/electricity/NewElectricity', { message : "success" });
    }
    });
};*/


electricityController.list = function(req, res) {
    Electricity.find({}).exec(function(err, electricities) {
        if (err) { console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/electricity/AllElectricities', { electricities: electricities });

    });

};

electricityController.search = function(req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function(err, electricity) {
        if (err) { console.log('Error: ', err); return; }


        res.render('../views/electricity/search', { electricity: electricity });
    });

};

electricityController.edit = function(req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function(err, electricity) {
        if (err) { console.log("Error:", err); return; }

        res.render('../views/electricity/search', { electricity: electricity });

    });
};

electricityController.save = function(req, res) {
    let body = req.body;
    let elect = new Electricity(body);
    /*elect.save((err, contactoDB) => {
            if (err) {
                return res.json({
                    success: false,
                    msj: 'No se pudo registrar',
                    err
                });
            } else {
                res.json({
                    success: true,
                    msj: 'Se registró con éxito'
                });
            }
        }
    );*/

    elect.save(function(err) {
        if (err) {
            return res.json({
                success: false,
                msj: 'No se pudo registrar',
                err
            });
        } else {
            res.json({
                success: true,
                msj: 'Se registró con éxito'
            });
        }
    });
};

electricityController.update = function(req, res) {
    if (req.body._id) {
        Electricity.updateOne({ _id: req.body._id }, {
                $push: {
                    'medidor': {
                        numero: req.body.numero,
                        descripcion: req.body.descripcion
                    }
                }
            },
           (error) => {
                if (error) {
                    return res.json({
                        success: false,
                        msj: 'No se pudo agregar el teléfono',
                        err
                    });
                } else {
                    return res.json({
                        success: true,
                        msj: 'Se agregó correctamente el teléfono'
                    });
                }
            }
        )
    } else {
        return res.json({
            success: false,
            msj: 'No se pudo agregar el teléfono, por favor verifique que el _id sea correcto'
        });
    }
};


electricityController.delete = function(req, res) {

    Electricity.remove({ _id: req.params.id }, function(err) {

        if (err) { console.log('Error: ', err); return; }

        console.log("Product deleted!");
        res.redirect("/electricities/showElectricity/");

    });

};
module.exports = electricityController;