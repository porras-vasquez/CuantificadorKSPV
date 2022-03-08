"use strict";
require("../connection");
const Electricity = require("../models/Electricity");
const Company = require("../models/Company");
var electricityController = {};

electricityController.save = async function (req, res) {
    var electricity = new Electricity(req.body);
    var comp = await Company.findById(req.params.id);
    electricity.company = comp;
    //console.log(comp);
    await electricity.save(function (err, elec) {
        console.log(elec);
        if (err) {
            res.render("../views/electricity/NewElectricity", {
                message: "error",
                company: elec.company._id,
            });
        } else {
            comp.electricidad.push(electricity);
            comp.save(function (err, company) {
                if (err) {
                    res.render("../views/electricity/NewElectricity", {
                        message: "error",
                        company: company,
                    });
                } else {
                    res.render("../views/electricity/NewElectricity", {
                        message: "success",
                        company: company,
                    });
                }
            });
        }
    });
};

electricityController.searchCompany = function (req, res) {
    Company.findOne({ _id: req.params.id }).exec(function (err, company) {
        if (err) {
            console.log("Error: ", err);
            return;
        }
        res.render("../views/electricity/NewElectricity", { company: company._id });
    });
};

electricityController.list = function (req, res) {
    console.log(req.params.id);
    Company.findOne({ _id: req.params.id })
        .populate("electricidad")
        .exec(function (err, company) {
            if (err) {
                res.render("../views/electricity/AllElectricities", {
                    electricities: company.electricidad,
                    company: company._id,
                });
            } else {
                res.render("../views/electricity/AllElectricities", {
                    electricities: company.electricidad,
                    company: company._id,
                });
            }
            console.log(company);
        });
};

electricityController.list2 = function (req, res) {
    Company.findOne({ _id: req.params.id })
        .populate("electricidad")
        .exec(function (err, company) {
            if (err) {
                res.render("../views/electricity/AllElectricities", {
                    electricities: company.electricidad,
                    company: company._id,
                });
            } else {
                res.render("../views/electricity/AllElectricities", {
                    electricities: company.electricidad,
                    company: company._id,
                });
            }
        });
};

electricityController.search = function (req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function (err, electricity) {
        if (err) {
            console.log("Error: ", err);
            res.render("../views/electricity/search", {
                electricity: electricity,
                company: electricity.company,
            });
        } else {
            res.render("../views/electricity/search", {
                electricity: electricity,
                company: electricity.company,
            });
        }
    });
};

electricityController.meter = function (req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function (err, electricity) {
        if (err) {
            console.log("Error:", err);
            res.render("../views/electricity/NewMeter", {
                electricity: electricity,
                company: electricity.company,
            });
        } else {
            res.render("../views/electricity/NewMeter", {
                electricity: electricity,
                company: electricity.company,
            });
        }
        console.log(electricity.company);
    });
};

electricityController.getMeters = function (req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function (err, electricity) {
        if (err) {
            res.render("../views/electricity/AllMeters", {
                electricity: electricity,
                company: electricity.company,
            });
        } else {
            res.render("../views/electricity/AllMeters", {
                electricity: electricity,
                company: electricity.company,
            });
        }
    });
};

electricityController.editMeter = function (req, res) {
    Electricity.findOne({ _id: req.params.elec }).exec(function (
        err,
        electricity
    ) {
        if (err) {
            res.render("../views/electricity/EditMeter", {
                electricity: electricity,
                company: electricity.company,
                meter: electricity.medidor,
            });
        } else {
            var m;
            for (var x of electricity.medidor) {
                console.log(x._id + " " + x.nrc);
                if (req.params.meter == x._id) {
                    m = x;
                    console.log("MEDIDOR" + m);
                }
            }
            res.render("../views/electricity/EditMeter", {
                electricity: electricity,
                company: electricity.company,
                meter: m,
            });
        }
    });
};

electricityController.updateMeter = function (req, res) {
    Electricity.updateOne(
        { _id: req.params.elec, "medidor._id": req.params.meter },
        {
            $set: {
                "medidor.$.nrc": req.body.nrc,
                "medidor.$.type": req.body.type,
                "medidor.$.medida": req.body.medida,
            },
        },
        { new: true },
        function (err, electricity) {
            Electricity.findOne({ _id: req.params.elec }).exec(function (
                err,
                electric
            ) {
                if (electric) {
                    var m;
                    for (var x of electric.medidor) {
                        console.log(x._id + " " + x.nrc);
                        if (req.params.meter == x._id) {
                            m = x;
                            console.log("ACTUALIZAR" + m);
                        }
                    }
                    res.render("../views/electricity/EditMeter", {
                        message: "success",
                        electricity: electric,
                        company: electric.company,
                        meter: m,
                    });
                } else {
                    console.log("Error: ", err);
                    //res.redirect('/electricities/electricities2');
                    res.render("../views/electricity/EditMeter", {
                        message: "error",
                        electricity: electric,
                        company: electric.company,
                        meter: req.body,
                    });
                }
            });
            //res.redirect('/electricities/electricities2');
        }
    );
};

electricityController.update = function (req, res) {
    Electricity.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                titulo: req.body.titulo,
                unidad_medida: req.body.unidad_medida,
                fuente_reporte: req.body.fuente_reporte,
                ultima_update: req.body.ultima_update,
                observacion: req.body.observacion,
            },
        },
        { new: true },
        function (err, electricity) {
            if (err) {
                console.log("Error: ", err);

                Company.findOne({ _id: electricity.company })
                    .populate("electricidad")
                    .exec(function (error, company) {
                        if (error) {
                            res.render("../views/electricity/AllElectricities", {
                                message: "error",
                                electricities: company.electricidad,
                                company: company._id,
                            });
                        } else {
                            res.render("../views/electricity/AllElectricities", {
                                message: "success",
                                electricities: company.electricidad,
                                company: company._id,
                            });
                        }
                    });
            } else {
                Company.findOne({ _id: electricity.company })
                    .populate("electricidad")
                    .exec(function (error, company) {
                        if (error) {
                            res.render("../views/electricity/AllElectricities", {
                                message: "error",
                                electricities: company.electricidad,
                                company: company._id,
                            });
                        } else {
                            res.render("../views/electricity/AllElectricities", {
                                message: "success",
                                electricities: company.electricidad,
                                company: company._id,
                            });
                        }
                    });
            }
        }
    );
};

electricityController.addMeter = function (req, res) {
    Electricity.updateOne(
        { _id: req.params._id },
        {
            $push: {
                medidor: {
                    nrc: req.body.nrc,
                    type: req.body.type,
                    medida: req.body.medida,
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
                },
            },
        },
        (error, electricity) => {
            if (error) {
                res.render("../views/electricity/NewMeter", {
                    company: electricity.company,
                    electricity: electricity,
                    message: "error",
                });
            } else {
                res.render("../views/electricity/NewMeter", {
                    company: electricity.company,
                    electricity: electricity,
                    message: "success",
                });
            }
        }
    );
};

electricityController.delete = function (req, res) {
    Company.updateOne({ "_id": req.params.comp }, {
        $pull:{"electricidad": req.params.id}
      }).exec(function (err, electricity) {
        if(electricity){
            Electricity.deleteOne({ _id: req.params.id }, function (err) {
                if (err) {
                    Company.findOne({ _id: req.params.comp })
                        .populate("electricidad")
                        .exec(function (error, company) {
                            if (error) {
                                res.render("../views/electricity/AllElectricities", {
                                    company: company,
                                    message: "error",
                                    electricities: company.electricidad,
                                });
                            } else {
                                res.render("../views/electricity/AllElectricities", {
                                    company: company,
                                    message: "success",
                                    electricities: company.electricidad,
                                });
                            }
                        });
                } else {
                    Company.findOne({ _id: req.params.comp })
                        .populate("electricidad")
                        .exec(function (error, company) {
                            if (error) {
                                res.render("../views/electricity/AllElectricities", {
                                    company: company,
                                    message: "error",
                                    electricities: company.electricidad,
                                });
                            } else {
                                res.render("../views/electricity/AllElectricities", {
                                    company: company,
                                    message: "success",
                                    electricities: company.electricidad,
                                });
                            }
                        });
                }
            });
        }
    });
};

electricityController.deleteMeter = function (req, res) {
    console.log("ELIMINAR: " + req.params.meter);
    Electricity.updateOne({ "_id": req.params.elec }, {
        "$pull": {
          "medidor": {
            "_id": req.params.meter
          }
        }
      }, {multi: true}).exec(function (err, electricity) {
        if (err) {
            Electricity.findOne({ _id: req.params.elec }).exec(function (err, electricity) {
                if (err) {
                    res.render("../views/electricity/AllMeters", {
                        message: "error",
                        electricity: electricity,
                        company: electricity.company,
                    });
                } else {
                    res.render("../views/electricity/AllMeters", {
                        message: "success",
                        electricity: electricity,
                        company: electricity.company,
                    });
                }
            });
        } else {
            Electricity.findOne({ _id: req.params.elec }).exec(function (err, electricity) {
                if (err) {
                    res.render("../views/electricity/AllMeters", {
                        message: "error",
                        electricity: electricity,
                        company: electricity.company,
                    });
                } else {
                    res.render("../views/electricity/AllMeters", {
                        message: "success",
                        electricity: electricity,
                        company: electricity.company,
                    });
                }
            });
        }
    });
};
module.exports = electricityController;
