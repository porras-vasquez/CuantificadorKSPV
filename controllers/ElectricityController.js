"use strict";
require("../connection");
const Electricity = require("../models/Electricity");
const Company = require("../models/Company");
var electricityController = {};
var status = 0;
var message="";

//Método para verificar el estatus de las transacciones 
function verifyStatus(statusCode){
    if(statusCode==200){//Satisfactorio
        status=200;
        message="¡Realizado exitosamente!";
    }else if(statusCode==400){//Solicitud incorrecta
        status=400;
        message="¡Error, solicitud incorrecta!";
    }else if(statusCode==401){//No autenticado
        status=401;
        message="¡Error, usuario no autenticado!";
    }else if(statusCode==404){//No encontrado
        status=404;
        message="¡Ocurrió un problema con la ruta de acceso!";
    }else if(statusCode==500){//Error del servidor
        status=500;
        message="¡Lo sentimos, ocurrió un problema con el servidor!";
    }else if(statusCode==503){//Mantenimiento
        status=503;
        message="¡Lo sentimos, el servidor se encuentra en mantenimiento!";
    }
}

//Método para guardar reportes de electricidad
electricityController.save = async function (req, res) {
    req.body.total = 0;
    var electricity = new Electricity(req.body);
    var comp = await Company.findById(req.params.id);
    electricity.company = comp;
    await electricity.save(function (error, elec) {
        if (error) {
            verifyStatus(res.statusCode);
            res.render("../views/electricity/NewElectricity", {
                status: status,
                company: elec.company._id,
                message: message
            });
        } else {
            comp.electricidad.push(electricity);
            comp.save(function (err, company) {
                if (err) {
                    verifyStatus(res.statusCode);
                    res.render("../views/electricity/NewElectricity", {
                        status: status,
                        company: company,
                        message: message
                    });
                } else {
                    verifyStatus(res.statusCode);
                    res.render("../views/electricity/NewElectricity", {
                        status: status,
                        company: company,
                        message: message
                    });
                }
            });
        }
    });
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
                gei: req.body.gei,
                pcg: req.body.pcg,
            },
        },
        { new: true },
        function (err, electricity) {
            if (err) {
                Company.findOne({ _id: electricity.company })
                    .populate("electricidad")
                    .exec(function (error, company) {
                        if (error) {
                            verifyStatus(res.statusCode);
                            res.render("../views/electricity/AllElectricities", {
                                message: message,
                                electricities: company.electricidad,
                                company: company._id,
                                status: status
                            });
                        } else {
                            verifyStatus(res.statusCode);
                            res.render("../views/electricity/AllElectricities", {
                                message: message,
                                electricities: company.electricidad,
                                company: company._id,
                                status: status
                            });
                        }
                    });
            } else {
                Company.findOne({ _id: electricity.company })
                    .populate("electricidad")
                    .exec(function (error, company) {
                        if (error) {
                            verifyStatus(res.statusCode);
                            res.render("../views/electricity/AllElectricities", {
                                message: message,
                                electricities: company.electricidad,
                                company: company._id,
                                status: status
                            });
                        } else {
                            verifyStatus(res.statusCode);
                            res.render("../views/electricity/AllElectricities", {
                                message: message,
                                electricities: company.electricidad,
                                company: company._id,
                                status: status
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
                                verifyStatus(res.statusCode);
                                res.render("../views/electricity/AllElectricities", {
                                    company: company,
                                    message: message,
                                    electricities: company.electricidad,
                                    status: status
                                });
                            } else {
                                verifyStatus(res.statusCode);
                                res.render("../views/electricity/AllElectricities", {
                                    company: company,
                                    message: message,
                                    electricities: company.electricidad,
                                    status: status
                                });
                            }
                        });
                } else {
                    Company.findOne({ _id: req.params.comp })
                        .populate("electricidad")
                        .exec(function (error, company) {
                            if (error) {
                                verifyStatus(res.statusCode);
                                res.render("../views/electricity/AllElectricities", {
                                    company: company,
                                    message: message,
                                    electricities: company.electricidad,
                                    status: status
                                });
                            } else {
                                verifyStatus(res.statusCode);
                                res.render("../views/electricity/AllElectricities", {
                                    company: company,
                                    message: message,
                                    electricities: company.electricidad,
                                    status: status
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
                        verifyStatus(res.statusCode);
                        res.render("../views/electricity/NewMeter", {
                            company: electricity.company,
                            electricity: electricity,
                            message: message,
                            status: status
                        });
                    } else {
                        verifyStatus(res.statusCode);
                        res.render("../views/electricity/NewMeter", {
                            company: electricity.company,
                            electricity: electricity,
                            message: message,
                            status: status
                        });
                    }
                });
            } else {
                Electricity.findOne({ _id: req.params._id }).exec(function (err, electricity) {
                    if (err) {
                        verifyStatus(res.statusCode);
                        res.render("../views/electricity/NewMeter", {
                            company: electricity.company,
                            electricity: electricity,
                            message: message,
                            status: status
                        });
                    } else {
                        verifyStatus(res.statusCode);
                        res.render("../views/electricity/NewMeter", {
                            company: electricity.company,
                            electricity: electricity,
                            message: message,
                            status: status
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
                    verifyStatus(res.statusCode);
                    res.render("../views/electricity/AllMeters", {
                        message: message,
                        electricity: electric,
                        company: electric.company,
                        meter: m,
                        status: status
                    });
                } else {
                    verifyStatus(res.statusCode);
                    res.render("../views/electricity/AllMeters", {
                        message: message,
                        electricity: electric,
                        company: electric.company,
                        meter: req.body,
                        status: status
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
                    verifyStatus(res.statusCode);
                    res.render("../views/electricity/AllMeters", {
                        message: message,
                        electricity: electricity,
                        company: electricity.company,
                        status: status
                    });
                } else {
                    verifyStatus(res.statusCode);
                    res.render("../views/electricity/AllMeters", {
                        message: message,
                        electricity: electricity,
                        company: electricity.company,
                        status: status
                    });
                }
            });
        } else {
            Electricity.findOne({ _id: req.params.elec }).exec(function (err, electricity) {
                if (err) {
                    verifyStatus(res.statusCode);
                    res.render("../views/electricity/AllMeters", {
                        message: message,
                        electricity: electricity,
                        company: electricity.company,
                        status: status
                    });
                } else {
                    verifyStatus(res.statusCode);
                    res.render("../views/electricity/AllMeters", {
                        message: message,
                        electricity: electricity,
                        company: electricity.company,
                        status: status
                    });
                }
            });
        }
    });
};
module.exports = electricityController;
