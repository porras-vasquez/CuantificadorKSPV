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
companyController.list2 = function (req, res) {
    Company.find({}).exec(function (err, companies) {
        if (err) { 
            res.render('../views/company/AllCompanies', { message : "error" });
        }
        else{
            res.render('../views/company/AllCompanies', { companies: companies, message : "success"});
        }
    });
};
//Buscar
companyController.search = function (req, res) {
    Company.findOne({ _id: req.params.id }).exec(function (err, company) {
        if (err) { console.log('Error: ', err); return; }
        res.render('../views/company/search', { company: company });
    });

};

companyController.searchCompany = function (req, res) {
    Company.findOne({ _id: req.params.id }).exec(function (err, company) {
        if (err) { console.log('Error: ', err); return; }
        res.render('../views/electricity/NewElectricity', { company: company });
    });

};

companyController.addElectricity = function(req, res) {
    if (req.params.id) {
        Company.findByIdAndUpdate(req.params.id, {
                $push: {
                    'electricidad': {
                        unidad_medida: req.body.unidad_medida,
                        fuente_reporte: req.body.fuente_reporte
                    }
                }
            },
           (error, company) => {
                if (error) { 
                    res.render('../views/electricity/NewElectricity', { message : "error", company: company });
                }else{
                    res.render('../views/electricity/NewElectricity', { message : "success", company: company });
                }
            }
        )
    } else {
        return res.json({
            success: false,
            msj: 'No se pudo agregar el medidor, por favor verifique que el _id sea correcto'
        });
    }
};

//Actualizar
companyController.update = function (req, res) {
    Company.findByIdAndUpdate(req.params.id, {
        $set: {
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            aprobado_por: req.body.aprobado_por,
            revisado_por: req.body.revisado_por,
            fecha_elaboracion: req.body.fecha_elaboracion,
            fecha_actualizacion: req.body.fecha_actualizacion,
            descripcion: req.body.descripcion,
        }
    }, { new: true },
        function (err, company) {
            if (err) {
                console.log('Error: ', err);
                res.redirect('/companies/showCompany2');
            }
            res.redirect('/companies/showCompany2');
        });
};
//Eliminar
companyController.delete = function (req, res) {
    Company.remove({ _id: req.params.id }, function (err) {
        if (err) { }
        res.redirect("/companies/showCompany2/");
    });

};
module.exports = companyController;