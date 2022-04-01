'use strict'
require('../connection');
const Gaseslp = require('../models/Gaseslp');
const Company = require("../models/Company");
const { clearCache } = require('ejs');
var gasesController = {};
var status = 0;
var message = "";
function verifyStatus(statusCode) {
    if (statusCode == 200) {//Satisfactorio
        status = 200;
        message = "¡Realizado exitosamente!";
    } else if (statusCode == 400) {//Solicitud incorrecta
        status = 400;
        message = "¡Error, solicitud incorrecta!";
    } else if (statusCode == 401) {//No autenticado
        status = 401;
        message = "¡Error, usuario no autenticado!";
    } else if (statusCode == 404) {//No encontrado
        status = 404;
        message = "¡Ocurrió un problema con la ruta de acceso!";
    } else if (statusCode == 500) {//Error del servidor
        status = 500;
        message = "¡Lo sentimos, ocurrió un problema con el servidor!";
    } else if (statusCode == 503) {//Mantenimiento
        status = 503;
        message = "¡Lo sentimos, el servidor se encuentra en mantenimiento!";
    }
}
function calc(req) {
    if (parseFloat(req.body.densidad) > 0) {
        req.body.emision = (parseFloat(req.body.enero)+parseFloat(req.body.febrero)+parseFloat(req.body.marzo)+parseFloat(req.body.abril)+ 
                            parseFloat(req.body.mayo)+parseFloat(req.body.junio)+parseFloat(req.body.julio)+parseFloat(req.body.agosto)+ 
                            parseFloat(req.body.septiembre)+parseFloat(req.body.octubre)+parseFloat(req.body.noviembre)+parseFloat(req.body.diciembre))/parseFloat(req.body.densidad);
    } else {
        req.body.emision = (parseFloat(req.body.enero)+parseFloat(req.body.febrero)+parseFloat(req.body.marzo)+parseFloat(req.body.abril)+ 
                            parseFloat(req.body.mayo)+parseFloat(req.body.junio)+parseFloat(req.body.julio)+parseFloat(req.body.agosto)+ 
                            parseFloat(req.body.septiembre)+parseFloat(req.body.octubre)+parseFloat(req.body.noviembre)+parseFloat(req.body.diciembre));
    }
};
//Guardar un gas
gasesController.save = async function (req, res) {
    //const {unidad,uso, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre ,diciembre, densidad, observacion, emision, gei, pcg,}= req.body; 
    calc(req);
    var gases = new Gaseslp(req.body);
    var comp = await Company.findById(req.params.id);
    gases.company = comp;
    await gases.save(function (err, gas) {
        if (err) {
            verifyStatus(res.statusCode);
            res.render('../views/gaseslp/NewGas', { message: message, company: gas.company._id, status: status });
        }
        else {
            comp.gaslp.push(gases);
            comp.save(function (err, company) {
                if (err) {
                    verifyStatus(res.statusCode);
                    res.render('../views/gaseslp/NewGas', { message: message, company: company, status: status });
                }
                else {
                    verifyStatus(res.statusCode);
                  //  return res.status(200).json('gas created'); 
                    res.render('../views/gaseslp/NewGas', { message: message, company: company, status: status });
                }
            });
        }
    });
};
//Buscar la compañía del gas
gasesController.searchCompany = function (req, res) {
    Company.findOne({ _id: req.params.id }).exec(function (err, company) {
        if (err) { console.log('Error: ', err); return; }
        res.render('../views/gaseslp/NewGas', { company: company._id });
    });
};
//Listar todos los gases
gasesController.list = function (req, res) {
    Company.findOne({ _id: req.params.id })
        .populate("gaslp")
        .exec(function (err, company) {
            var sumatoria = 0; var enero = 0; var febrero = 0; var marzo = 0; var abril = 0; var mayo = 0;var junio = 0;
            var julio = 0; var agosto = 0; var septiembre = 0; var octubre = 0;var noviembre = 0; var diciembre = 0;
            for (var x of company.gaslp) {
                sumatoria = sumatoria + parseFloat(x.emision); enero = enero + parseFloat(x.enero); febrero = febrero + parseFloat(x.febrero);
                marzo = marzo + parseFloat(x.marzo); abril = abril + parseFloat(x.abril); mayo = mayo + parseFloat(x.mayo);
                junio = junio + parseFloat(x.junio); julio = julio + parseFloat(x.julio); agosto = agosto + parseFloat(x.agosto);
                septiembre = septiembre + parseFloat(x.septiembre); octubre = octubre + parseFloat(x.octubre);
                noviembre = noviembre + parseFloat(x.noviembre); diciembre = diciembre + parseFloat(x.diciembre);
            }
            if (err) {
                res.render("../views/gaseslp/AllGas", {
                    gases: company.gaslp,
                    company: company._id,
                    sumatoria: sumatoria, enero: enero, febrero: febrero,
                    marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                    julio: julio, agosto: agosto, septiembre: septiembre,
                    octubre: octubre, noviembre: noviembre, diciembre: diciembre
                });
            } else {
              //  return res.json("all gases sent"); 
                res.render("../views/gaseslp/AllGas", {
                    gases: company.gaslp,
                    company: company._id,
                    sumatoria: sumatoria, enero: enero, febrero: febrero,
                    marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                    julio: julio, agosto: agosto, septiembre: septiembre,
                    octubre: octubre, noviembre: noviembre, diciembre: diciembre
                });
            }
        });
};
//Buscar un gas
gasesController.search = function (req, res) {
    Gaseslp.findOne({ _id: req.params.id }).exec(function (err, gaslp) {
        if (err) {
           // return res.status(404).json("gas not found");  
            res.render("../views/gaseslp/EditGas", {
                gaslp: gaslp,
                company: gaslp.company,
            });
        } else {
          //  return res.json("Gaseslp 62203979f485525b84be6132 found");
            res.render("../views/gaseslp/EditGas", {
                gaslp: gaslp,
                company: gaslp.company,
            });
        }
    });
};
//Actualizar un gas
gasesController.update = function (req, res) {
    calc(req);
    Gaseslp.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                unidad: req.body.unidad,
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
            },
        },
        { new: true },
        function (err, gases) {
            if (err) {
                Company.findOne({ _id: gases.company })
                    .populate("gaslp")
                    .exec(function (error, company) {
                        verifyStatus(res.statusCode);
                        var sumatoria = 0; var enero = 0; var febrero = 0; var marzo = 0; var abril = 0; var mayo = 0;var junio = 0;
                        var julio = 0; var agosto = 0; var septiembre = 0; var octubre = 0;var noviembre = 0; var diciembre = 0;
                        for (var x of company.gaslp) {
                            sumatoria = sumatoria + parseFloat(x.emision); enero = enero + parseFloat(x.enero); febrero = febrero + parseFloat(x.febrero);
                            marzo = marzo + parseFloat(x.marzo); abril = abril + parseFloat(x.abril); mayo = mayo + parseFloat(x.mayo);
                            junio = junio + parseFloat(x.junio); julio = julio + parseFloat(x.julio); agosto = agosto + parseFloat(x.agosto);
                            septiembre = septiembre + parseFloat(x.septiembre); octubre = octubre + parseFloat(x.octubre);
                            noviembre = noviembre + parseFloat(x.noviembre); diciembre = diciembre + parseFloat(x.diciembre);
                        }
                        if (error) {
                            verifyStatus(res.statusCode);
                            res.render("../views/gaseslp/AllGas", {
                                message: message,
                                gases: company.gaslp,
                                company: company._id,
                                sumatoria: sumatoria, enero: enero, febrero: febrero,
                                marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                                julio: julio, agosto: agosto, septiembre: septiembre,
                                octubre: octubre, noviembre: noviembre, diciembre: diciembre,status: status
                            });
                        } else {
                            verifyStatus(res.statusCode);
                            res.render("../views/gaseslp/AllGas", {
                                message: message,
                                gases: company.gaslp,
                                company: company._id,
                                sumatoria: sumatoria, enero: enero, febrero: febrero,
                                marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                                julio: julio, agosto: agosto, septiembre: septiembre,
                                octubre: octubre, noviembre: noviembre, diciembre: diciembre,status: status
                            });
                        }
                    });
            } else {
              //  return res.json("all gases updated"); 
                Company.findOne({ _id: gases.company })
                    .populate("gaslp")
                    .exec(function (error, company) {
                        var sumatoria = 0; var enero = 0; var febrero = 0; var marzo = 0; var abril = 0; var mayo = 0;var junio = 0;
                        var julio = 0; var agosto = 0; var septiembre = 0; var octubre = 0;var noviembre = 0; var diciembre = 0;
                        for (var x of company.gaslp) {
                            sumatoria = sumatoria + parseFloat(x.emision); enero = enero + parseFloat(x.enero); febrero = febrero + parseFloat(x.febrero);
                            marzo = marzo + parseFloat(x.marzo); abril = abril + parseFloat(x.abril); mayo = mayo + parseFloat(x.mayo);
                            junio = junio + parseFloat(x.junio); julio = julio + parseFloat(x.julio); agosto = agosto + parseFloat(x.agosto);
                            septiembre = septiembre + parseFloat(x.septiembre); octubre = octubre + parseFloat(x.octubre);
                            noviembre = noviembre + parseFloat(x.noviembre); diciembre = diciembre + parseFloat(x.diciembre);
                        }
                        if (error) {
                            verifyStatus(res.statusCode);
                            res.render("../views/gaseslp/AllGas", {
                                message: message,
                                gases: company.gaslp,
                                company: company._id,
                                sumatoria: sumatoria, enero: enero, febrero: febrero,
                                marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                                julio: julio, agosto: agosto, septiembre: septiembre,
                                octubre: octubre, noviembre: noviembre, diciembre: diciembre,status: status
                            });
                        } else {
                            verifyStatus(res.statusCode);
                            //return res.json("all gases updated"); 
                            res.render("../views/gaseslp/AllGas", {
                                message: message,
                                gases: company.gaslp,
                                company: company._id,
                                sumatoria: sumatoria, enero: enero, febrero: febrero,
                                marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                                julio: julio, agosto: agosto, septiembre: septiembre,
                                octubre: octubre, noviembre: noviembre, diciembre: diciembre,status: status
                            });
                        }
                    });
            }
        }
    );
};


gasesController.delete = function (req, res) {
    Company.updateOne({ "_id": req.params.comp }, {
        $pull: { "gaslp": req.params.id }
    }).exec(function (err, objGases) {
       
        if (objGases) {
            Gaseslp.deleteOne({ _id: req.params.id }, function (err) {
                if (err) {
                    Company.findOne({ _id: req.params.comp })
                        .populate("gaslp")
                        .exec(function (error, company) {
                            var sumatoria = 0; var enero = 0; var febrero = 0; var marzo = 0; var abril = 0; var mayo = 0;var junio = 0;
                            var julio = 0; var agosto = 0; var septiembre = 0; var octubre = 0;var noviembre = 0; var diciembre = 0;
                            for (var x of company.gaslp) {
                                sumatoria = sumatoria + parseFloat(x.emision); enero = enero + parseFloat(x.enero); febrero = febrero + parseFloat(x.febrero);
                                marzo = marzo + parseFloat(x.marzo); abril = abril + parseFloat(x.abril); mayo = mayo + parseFloat(x.mayo);
                                junio = junio + parseFloat(x.junio); julio = julio + parseFloat(x.julio); agosto = agosto + parseFloat(x.agosto);
                                septiembre = septiembre + parseFloat(x.septiembre); octubre = octubre + parseFloat(x.octubre);
                                noviembre = noviembre + parseFloat(x.noviembre); diciembre = diciembre + parseFloat(x.diciembre);
                            }
                            if (error) {
                                verifyStatus(res.statusCode);
                                res.render("../views/gaseslp/AllGas", {
                                    company: company,
                                    message: message,
                                    gases: company.gaslp,
                                    sumatoria: sumatoria, enero: enero, febrero: febrero,
                                    marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                                    julio: julio, agosto: agosto, septiembre: septiembre,
                                    octubre: octubre, noviembre: noviembre, diciembre: diciembre,status: status
                                });
                            } else {
                                verifyStatus(res.statusCode);
                                res.render("../views/gaseslp/AllGas", {
                                    company: company,
                                    message: message,
                                    gases: company.gaslp,
                                    sumatoria: sumatoria, enero: enero, febrero: febrero,
                                    marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                                    julio: julio, agosto: agosto, septiembre: septiembre,
                                    octubre: octubre, noviembre: noviembre, diciembre: diciembre,status: status
                                });
                            }
                        });
                } else {
                    Company.findOne({ _id: req.params.comp })
                        .populate("gaslp")
                        .exec(function (error, company) {
                            var sumatoria = 0; var enero = 0; var febrero = 0; var marzo = 0; var abril = 0; var mayo = 0;var junio = 0;
                            var julio = 0; var agosto = 0; var septiembre = 0; var octubre = 0;var noviembre = 0; var diciembre = 0;
                            for (var x of company.gaslp) {
                                sumatoria = sumatoria + parseFloat(x.emision); enero = enero + parseFloat(x.enero); febrero = febrero + parseFloat(x.febrero);
                                marzo = marzo + parseFloat(x.marzo); abril = abril + parseFloat(x.abril); mayo = mayo + parseFloat(x.mayo);
                                junio = junio + parseFloat(x.junio); julio = julio + parseFloat(x.julio); agosto = agosto + parseFloat(x.agosto);
                                septiembre = septiembre + parseFloat(x.septiembre); octubre = octubre + parseFloat(x.octubre);
                                noviembre = noviembre + parseFloat(x.noviembre); diciembre = diciembre + parseFloat(x.diciembre);
                            }
                            if (error) {
                                verifyStatus(res.statusCode);
                                res.render("../views/gaseslp/AllGas", {
                                    company: company,
                                    message: message,
                                    gases: company.gaslp,
                                    sumatoria: sumatoria, enero: enero, febrero: febrero,
                                    marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                                    julio: julio, agosto: agosto, septiembre: septiembre,
                                    octubre: octubre, noviembre: noviembre, diciembre: diciembre,status: status
                                });
                            } else {
                                //return res.json("gas deleted!");
                                res.render("../views/gaseslp/AllGas", {
                                    company: company,
                                    message: message,
                                    gases: company.gaslp,
                                    sumatoria: sumatoria, enero: enero, febrero: febrero,
                                    marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                                    julio: julio, agosto: agosto, septiembre: septiembre,
                                    octubre: octubre, noviembre: noviembre, diciembre: diciembre,status: status
                                });
                            }
                        });
                }
            });
        }
    });
};
module.exports = gasesController;