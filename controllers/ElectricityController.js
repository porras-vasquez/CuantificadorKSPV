"use strict";
require("../connection");
const Electricity = require("../models/Electricity");
const Company = require("../models/Company");
var electricityController = {};
var status = 0;

//Método para verificar el estatus de las transacciones 
function verifyStatus(err, obj){
    if(obj){//Satisfactorio
        status=200;
    }else if(err){//Solicitud incorrecta
        status=400;
    }else if(err){//No autenticado
        status=401;
    }else if(err){//No encontrado
        status=404;
    }else if(err){//Error del servidor
        status=500;
    }else if(err){//Mantenimiento
        status=503;
    }
}

//Método para guardar reportes de electricidad
electricityController.save = async function (req, res) {
    req.body.total = 0;
    var electricity = new Electricity(req.body);
    var comp = await Company.findById(req.params.id);
    electricity.company = comp;
    await electricity.save(function (error, elec) {
        verifyStatus(error, elec);
        res.send(error);
        if (error) {
            res.render("../views/electricity/NewElectricity", {
                status: status,
                company: elec.company._id,
            });
        } else {
            comp.electricidad.push(electricity);
            comp.save(function (err, company) {
                if (err) {
                    res.render("../views/electricity/NewElectricity", {
                        status: status,
                        company: company,
                    });
                } else {
                    res.render("../views/electricity/NewElectricity", {
                        status: status,
                        company: company,
                    });
                }
            });
        }
    });
    status=0;
};

//Método que renderiza el objeto compañía a la vista de NewElectricity
electricityController.renderPageNewElectricity = function (req, res) {
    Company.findOne({ _id: req.params.id }).exec(function (err, company) {
        if (err) {
            res.render("../views/electricity/NewElectricity", { company: company._id });
        }else{
            res.render("../views/electricity/NewElectricity", { company: company._id });
        }
    });
};

//Método que renderiza el objeto compañía a la vista de AllElectricities
electricityController.renderPageAllElectricites = function (req, res) {
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

//Método que renderiza el objeto electricidad a la vista de EditElectricity
electricityController.renderPageEditElectricity = function (req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function (err, electricity) {
        if (err) {
            res.render("../views/electricity/EditElectricity", {
                electricity: electricity,
                company: electricity.company,
            });
        } else {
            res.render("../views/electricity/EditElectricity", {
                electricity: electricity,
                company: electricity.company,
            });
        }
    });
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
                factor_emision: req.body.factor_emision,
            },
        },
        { new: true },
        function (err, electricity) {
            if (err) {
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

electricityController.delete = function (req, res) {
    Company.updateOne({ "_id": req.params.comp }, {
        $pull: { "electricidad": req.params.id }
    }).exec(function (err, electricity) {
        if (electricity) {
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

//--------------------------------------------------METER FUNCTIONS--------------------------------------------

//Método que renderiza el objeto electricidad a la vista de NewMeter
electricityController.renderPageNewMeter = function (req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function (err, electricity) {
        if (err) {
            res.render("../views/electricity/NewMeter", {
                company: electricity.company,
                electricity: electricity,
            });
        } else {
            res.render("../views/electricity/NewMeter", {
                company: electricity.company,
                electricity: electricity,
            });
        }
    });
};

electricityController.addMeter = function (req, res) {
    req.body.total = 0;
    Electricity.updateOne(
        { _id: req.params._id },
        {
            $push: {
                medidor: {
                    numero: req.body.numero,
                    nise: req.body.nise,
                    ubicacion: req.body.ubicacion,
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
        },
        (error, elec) => {
            if (error) {
                Electricity.findOne({ _id: req.params._id }).exec(function (err, electricity) {
                    if (err) {
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
                });
            } else {
                Electricity.findOne({ _id: req.params._id }).exec(function (err, electricity) {
                    if (err) {
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
                });
            }
        }
    );
};

//Método que renderiza el medidor a la vista de EditMeter
electricityController.renderPageEditMeter = function (req, res) {
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
                if (req.params.meter == x._id) {
                    m = x;
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
                "medidor.$.numero": req.body.numero,
                "medidor.$.nise": req.body.nise,
                "medidor.$.ubicacion": req.body.ubicacion,
                "medidor.$.enero": req.body.enero,
                "medidor.$.febrero": req.body.febrero,
                "medidor.$.marzo": req.body.marzo,
                "medidor.$.abril": req.body.abril,
                "medidor.$.mayo": req.body.mayo,
                "medidor.$.junio": req.body.junio,
                "medidor.$.julio": req.body.julio,
                "medidor.$.agosto": req.body.agosto,
                "medidor.$.septiembre": req.body.septiembre,
                "medidor.$.octubre": req.body.octubre,
                "medidor.$.noviembre": req.body.noviembre,
                "medidor.$.diciembre": req.body.diciembre
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
                        if (req.params.meter == x._id) {
                            m = x;
                        }
                    }
                    res.render("../views/electricity/EditMeter", {
                        message: "success",
                        electricity: electric,
                        company: electric.company,
                        meter: m,
                    });
                } else {
                    res.render("../views/electricity/EditMeter", {
                        message: "error",
                        electricity: electric,
                        company: electric.company,
                        meter: req.body,
                    });
                }
            });
        }
    );
};

electricityController.renderPageAllMeters = function (req, res) {
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

electricityController.deleteMeter = function (req, res) {
    Electricity.updateOne({ "_id": req.params.elec }, {
        "$pull": {
            "medidor": {
                "_id": req.params.meter
            }
        }
    }, { multi: true }).exec(function (err, electricity) {
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
