'use strict'
require('../connection');
const Company = require("../models/Company");
const FuelsAndOil = require('../models/FuelsAndOil');
const { clearCache } = require('ejs');
var FuelsAndOilController = {};
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
    req.body.emision = (parseFloat(req.body.enero) + parseFloat(req.body.febrero) + parseFloat(req.body.marzo) + parseFloat(req.body.abril) +
        parseFloat(req.body.mayo) + parseFloat(req.body.junio) + parseFloat(req.body.julio) + parseFloat(req.body.agosto) +
        parseFloat(req.body.septiembre) + parseFloat(req.body.octubre) + parseFloat(req.body.noviembre) + parseFloat(req.body.diciembre));
};
FuelsAndOilController.save = async function (req, res) {
    const { combustible, enero, febrero, marzo, abril, junio, julio, agosto, septiembre, octubre, noviembre, diciembre, emision, gei, pcg } = req.body; //
    calc(req);
    var fuelsAndOil = new FuelsAndOil(req.body);
    var comp = await Company.findById(req.params.id);
    fuelsAndOil.company = comp;
    console.log(req.body.total);
    await fuelsAndOil.save(function (err, fuels) {
        if (err) {
            verifyStatus(res.statusCode);
            res.render('../views/fuelsAndOil/NewfuelsAndOil', { message: message, company: fuels.company._id, status: status });
        }
        else {
            comp.fuelsAndOil.push(fuels);
            comp.save(function (err, company) {
                if (err) {
                    verifyStatus(res.statusCode);
                    res.render('../views/fuelsAndOil/NewfuelsAndOil', { message: message, company: company, status: status });
                }
                else {
                    verifyStatus(res.statusCode);
                    //    return res.status(200).json('fuels and oil created'); 
                    res.render('../views/fuelsAndOil/NewfuelsAndOil', { message: message, company: company, status: status });
                }
            });
        }
    });
};
FuelsAndOilController.searchCompany = function (req, res) {
    Company.findOne({ _id: req.params.id }).exec(function (err, company) {
        if (err) { console.log('Error: ', err); return; }
        res.render('../views/fuelsAndOil/NewfuelsAndOil', { company: company._id });
    });
};

FuelsAndOilController.list = function (req, res) {
    Company.findOne({ _id: req.params.id })
        .populate("fuelsAndOil")
        .exec(function (err, company) {
            var sumatoria = 0; var enero = 0; var febrero = 0; var marzo = 0; var abril = 0; var mayo = 0; var junio = 0;
            var julio = 0; var agosto = 0; var septiembre = 0; var octubre = 0; var noviembre = 0; var diciembre = 0;
            for (var x of company.fuelsAndOil) {
                sumatoria = sumatoria + parseFloat(x.emision); enero = enero + parseFloat(x.enero); febrero = febrero + parseFloat(x.febrero);
                marzo = marzo + parseFloat(x.marzo); abril = abril + parseFloat(x.abril); mayo = mayo + parseFloat(x.mayo);
                junio = junio + parseFloat(x.junio); julio = julio + parseFloat(x.julio); agosto = agosto + parseFloat(x.agosto);
                septiembre = septiembre + parseFloat(x.septiembre); octubre = octubre + parseFloat(x.octubre);
                noviembre = noviembre + parseFloat(x.noviembre); diciembre = diciembre + parseFloat(x.diciembre);
            }
            if (err) {
                res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                    fuelsAndOils: company.fuelsAndOil,
                    company: company._id,
                    sumatoria: sumatoria,
                    enero: enero,
                    febrero: febrero,
                    marzo: marzo,
                    abril: abril,
                    mayo: mayo,
                    junio: junio,
                    julio: julio,
                    agosto: agosto,
                    septiembre: septiembre,
                    octubre: octubre,
                    noviembre: noviembre,
                    diciembre: diciembre,
                });
            } else {
                //    return res.json("all fuels and oil updated");
                res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                    fuelsAndOils: company.fuelsAndOil,
                    company: company._id,
                    sumatoria: sumatoria,
                    enero: enero,
                    febrero: febrero,
                    marzo: marzo,
                    abril: abril,
                    mayo: mayo,
                    junio: junio,
                    julio: julio,
                    agosto: agosto,
                    septiembre: septiembre,
                    octubre: octubre,
                    noviembre: noviembre,
                    diciembre: diciembre,
                });
            }
        });
};
FuelsAndOilController.search = function (req, res) {
    FuelsAndOil.findOne({ _id: req.params.id }).exec(function (err, fuelsAndOil) {
        if (err) {
            //    return res.status(404).json("Fuel and oil not found"); 
            res.render("../views/fuelsAndOil/EditFuelsAndOil", {
                fuelsAndOil: fuelsAndOil,
                company: fuelsAndOil.company,
            });
        } else {
            //    return res.json("FuelsAndOil 62203979f485525b84be6132 found"); 
            res.render("../views/fuelsAndOil/EditFuelsAndOil", {
                fuelsAndOil: fuelsAndOil,
                company: fuelsAndOil.company,
            });
        }
    });
};
FuelsAndOilController.update = function (req, res) {
    calc(req);
    FuelsAndOil.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                combustible: req.body.combustible,
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
                emision: req.body.emision,
                gei: req.body.gei,
                pcg: req.body.pcg
            },
        },
        { new: true },
        function (err, fuelsAndOils) {
            console.log(fuelsAndOils);
            console.log(fuelsAndOils.company);
            if (err) {
                Company.findOne({ _id: fuelsAndOils.company })
                    .populate("fuelsAndOil")
                    .exec(function (error, company) {
                        verifyStatus(res.statusCode);
                        var sumatoria = 0; var enero = 0; var febrero = 0; var marzo = 0; var abril = 0; var mayo = 0; var junio = 0;
                        var julio = 0; var agosto = 0; var septiembre = 0; var octubre = 0; var noviembre = 0; var diciembre = 0;
                        for (var x of company.fuelsAndOil) {
                            sumatoria = sumatoria + parseFloat(x.emision); enero = enero + parseFloat(x.enero); febrero = febrero + parseFloat(x.febrero);
                            marzo = marzo + parseFloat(x.marzo); abril = abril + parseFloat(x.abril); mayo = mayo + parseFloat(x.mayo);
                            junio = junio + parseFloat(x.junio); julio = julio + parseFloat(x.julio); agosto = agosto + parseFloat(x.agosto);
                            septiembre = septiembre + parseFloat(x.septiembre); octubre = octubre + parseFloat(x.octubre);
                            noviembre = noviembre + parseFloat(x.noviembre); diciembre = diciembre + parseFloat(x.diciembre);
                        }
                        if (error) {
                            verifyStatus(res.statusCode);
                            res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                message: message,
                                fuelsAndOils: company.fuelsAndOil,
                                company: company._id,
                                sumatoria: sumatoria,
                                enero: enero,
                                febrero: febrero,
                                marzo: marzo,
                                abril: abril,
                                mayo: mayo,
                                junio: junio,
                                julio: julio,
                                agosto: agosto,
                                septiembre: septiembre,
                                octubre: octubre,
                                noviembre: noviembre,
                                diciembre: diciembre,
                                status: status
                            });
                        } else {
                            verifyStatus(res.statusCode);
                            res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                message: message,
                                fuelsAndOils: company.fuelsAndOil,
                                company: company._id,
                                sumatoria: sumatoria,
                                enero: enero,
                                febrero: febrero,
                                marzo: marzo,
                                abril: abril,
                                mayo: mayo,
                                junio: junio,
                                julio: julio,
                                agosto: agosto,
                                septiembre: septiembre,
                                octubre: octubre,
                                noviembre: noviembre,
                                diciembre: diciembre,
                                status: status
                            });
                        }
                    });
            } else {
                //  return res.json("all fuels and oil updated");
                Company.findOne({ _id: fuelsAndOils.company })
                    .populate("fuelsAndOil")
                    .exec(function (error, company) {
                        var sumatoria = 0; var enero = 0; var febrero = 0; var marzo = 0; var abril = 0; var mayo = 0; var junio = 0;
                        var julio = 0; var agosto = 0; var septiembre = 0; var octubre = 0; var noviembre = 0; var diciembre = 0;
                        for (var x of company.fuelsAndOil) {
                            sumatoria = sumatoria + parseFloat(x.emision); enero = enero + parseFloat(x.enero); febrero = febrero + parseFloat(x.febrero);
                            marzo = marzo + parseFloat(x.marzo); abril = abril + parseFloat(x.abril); mayo = mayo + parseFloat(x.mayo);
                            junio = junio + parseFloat(x.junio); julio = julio + parseFloat(x.julio); agosto = agosto + parseFloat(x.agosto);
                            septiembre = septiembre + parseFloat(x.septiembre); octubre = octubre + parseFloat(x.octubre);
                            noviembre = noviembre + parseFloat(x.noviembre); diciembre = diciembre + parseFloat(x.diciembre);
                        }
                        if (error) {
                            verifyStatus(res.statusCode);
                            res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                message: message,
                                fuelsAndOils: company.fuelsAndOil,
                                company: company._id,
                                sumatoria: sumatoria,
                                enero: enero,
                                febrero: febrero,
                                marzo: marzo,
                                abril: abril,
                                mayo: mayo,
                                junio: junio,
                                julio: julio,
                                agosto: agosto,
                                septiembre: septiembre,
                                octubre: octubre,
                                noviembre: noviembre,
                                diciembre: diciembre,
                                status: status
                            });
                        } else {
                            verifyStatus(res.statusCode);
                            res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                message: message,
                                fuelsAndOils: company.fuelsAndOil,
                                company: company._id,
                                sumatoria: sumatoria,
                                enero: enero,
                                febrero: febrero,
                                marzo: marzo,
                                abril: abril,
                                mayo: mayo,
                                junio: junio,
                                julio: julio,
                                agosto: agosto,
                                septiembre: septiembre,
                                octubre: octubre,
                                noviembre: noviembre,
                                diciembre: diciembre,
                                status: status
                            });
                        }
                    });
            }
        }
    );
};

FuelsAndOilController.delete = function (req, res) {
    Company.updateOne({ "_id": req.params.comp }, {
        $pull: { "fuelsAndOil": req.params.id }
    }).exec(function (err, fuelsAndOil) {
        if (fuelsAndOil) {
            FuelsAndOil.deleteOne({ _id: req.params.id }, function (err) {
                if (err) {
                    Company.findOne({ _id: req.params.comp })
                        .populate("fuelsAndOil")
                        .exec(function (error, company) {
                            var sumatoria = 0; var enero = 0; var febrero = 0; var marzo = 0; var abril = 0; var mayo = 0; var junio = 0;
                            var julio = 0; var agosto = 0; var septiembre = 0; var octubre = 0; var noviembre = 0; var diciembre = 0;
                            for (var x of company.fuelsAndOil) {
                                sumatoria = sumatoria + parseFloat(x.emision); enero = enero + parseFloat(x.enero); febrero = febrero + parseFloat(x.febrero);
                                marzo = marzo + parseFloat(x.marzo); abril = abril + parseFloat(x.abril); mayo = mayo + parseFloat(x.mayo);
                                junio = junio + parseFloat(x.junio); julio = julio + parseFloat(x.julio); agosto = agosto + parseFloat(x.agosto);
                                septiembre = septiembre + parseFloat(x.septiembre); octubre = octubre + parseFloat(x.octubre);
                                noviembre = noviembre + parseFloat(x.noviembre); diciembre = diciembre + parseFloat(x.diciembre);
                            }
                            if (error) {
                                verifyStatus(res.statusCode);
                                res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                    company: company,
                                    message: message,
                                    fuelsAndOils: company.fuelsAndOil,
                                    sumatoria: sumatoria,
                                    enero: enero,
                                    febrero: febrero,
                                    marzo: marzo,
                                    abril: abril,
                                    mayo: mayo,
                                    junio: junio,
                                    julio: julio,
                                    agosto: agosto,
                                    septiembre: septiembre,
                                    octubre: octubre,
                                    noviembre: noviembre,
                                    diciembre: diciembre,
                                    status: status
                                });
                            } else {
                                verifyStatus(res.statusCode);
                                res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                    company: company,
                                    message: message,
                                    fuelsAndOils: company.fuelsAndOil,
                                    sumatoria: sumatoria,
                                    enero: enero,
                                    febrero: febrero,
                                    marzo: marzo,
                                    abril: abril,
                                    mayo: mayo,
                                    junio: junio,
                                    julio: julio,
                                    agosto: agosto,
                                    septiembre: septiembre,
                                    octubre: octubre,
                                    noviembre: noviembre,
                                    diciembre: diciembre,
                                    status: status
                                });
                            }
                        });
                } else {
                    Company.findOne({ _id: req.params.comp })
                        .populate("fuelsAndOil")
                        .exec(function (error, company) {
                            var sumatoria = 0; var enero = 0; var febrero = 0; var marzo = 0; var abril = 0; var mayo = 0; var junio = 0;
                            var julio = 0; var agosto = 0; var septiembre = 0; var octubre = 0; var noviembre = 0; var diciembre = 0;
                            for (var x of company.fuelsAndOil) {
                                sumatoria = sumatoria + parseFloat(x.emision); enero = enero + parseFloat(x.enero); febrero = febrero + parseFloat(x.febrero);
                                marzo = marzo + parseFloat(x.marzo); abril = abril + parseFloat(x.abril); mayo = mayo + parseFloat(x.mayo);
                                junio = junio + parseFloat(x.junio); julio = julio + parseFloat(x.julio); agosto = agosto + parseFloat(x.agosto);
                                septiembre = septiembre + parseFloat(x.septiembre); octubre = octubre + parseFloat(x.octubre);
                                noviembre = noviembre + parseFloat(x.noviembre); diciembre = diciembre + parseFloat(x.diciembre);
                            }
                            if (error) {
                                verifyStatus(res.statusCode);
                                res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                    company: company,
                                    message: message,
                                    fuelsAndOils: company.fuelsAndOil,
                                    sumatoria: sumatoria,
                                    enero: enero,
                                    febrero: febrero,
                                    marzo: marzo,
                                    abril: abril,
                                    mayo: mayo,
                                    junio: junio,
                                    julio: julio,
                                    agosto: agosto,
                                    septiembre: septiembre,
                                    octubre: octubre,
                                    noviembre: noviembre,
                                    diciembre: diciembre,
                                    status: status
                                });
                            } else {
                                //    return res.json("fuels and oil deleted!"); 
                                verifyStatus(res.statusCode);
                                res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                    company: company,
                                    message: message,
                                    fuelsAndOils: company.fuelsAndOil,
                                    sumatoria: sumatoria,
                                    enero: enero,
                                    febrero: febrero,
                                    marzo: marzo,
                                    abril: abril,
                                    mayo: mayo,
                                    junio: junio,
                                    julio: julio,
                                    agosto: agosto,
                                    septiembre: septiembre,
                                    octubre: octubre,
                                    noviembre: noviembre,
                                    diciembre: diciembre,
                                    status: status
                                });
                            }
                        });
                }
            });
        }
    });
};

module.exports = FuelsAndOilController;