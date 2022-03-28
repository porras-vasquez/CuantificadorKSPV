'use strict'
require('../connection');
const Gaseslp = require('../models/Gaseslp');
const Company = require("../models/Company");
const { clearCache } = require('ejs');
var gasesController = {};
function calc(req) {
    let en = parseFloat(req.body.enero);
    let fe = parseFloat(req.body.febrero);
    let mar = parseFloat(req.body.marzo);
    let abr = parseFloat(req.body.abril);
    let may = parseFloat(req.body.mayo);
    let jun = parseFloat(req.body.junio);
    let jul = parseFloat(req.body.julio);
    let ago = parseFloat(req.body.agosto);
    let sep = parseFloat(req.body.septiembre);
    let oct = parseFloat(req.body.octubre);
    let nov = parseFloat(req.body.noviembre);
    let dic = parseFloat(req.body.diciembre);
    let densidad = parseFloat(req.body.densidad);
    if (densidad > 0) {
        req.body.emision = (en + fe + mar + abr + may + jun + jul + ago + sep + oct + nov + dic) / densidad;
    } else {
        req.body.emision = en + fe + mar + abr + may + jun + jul + ago + sep + oct + nov + dic;
    }
};
gasesController.save = async function (req, res) {
    //const {unidad,uso, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre ,diciembre, densidad, observacion, emision, gei, pcg,}= req.body; 
    calc(req);
    var gases = new Gaseslp(req.body);
    var comp = await Company.findById(req.params.id);
    gases.company = comp;
    await gases.save(function (err, gas) {
        console.log(gas);
        if (err) {
            res.render('../views/gaseslp/NewGas', { message: "error", company: gas.company._id });
        }
        else {
            comp.gaslp.push(gases);
            comp.save(function (err, company) {
                if (err) {
                    res.render('../views/gaseslp/NewGas', { message: "error", company: company });
                }
                else {
                  //  return res.status(200).json('gas created'); 
                    res.render('../views/gaseslp/NewGas', { message: "success", company: company });
                }
            });
        }
    });
};
gasesController.searchCompany = function (req, res) {
    Company.findOne({ _id: req.params.id }).exec(function (err, company) {
        if (err) { console.log('Error: ', err); return; }
        res.render('../views/gaseslp/NewGas', { company: company._id });
    });
};
gasesController.list = function (req, res) {

    Company.findOne({ _id: req.params.id })
        .populate("gaslp")
        .exec(function (err, company) {
            var sumatoria = 0;
            var enero = 0;
            var febrero = 0;
            var marzo = 0;
            var abril = 0;
            var mayo = 0;
            var junio = 0;
            var julio = 0;
            var agosto = 0;
            var septiembre = 0;
            var octubre = 0;
            var noviembre = 0;
            var diciembre = 0;
            for (var x of company.gaslp) {
                sumatoria = sumatoria + parseFloat(x.emision);
                enero = enero + parseFloat(x.enero);
                febrero = febrero + parseFloat(x.febrero);
                marzo = marzo + parseFloat(x.marzo);
                abril = abril + parseFloat(x.abril);
                mayo = mayo + parseFloat(x.mayo);
                junio = junio + parseFloat(x.junio);
                julio = julio + parseFloat(x.julio);
                agosto = agosto + parseFloat(x.agosto);
                septiembre = septiembre + parseFloat(x.septiembre);
                octubre = octubre + parseFloat(x.octubre);
                noviembre = noviembre + parseFloat(x.noviembre);
                diciembre = diciembre + parseFloat(x.diciembre);
            }
            if (err) {
                res.render("../views/gaseslp/AllGas", {
                    gases: company.gaslp,
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
              //  return res.json("all gases sent"); 
                res.render("../views/gaseslp/AllGas", {
                    gases: company.gaslp,
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
gasesController.search = function (req, res) {
    Gaseslp.findOne({ _id: req.params.id }).exec(function (err, gaslp) {
        if (err) {
           // return res.status(404).json("gas not found");  
            res.render("../views/gaseslp/search", {
                gaslp: gaslp,
                company: gaslp.company,
            });
        } else {
          //  return res.json("Gaseslp 62203979f485525b84be6132 found");
            res.render("../views/gaseslp/search", {
                gaslp: gaslp,
                company: gaslp.company,
            });
        }
    });
};
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
                        var sumatoria = 0;
                        var enero = 0;
                        var febrero = 0;
                        var marzo = 0;
                        var abril = 0;
                        var mayo = 0;
                        var junio = 0;
                        var julio = 0;
                        var agosto = 0;
                        var septiembre = 0;
                        var octubre = 0;
                        var noviembre = 0;
                        var diciembre = 0;
                        for (var x of company.gaslp) {
                            sumatoria = sumatoria + parseFloat(x.emision);
                            enero = enero + parseFloat(x.enero);
                            febrero = febrero + parseFloat(x.febrero);
                            marzo = marzo + parseFloat(x.marzo);
                            abril = abril + parseFloat(x.abril);
                            mayo = mayo + parseFloat(x.mayo);
                            junio = junio + parseFloat(x.junio);
                            julio = julio + parseFloat(x.julio);
                            agosto = agosto + parseFloat(x.agosto);
                            septiembre = septiembre + parseFloat(x.septiembre);
                            octubre = octubre + parseFloat(x.octubre);
                            noviembre = noviembre + parseFloat(x.noviembre);
                            diciembre = diciembre + parseFloat(x.diciembre);
                        }
                        if (error) {
                            res.render("../views/gaseslp/AllGas", {
                                message: "error",
                                gases: company.gaslp,
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
                            res.render("../views/gaseslp/AllGas", {
                                message: "success",
                                gases: company.gaslp,
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
            } else {
              //  return res.json("all gases updated"); 
                Company.findOne({ _id: gases.company })
                    .populate("gaslp")
                    .exec(function (error, company) {
                        var sumatoria = 0;
                        var enero = 0;
                        var febrero = 0;
                        var marzo = 0;
                        var abril = 0;
                        var mayo = 0;
                        var junio = 0;
                        var julio = 0;
                        var agosto = 0;
                        var septiembre = 0;
                        var octubre = 0;
                        var noviembre = 0;
                        var diciembre = 0;
                        for (var x of company.gaslp) {
                            sumatoria = sumatoria + parseFloat(x.emision);
                            enero = enero + parseFloat(x.enero);
                            febrero = febrero + parseFloat(x.febrero);
                            marzo = marzo + parseFloat(x.marzo);
                            abril = abril + parseFloat(x.abril);
                            mayo = mayo + parseFloat(x.mayo);
                            junio = junio + parseFloat(x.junio);
                            julio = julio + parseFloat(x.julio);
                            agosto = agosto + parseFloat(x.agosto);
                            septiembre = septiembre + parseFloat(x.septiembre);
                            octubre = octubre + parseFloat(x.octubre);
                            noviembre = noviembre + parseFloat(x.noviembre);
                            diciembre = diciembre + parseFloat(x.diciembre);
                        }
                        console.log(error);
                        console.log(company);
                        if (error) {
                            res.render("../views/gaseslp/AllGas", {
                                message: "error",
                                gases: company.gaslp,
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
                            //return res.json("all gases updated"); 
                            res.render("../views/gaseslp/AllGas", {
                                message: "success",
                                gases: company.gaslp,
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
                            var sumatoria = 0;
                            var enero = 0;
                            var febrero = 0;
                            var marzo = 0;
                            var abril = 0;
                            var mayo = 0;
                            var junio = 0;
                            var julio = 0;
                            var agosto = 0;
                            var septiembre = 0;
                            var octubre = 0;
                            var noviembre = 0;
                            var diciembre = 0;
                            for (var x of company.gaslp) {
                                sumatoria = sumatoria + parseFloat(x.emision);
                                enero = enero + parseFloat(x.enero);
                                febrero = febrero + parseFloat(x.febrero);
                                marzo = marzo + parseFloat(x.marzo);
                                abril = abril + parseFloat(x.abril);
                                mayo = mayo + parseFloat(x.mayo);
                                junio = junio + parseFloat(x.junio);
                                julio = julio + parseFloat(x.julio);
                                agosto = agosto + parseFloat(x.agosto);
                                septiembre = septiembre + parseFloat(x.septiembre);
                                octubre = octubre + parseFloat(x.octubre);
                                noviembre = noviembre + parseFloat(x.noviembre);
                                diciembre = diciembre + parseFloat(x.diciembre);
                            }
                            if (error) {
                                res.render("../views/gaseslp/AllGas", {
                                    company: company,
                                    message: "error",
                                    gases: company.gaslp,
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
                                res.render("../views/gaseslp/AllGas", {
                                    company: company,
                                    message: "success",
                                    gases: company.gaslp,
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
                } else {
                    Company.findOne({ _id: req.params.comp })
                        .populate("gaslp")
                        .exec(function (error, company) {
                            var sumatoria = 0;
                            var enero = 0;
                            var febrero = 0;
                            var marzo = 0;
                            var abril = 0;
                            var mayo = 0;
                            var junio = 0;
                            var julio = 0;
                            var agosto = 0;
                            var septiembre = 0;
                            var octubre = 0;
                            var noviembre = 0;
                            var diciembre = 0;
                            for (var x of company.gaslp) {
                                sumatoria = sumatoria + parseFloat(x.emision);
                                enero = enero + parseFloat(x.enero);
                                febrero = febrero + parseFloat(x.febrero);
                                marzo = marzo + parseFloat(x.marzo);
                                abril = abril + parseFloat(x.abril);
                                mayo = mayo + parseFloat(x.mayo);
                                junio = junio + parseFloat(x.junio);
                                julio = julio + parseFloat(x.julio);
                                agosto = agosto + parseFloat(x.agosto);
                                septiembre = septiembre + parseFloat(x.septiembre);
                                octubre = octubre + parseFloat(x.octubre);
                                noviembre = noviembre + parseFloat(x.noviembre);
                                diciembre = diciembre + parseFloat(x.diciembre);
                            }
                            if (error) {
                                res.render("../views/gaseslp/AllGas", {
                                    company: company,
                                    message: "error",
                                    gases: company.gaslp,
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
                                //return res.json("gas deleted!");
                                res.render("../views/gaseslp/AllGas", {
                                    company: company,
                                    message: "success",
                                    gases: company.gaslp,
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
                }
            });
        }
    });
};
module.exports = gasesController;