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
                tipo: req.body.Integer,
                aprobado_por: req.body.String,
                revisado_por: req.body.String,
                fecha_elaboracion: req.body.Timestamp,
                fecha_actualización: req.body.Timestamp,
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