'use strict'
require('../connection');
var Electricity = require("../models/Electricity");
var electricityController = {};


electricityController.save = function(req, res) {
    var electricity = new Electricity(req.body);
    electricity.save(function(err) {
        if (err) { console.log('Error: ', err); return; }
        res.redirect("/electricities/createElectricity/");

    });
};


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
electricityController.update = function(req, res) {
    Electricity.findByIdAndUpdate(req.params.id, {
            $set: {
                medidor: req.body.medidor,
                titulo: req.body.titulo,
                nise: req.body.nise,
                unidad_medida: req.body.unidad_medida,
                fuente_reporte: req.body.fuente_reporte,
                ubicacion: req.body.ubicacion,
                mes: req.body.mes,
                observacion: req.body.observacion,
                total: req.body.total
            }
        }, { new: true },
        function(err, electricity) {
            if (err) {
                console.log('Error: ', err);
                res.redirect('/electricities/showElectricity');
            }

            console.log(electricity);

            res.redirect('/electricities/showElectricity');

        });
};

electricityController.delete = function(req, res) {

    Electricity.remove({ _id: req.params.id }, function(err) {

        if (err) { console.log('Error: ', err); return; }

        console.log("Product deleted!");
        res.redirect("/electricities/showElectricity/");

    });

};
module.exports = electricityController;