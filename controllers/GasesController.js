'use strict'
require('../connection');
const Gaseslp = require('../models/Gaseslp');
const Company = require("../models/Company");
var gasesController = {};
gasesController.save = async function(req, res) {
    req.body.emision = 0;
    var gases = new Gaseslp(req.body);
    var comp = await Company.findById(req.params.id);
    gases.company = comp;
    //console.log(comp);
    await gases.save(function(err, gas) {
        console.log(gas);
        if (err) { 
            res.render('../views/gaseslp/NewGas', { message : "error", company: gas.company._id });
        }
        else{
            comp.gaslp.push(gases);
            comp.save(function(err, company){
                if (err) { 
                    res.render('../views/gaseslp/NewGas', { message : "error", company: company });
                }
                else{
                    res.render('../views/gaseslp/NewGas', { message : "success", company: company });
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
gasesController.list = function(req, res) {
    Company.findOne({ _id: req.params.id })
        .populate("gaslp")
        .exec(function (err, company) {
            if (err) {
                res.render("../views/gaseslp/AllGas", {
                    gases: company.gaslp,
                    company: company._id,
                });
            } else {
                res.render("../views/gaseslp/AllGas", {
                    gases: company.gaslp,
                    company: company._id,
                });
            }
        });
};
gasesController.search = function (req, res) {
    Gaseslp.findOne({ _id: req.params.id }).exec(function (err, gaslp) {
        if (err) {
            console.log("Error: ", err);
            res.render("../views/gaseslp/search", {
                gaslp: gaslp,
                company: gaslp.company,
            });
        } else {
            res.render("../views/gaseslp/search", {
                gaslp: gaslp,
                company: gaslp.company,
            });
        }
    });
};
gasesController.update = function (req, res) {
    req.body.emision = 0;
  Gaseslp.findByIdAndUpdate(
      req.params.id,
      {
          $set: {
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
          },
      },
      { new: true },
      function (err, gases) {
          console.log(gases);
          console.log(gases.company);
          if (err) {
              console.log("Error: ", err);

              Company.findOne({ _id: gases.company })
                  .populate("gaslp")
                  .exec(function (error, company) {
                      if (error) {
                          res.render("../views/gaseslp/AllGas", {
                              message: "error",
                              gases: company.gaslp,
                              company: company._id,
                          });
                      } else {
                          res.render("../views/gaseslp/AllGas", {
                              message: "success",
                              gases: company.gaslp,
                              company: company._id,
                          });
                      }
                  });
          } else {
              Company.findOne({ _id: gases.company })
                  .populate("gaslp")
                  .exec(function (error, company) {
                    console.log(error);
                    console.log(company);
                      if (error) {
                          res.render("../views/gaseslp/AllGas", {
                              message: "error",
                              gases: company.gaslp,
                              company: company._id,
                          });
                      } else {
                          res.render("../views/gaseslp/AllGas", {
                              message: "success",
                              gases: company.gaslp,
                              company: company._id,
                          });
                      }
                  });
          }
      }
  );
};

gasesController.delete = function (req, res) {
    Company.updateOne({ "_id": req.params.comp }, {
        $pull:{"gaslp": req.params.id}
      }).exec(function (err, objGases) {
        if(objGases){
            Gaseslp.deleteOne({ _id: req.params.id }, function (err) {
                if (err) {
                    Company.findOne({ _id: req.params.comp })
                        .populate("gaslp")
                        .exec(function (error, company) {
                            if (error) {
                                res.render("../views/gaseslp/AllGas", {
                                    company: company,
                                    message: "error",
                                    gases: company.gaslp,
                                });
                            } else {
                                res.render("../views/gaseslp/AllGas", {
                                    company: company,
                                    message: "success",
                                    gases: company.gaslp,
                                });
                            }
                        });
                } else {
                    Company.findOne({ _id: req.params.comp })
                        .populate("gaslp")
                        .exec(function (error, company) {
                            if (error) {
                                res.render("../views/gaseslp/AllGas", {
                                    company: company,
                                    message: "error",
                                    gases: company.gaslp,
                                });
                            } else {
                                res.render("../views/gaseslp/AllGas", {
                                    company: company,
                                    message: "success",
                                    gases: company.gaslp,
                                });
                            }
                        });
                }
            });
        }
    });
};
module.exports = gasesController;