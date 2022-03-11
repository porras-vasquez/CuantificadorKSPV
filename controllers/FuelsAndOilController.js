'use strict'
require('../connection');
const Company = require("../models/Company");
const FuelsAndOil = require('../models/FuelsAndOil');
var FuelsAndOilController = {};

FuelsAndOilController.save = async function(req, res) {

    var fuelsAndOil = new FuelsAndOil(req.body);
    var comp = await Company.findById(req.params.id);
    fuelsAndOil.company = comp;
    //console.log(comp);
    await fuelsAndOil.save(function(err, fuels) {
        console.log(fuels);
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
            diciembre: req.body.diciembre
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
    
module.exports = FuelsAndOilController;