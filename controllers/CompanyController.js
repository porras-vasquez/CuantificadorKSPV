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

companyController.addElectricity = function (req, res) {
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
                    res.render('../views/electricity/NewElectricity', { message: "error", company: company });
                } else {
                    res.render('../views/electricity/NewElectricity', { message: "success", company: company });
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
//falta
companyController.addGaslp = function (req, res) {
    if (req.params.id) {
        Company.findByIdAndUpdate(req.params.id, {
            $push: {
                'gaslp': {
                    descripcion: req.body.descripcion,
                    uso: req.body.uso,
                    enero: req.body.enero,
                    febrero: req.body.febrero,
                    marzo: req.body.marzo,
                    abril: req.body.abril,
                    mayo: req.body.mayo,
                    junio: req.body.junio,
                    julio: req.body.julio,
                    agosto: req.body.agosto,
                    septiembre: req.body.septiembre,
                    octubre: req.body.octubre,
                    noviembre: req.body.noviembre,
                    diciembre: req.body.diciembre,
                    densidad: req.body.densidad,
                    observacion: req.body.observacion,
                    emision: req.body.emision
                }
            }
        },
            (error, company) => {
                if (error) {
                    res.render('../views/gaseslp/NewGas', { message: "error", company: company });
                } else {
                    res.render('../views/gaseslp/NewGas', { message: "success", company: company });
                }
            }
        )
    } else {
        return res.json({
            success: false,
            msj: 'No se pudo agregar el tipo de emisión gases, por favor verifique que el _id sea correcto'
        });
    }
};

companyController.addFuelsAndOil = function (req, res) {
    if (req.params.id) {
        Company.findByIdAndUpdate(req.params.id, {
            $push: {
                'fuelsAndOil': {
                    combustible: req.body.combustible,
                    categoria_seleccion: req.body.categoria_seleccion,
                    feCo2_L: req.body.feCo2_L,
                    feCH4_L: req.body.feCH4_L,
                    feN20_L: req.body.feN20_L,
                    componente: req.body.componente,
                    enero: req.body.enero,
                    febrero: req.body.febrero,
                    marzo: req.body.marzo,
                    abril: req.body.abril,
                    mayo: req.body.mayo,
                    junio: req.body.junio,
                    julio: req.body.julio,
                    agosto: req.body.agosto,
                    septiembre: req.body.septiembre,
                    octubre: req.body.octubre,
                    noviembre: req.body.noviembre,
                    diciembre: req.body.diciembre
                }
            }
        },
            (error, company) => {
                if (error) {
                    res.render('../views/fuelsAndOil/NewfuelsAndOil', { message: "error", company: company });
                } else {
                    res.render('../views/fuelsAndOil/NewfuelsAndOil', { message: "success", company: company });
                }
            }
        )
    } else {
        return res.json({
            success: false,
            msj: 'No se pudo agregar el tipo de emisión gases, por favor verifique que el _id sea correcto'
        });
    }
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
            descripcion: req.body.descripcion,
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