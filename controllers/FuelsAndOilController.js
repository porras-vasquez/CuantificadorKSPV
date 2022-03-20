'use strict'
require('../connection');
const Company = require("../models/Company");
const FuelsAndOil = require('../models/FuelsAndOil');
const { clearCache } = require('ejs');
var FuelsAndOilController = {};

function calc(req){
    let en = parseFloat(req.body.enero)
    let fe = parseFloat(req.body.febrero)
    let mar = parseFloat(req.body.marzo)
    let abr = parseFloat(req.body.abril)
    let may = parseFloat(req.body.mayo)
    let jun = parseFloat(req.body.junio)
    let jul = parseFloat(req.body.julio)
    let ago = parseFloat(req.body.agosto)
    let sep = parseFloat(req.body.septiembre)
    let oct = parseFloat(req.body.octubre)
    let nov = parseFloat(req.body.noviembre)
    let dic = parseFloat(req.body.diciembre)
    if (dic > 0) {
        req.body.emision = en + fe + mar + abr + may + jun + jul + ago + sep + oct + nov + dic;
    }
};
FuelsAndOilController.save = async function(req, res) {
    calc(req);
    var fuelsAndOil = new FuelsAndOil(req.body);
    var comp = await Company.findById(req.params.id);
    fuelsAndOil.company = comp;
    console.log(req.body.total);
    await fuelsAndOil.save(function(err, fuels) {
        if (err) { 
            res.render('../views/fuelsAndOil/NewfuelsAndOil', { message : "error", company: fuels.company._id });
        }
        else{
            comp.fuelsAndOil.push(fuels);
            comp.save(function(err, company){
                if (err) { 
                    res.render('../views/fuelsAndOil/NewfuelsAndOil', { message : "error", company: company });
                }
                else{
                    res.render('../views/fuelsAndOil/NewfuelsAndOil', { message : "success", company: company });
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

FuelsAndOilController.list = function(req, res) {
    Company.findOne({ _id: req.params.id })
        .populate("fuelsAndOil")
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
            for (var x of company.fuelsAndOil) {
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
            console.log("Error: ", err);
            res.render("../views/fuelsAndOil/search", {
                fuelsAndOil: fuelsAndOil,
                company: fuelsAndOil.company,
            });
        } else {
            res.render("../views/fuelsAndOil/search", {
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
              console.log("Error: ", err);

              Company.findOne({ _id: fuelsAndOils.company })
                  .populate("fuelsAndOil")
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
                    for (var x of company.fuelsAndOil) {
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
                          res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                              message: "error",
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
                          res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                              message: "success",
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
          } else {
              Company.findOne({ _id: fuelsAndOils.company })
                  .populate("fuelsAndOil")
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
                    for (var x of company.fuelsAndOil) {
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
                          res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                              message: "error",
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
                          res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                              message: "success",
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
          }
      }
  );
};

FuelsAndOilController.delete = function (req, res) {
    Company.updateOne({ "_id": req.params.comp }, {
            $pull:{"fuelsAndOil": req.params.id}
          }).exec(function (err, fuelsAndOil) {
            if(fuelsAndOil){
                FuelsAndOil.deleteOne({ _id: req.params.id }, function (err) {
                    if (err) {
                        Company.findOne({ _id: req.params.comp })
                            .populate("fuelsAndOil")
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
                                for (var x of company.fuelsAndOil) {
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
                                    res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                        company: company,
                                        message: "error",
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
                                    });
                                } else {
                                    res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                        company: company,
                                        message: "success",
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
                                    });
                                }
                            });
                    } else {
                        Company.findOne({ _id: req.params.comp })
                            .populate("fuelsAndOil")
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
                                for (var x of company.fuelsAndOil) {
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
                                    res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                        company: company,
                                        message: "error",
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
                                    });
                                } else {
                                    res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                        company: company,
                                        message: "success",
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
                                    });
                                }
                            });
                    }
                });
            }
        });
    };
    
module.exports = FuelsAndOilController;