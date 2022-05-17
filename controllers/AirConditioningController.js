'use strict'
require('../connection');
const Company = require("../models/Company");
const AirConditioning = require('../models/AirConditioning');
var airConditioningController = {};


function calc(req) {

    req.body.fugaTotal = ((parseFloat(req.body.capacidadConfinamiento) * parseFloat(req.body.tasaAnualFuga)) / 100);
    req.body.totalHCFC = (parseFloat(req.body.fugaTotal) / 1000);
    req.body.totalR22 = (parseFloat(req.body.fugaTotal) / 1000);
    req.body.totalCO2 = (parseFloat(req.body.potencialCalentamineto) * parseFloat(req.body.totalHCFC));
    req.body.totalCO2R22 = (parseFloat(req.body.potencialCalentamineto) * parseFloat(req.body.totalR22));

};


airConditioningController.save = async function(req, res) {
    calc(req);
    var airConditioning = new AirConditioning(req.body);
    var comp = await Company.findById(req.params.id);
    airConditioning.company = comp;
    //console.log(comp);
    await airConditioning.save(function(err, airConditionings) {
        console.log(airConditionings);
        if (err) {
            res.render('../views/airConditioning/NewAirConditioning', { message: "error", company: airConditionings.company._id });
        } else {
            comp.airConditioning.push(airConditionings);
            comp.save(function(err, company) {
                if (err) {
                    res.render('../views/airConditioning/NewAirConditioning', { message: "error", company: company });
                } else {
                    res.render('../views/airConditioning/NewAirConditioning', { message: "success", company: company });
                }
            });
        }
    });
};

airConditioningController.searchCompany = function(req, res) {
    Company.findOne({ _id: req.params.id }).exec(function(err, company) {
        if (err) { console.log('Error: ', err); return; }
        res.render('../views/airConditioning/NewAirConditioning', { company: company._id });
    });
};

airConditioningController.list = function(req, res) {
    Company.findOne({ _id: req.params.id })
        .populate("airConditioning")
        .exec(function(err, company) {
            if (err) {
                res.render("../views/airConditioning/AllAirConditioning", {
                    airConditionings: company.airConditioning,
                    company: company._id,
                });
            } else {
                res.render("../views/airConditioning/AllAirConditioning", {
                    airConditionings: company.airConditioning,
                    company: company._id,
                });
            }
        });
};

airConditioningController.search = function(req, res) {
    AirConditioning.findOne({ _id: req.params.id }).exec(function(err, airConditioning) {
        if (err) {
            console.log("Error: ", err);
            res.render("../views/airConditioning/search", {
                airConditioning: airConditioning,
                company: airConditioning.company,
            });
        } else {
            res.render("../views/airConditioning/search", {
                airConditioning: airConditioning,
                company: airConditioning.company,
            });
        }
    });
};
airConditioningController.update = function(req, res) {
    AirConditioning.findByIdAndUpdate(
        req.params.id, {
            $set: {
                ubicacion: req.body.ubicacion,
                serie: req.body.serie,
                marca: req.body.marca,
                modelo: req.body.modelo,
                capacidad: req.body.capacidad,
                consumo: req.body.consumo,
                tipoRefrigerante: req.body.tipoRefrigerante,
                capacidadConfinamiento: req.body.capacidadConfinamiento,
                aplicacion: req.body.aplicacion,
                tasaAnualFuga: req.body.tasaAnualFuga,
                fugaTotal: req.body.fugaTotal,
                potencialCalentamineto: req.body.potencialCalentamineto,
                totalHCFC: req.body.totalHCFC,
                totalR22: req.body.totalR22,
                totalCO2: req.body.totalCO2,
                totalCO2R22: req.body.totalCO2R22,
            },
        }, { new: true },
        function(err, airConditionings) {
            console.log(airConditionings);
            console.log(airConditionings.company);
            if (err) {
                console.log("Error: ", err);
                Company.findOne({ _id: airConditionings.company })
                    .populate("airConditioning")
                    .exec(function(error, company) {
                        if (error) {
                            res.render("../views/airConditioning/AllAirConditioning", {
                                message: "error",
                                airConditionings: company.airConditioning,
                                company: company._id,
                            });
                        } else {
                            res.render("../views/airConditioning/AllAirConditioning", {
                                message: "success",
                                airConditionings: company.airConditioning,
                                company: company._id,
                            });
                        }
                    });
            } else {
                Company.findOne({ _id: airConditionings.company })
                    .populate("airConditioning")
                    .exec(function(error, company) {
                        console.log(error);
                        console.log(company);
                        if (error) {
                            res.render("../views/airConditioning/AllAirConditioning", {
                                message: "error",
                                airConditionings: company.airConditioning,
                                company: company._id,
                            });
                        } else {
                            res.render("../views/airConditioning/AllAirConditioning", {
                                message: "success",
                                airConditionings: company.airConditioning,
                                company: company._id,
                            });
                        }
                    });
            }
        }
    );
};


module.exports = airConditioningController;