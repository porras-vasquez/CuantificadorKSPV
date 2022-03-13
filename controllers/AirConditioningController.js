'use strict'
require('../connection');
const Company = require("../models/Company");
const AirConditioning = require('../models/AirConditioning');
var airConditioningController = {};

airConditioningController.save = async function(req, res) {

    var airConditioning = new AirConditioning(req.body);
    var comp = await Company.findById(req.params.id);
    airConditioning.company = comp;
    //console.log(comp);
    await airConditioning.save(function(err, airConditionings) {
        console.log(airConditionings);
        if (err) { 
            res.render('../views/airConditioning/NewAirConditioning', { message : "error", company: airConditionings.company._id });
        }
        else{
            comp.airConditioning.push(airConditionings);
            comp.save(function(err, company){
                if (err) { 
                    res.render('../views/airConditioning/NewAirConditioning', { message : "error", company: company });
                }
                else{
                    res.render('../views/airConditioning/NewAirConditioning', { message : "success", company: company });
                }
            });
        }
    });
};

airConditioningController.searchCompany = function (req, res) {
    Company.findOne({ _id: req.params.id }).exec(function (err, company) {
        if (err) { console.log('Error: ', err); return; }
        res.render('../views/airConditioning/NewAirConditioning', { company: company._id });
    });
};
/*
FuelsAndOilController.list = function(req, res) {
    Company.findOne({ _id: req.params.id })
        .populate("fuelsAndOil")
        .exec(function (err, company) {
            if (err) {
                res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                    fuelsAndOils: company.fuelsAndOil,
                    company: company._id,
                });
            } else {
                res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                    fuelsAndOils: company.fuelsAndOil,
                    company: company._id,
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
    req.body.emision = 0;
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
    req.body.total = en+fe+mar+abr+may+jun+jul+ago+sep+oct+nov+dic;
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
           total: req.body.total
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
                      if (error) {
                          res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                              message: "error",
                              fuelsAndOils: company.fuelsAndOil,
                              company: company._id,
                          });
                      } else {
                          res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                              message: "success",
                              fuelsAndOils: company.fuelsAndOil,
                              company: company._id,
                          });
                      }
                  });
          } else {
              Company.findOne({ _id: fuelsAndOils.company })
                  .populate("fuelsAndOil")
                  .exec(function (error, company) {
                    console.log(error);
                    console.log(company);
                      if (error) {
                          res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                              message: "error",
                              fuelsAndOils: company.fuelsAndOil,
                              company: company._id,
                          });
                      } else {
                          res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                              message: "success",
                              fuelsAndOils: company.fuelsAndOil,
                              company: company._id,
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
                                if (error) {
                                    res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                        company: company,
                                        message: "error",
                                        fuelsAndOils: company.fuelsAndOil,
                                    });
                                } else {
                                    res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                        company: company,
                                        message: "success",
                                        fuelsAndOils: company.fuelsAndOil,
                                    });
                                }
                            });
                    } else {
                        Company.findOne({ _id: req.params.comp })
                            .populate("fuelsAndOil")
                            .exec(function (error, company) {
                                if (error) {
                                    res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                        company: company,
                                        message: "error",
                                        fuelsAndOils: company.fuelsAndOil,
                                    });
                                } else {
                                    res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                        company: company,
                                        message: "success",
                                        fuelsAndOils: company.fuelsAndOil,
                                    });
                                }
                            });
                    }
                });
            }
        });
    };
    */
module.exports = airConditioningController;