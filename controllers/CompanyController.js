'use strict'
require('../connection');
var Company = require("../models/Company");
var companyController = {};


companyController.save = function(req, res) {
    var company = new Company(req.body);
    company.save(function(err) {
        if (err) { console.log('Error: ', err); return; }
        console.log("Successfully created a product. :)");
        res.redirect("/companies/create/");

    });
};


companyController.list = function(req, res) {
    Company.find({}).exec(function(err, companies) {
        if (err) { console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/companies/AllCompanies', { companies: companies });
    });
};

companyController.search = function(req, res) {
    Company.findOne({ _id: req.params.id }).exec(function(err, company) {
        if (err) { console.log('Error: ', err); return; }
        res.render('../views/companies/search', { company: company });
    });

};

companyController.edit = function(req, res) {
    Company.findOne({ _id: req.params.id }).exec(function(err, company) {
        if (err) { console.log("Error:", err); return; }
        res.render('../views/companies/search', { compant: company });
    });
};
companyController.update = function(req, res) {
    Company.findByIdAndUpdate(req.params.id, {
            $set: {
                nombre: req.body.nombre,
                tipo: req.body.tipo,
                aprobado_por: req.body.aprobado_por,
                revisado_por: req.body.revisado_por,
                fecha_elaboracion: req.body.fecha_elaboracion,
                fecha_actualizacion: req.body.fecha_actualizacion,
                descripcion: req.body.String,
            }
        }, { new: true },
        function(err, company) {
            if (err) {
                console.log('Error: ', err);
                res.redirect('/companies/show');
            }

            console.log(company);

            res.redirect('/companies/show');
        });
};

companyController.delete = function(req, res) {
    Company.remove({ _numero_documento: req.params.numero_documento }, function(err) {
        if (err) { console.log('Error: ', err); return; }
        console.log("Company deleted!");
        res.redirect("/companies/show");

    });

};
module.exports = companyController;