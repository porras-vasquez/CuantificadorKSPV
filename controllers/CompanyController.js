'use strict'
require('../connection');
var Company = require("../models/Company");
var companyController = {};
var status = 0;
var message = "";

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

//Guardar
companyController.save = async function (req, res) {
    var company = new Company(req.body);
    await company.save(function (err) {
        if (err) {
            verifyStatus(res.statusCode);
            res.render('../views/company/NewCompany', { status: status, message: message});
        }
        else {
            verifyStatus(res.statusCode);
            //return res.status(200).json('company created'); 
            res.render('../views/company/NewCompany', { status: status, message: message });
        }

    });
};
//Listar todos
companyController.list = function (req, res) {
    Company.find({}).exec(function (err, companies) {
        if (err) {
            res.render('../views/company/AllCompanies', { companies: companies });
        }else{
            //return res.status(200).json("all companies sent");
            res.render('../views/company/AllCompanies', { companies: companies });
        }
    });
};

//Buscar
companyController.search = function (req, res) {
    Company.findOne({ _id: req.params.id }).exec(function (err, company) {
        if (err) {
            res.render('../views/company/search', { company: company });
        }else{
            //return res.json("Company 622c2682e592c22e5044c81b found");
            res.render('../views/company/search', { company: company });
        }    
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
//Eliminar
companyController.delete = function (req, res) {
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
                    //return res.json("Company deleted!");
                    res.render('../views/company/AllCompanies', { companies: companies, status: status, message: message });
                }
            });
        }
    });

};
module.exports = companyController;