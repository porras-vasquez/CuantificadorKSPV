'use strict'
require('../connection');
var Company = require("../models/Company");
var companyController = {};
//Guardar
companyController.save = async function (req, res) {
    var company = new Company(req.body);
    await company.save(function (err) {
        if (err) {
            res.render('../views/company/NewCompany', { message: "error" });
        }
        else {
            res.render('../views/company/NewCompany', { message: "success" });
        }

    });
};
//Listar todos
companyController.list = function (req, res) {
    Company.find({}).exec(function (err, companies) {
        if (err) { console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/company/AllCompanies', { companies: companies });
    });
};

//Buscar
companyController.search = function (req, res) {
    Company.findOne({ _id: req.params.id }).exec(function (err, company) {
        if (err) { console.log('Error: ', err); return; }
        res.render('../views/company/search', { company: company });
    });
};

//Actualizar
companyController.update = function (req, res) {
    Company.findByIdAndUpdate(req.params.id, {
        $set: {
            numero_documento: req.body.numero_documento,
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            aprobado_por: req.body.aprobado_por,
            fecha_inicio: req.body.fecha_inicio,
            unidad: req.body.unidad,
        }
    }, { new: true },
        function (err, company) {
            if (err) {
                console.log('Error: ', err);
                req.flash("error_msg", "error_update");
                res.redirect('/companies/showCompany');

            }
            req.flash("success_msg", "updated");
            res.redirect('/companies/showCompany');
        });
};
//Eliminar
companyController.delete = function (req, res) {
    Company.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
            //agregar error'
            req.flash("error_msg", "error_delete");
        }
        req.flash("success_msg", "deleted");
        res.redirect("/companies/showCompany");
    });

};
module.exports = companyController;