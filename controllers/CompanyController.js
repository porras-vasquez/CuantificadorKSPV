'use strict'
require('../connection');
const Company = require("../models/Company");
const Emission = require("../models/Emission");
const Electricity = require("../models/Electricity");
const FuelsAndOil = require("../models/FuelsAndOil");
const Gaseslp = require("../models/Gaseslp");
const AirConditioning = require("../models/AirConditioning");
let companyController = {};
let status = 0;
let message = "";
/**
 * @param {string} statusCode Codigo de estado devuelto por una funcion al ser ejecutada, se toma para lanzar un mensaje
 * Status: 200 ¡Realizado exitosamente!
 * Status: 400 ¡Error, solicitud incorrecta!
 * Status: 401 ¡Error, usuario no autenticado!
 * Status: 404 ¡Ocurrió un problema con la ruta de acceso!
 * Status: 500 ¡Lo sentimos, ocurrió un problema con el servidor!
 * Status: 503 ¡Lo sentimos, el servidor se encuentra en mantenimiento!
 */
function verifyStatus(statusCode){
    if(statusCode==200){//Satisfactorio
        status=200;
        message="¡Realizado exitosamente!";
    }else if(statusCode==400){//Solicitud incorrecta
        status=400;
        message="¡Error, solicitud incorrecta!";
    }else if(statusCode==401){//No autenticado
        status=401;
        message="¡Error, usuario no autenticado!";
    }else if(statusCode==404){//No encontrado
        status=404;
        message="¡Ocurrió un problema con la ruta de acceso!";
    }else if(statusCode==500){//Error del servidor
        status=500;
        message="¡Lo sentimos, ocurrió un problema con el servidor!";
    }else if(statusCode==503){//Mantenimiento
        status=503;
        message="¡Lo sentimos, el servidor se encuentra en mantenimiento!";
    }
}
/**
 * Método para guardar una compañía.
 * @async
 * @function save
 * @param {JSON} req 
 * @param {JSON} res 
 */
companyController.save = async function (req, res) {
    let company = new Company(req.body);
    await company.save(function (err, comp) {
        if (err) {
            verifyStatus(res.statusCode);
            res.render('../views/company/NewCompany', { status: status, message: message});
        }
        else {
            verifyStatus(res.statusCode);
            res.render('../views/company/NewCompany', { status: status, message: message });
        }

    });
};
/**
 * Método para mostrar las compañías.
 * @function list
 * @param {JSON} req 
 * @param {JSON} res 
 */
companyController.list = function (req, res) {
    Company.find({}).exec(function (err, companies) {
        if (err) {
            res.render('../views/company/AllCompanies', { companies: companies });
        }else{
            res.render('../views/company/AllCompanies', { companies: companies });
        }
    });
};
/**
 * Método para buscar una compañía.
 * @function search
 * @param {JSON} req 
 * @param {JSON} res 
 */
companyController.search = function (req, res) {
    Company.findOne({ _id: req.params.id }).exec(function (err, company) {
        if (err) {
            res.render('../views/company/search', { company: company });
        }else{
            res.render('../views/company/search', { company: company });
        }    
    });
};
/**
 * Método para actualizar datos de una compañía.
 * @function update
 * @param {JSON} req 
 * @param {JSON} res 
 */
companyController.update = function (req, res) {
    Company.findByIdAndUpdate(req.params.id, {
        $set: {
            numero_documento: req.body.numero_documento,
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            aprobado_por: req.body.aprobado_por,
            fecha_inicio: req.body.fecha_inicio,
            descripcion: req.body.descripcion,
            unidad: req.body.unidad,
        }
    }, { new: true },
        function (err, company) {
            if (err) {
                verifyStatus(res.statusCode);
                Company.find({}).exec(function (err, companies) {
                    if (err) { 
                        res.render('../views/company/AllCompanies', { companies: companies, status: status, message: message });
                    }else{
                        res.render('../views/company/AllCompanies', { companies: companies, status: status, message: message });
                    }
                });
            }else{
                verifyStatus(res.statusCode);
                Company.find({}).exec(function (err, companies) {
                    if (err) { 
                        res.render('../views/company/AllCompanies', { companies: companies, status: status, message: message });
                    }else{
                        res.render('../views/company/AllCompanies', { companies: companies, status: status, message: message });
                    }
                });
            }
        });
};
/**
 * Método para eliminar una compañía.
 * @function delete
 * @param {JSON} req 
 * @param {JSON} res 
 */
companyController.delete = function (req, res) {
    Emission.deleteMany({company: req.params.id}).exec(function (err, ele){});
    Electricity.deleteMany({company: req.params.id}).exec(function (err, ele){});
    FuelsAndOil.deleteMany({company: req.params.id}).exec(function (err, ele){});
    Gaseslp.deleteMany({company: req.params.id}).exec(function (err, ele){});
    AirConditioning.deleteMany({company: req.params.id}).exec(function (err, ele){});
    Company.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
            verifyStatus(res.statusCode);
            Company.find({}).exec(function (err, companies) {
                if (err) { 
                    res.render('../views/company/AllCompanies', { companies: companies, status: status, message: message });
                }else{
                    res.render('../views/company/AllCompanies', { companies: companies, status: status, message: message });
                }
            });
        }else{
            verifyStatus(res.statusCode);
            Company.find({}).exec(function (err, companies) {
                if (err) { 
                    res.render('../views/company/AllCompanies', { companies: companies, status: status, message: message });
                }else{
                    res.render('../views/company/AllCompanies', { companies: companies, status: status, message: message });
                }
            });
        }
    });

};

companyController.renderPageAllEmissions = function (req, res) {
    Company.findOne({ _id: req.params.comp })
        .populate("emission")
        .exec(function (err, company) {
            for (let x of company.emission) {
                x.co2 = parseFloat(x.co2).toFixed(5);

            }

            res.render("../views/emissions/Emissions", {
                emissions: company.emission,
                company: company._id,
                sumatoria: 0
            });
        });
};
module.exports = companyController;