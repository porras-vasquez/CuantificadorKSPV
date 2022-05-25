"use strict";
require("../connection");
const Electricity = require("../models/Electricity");
const Company = require("../models/Company");
var Emission = require("../models/Emission");
var electricityController = {};
var status = 0;
var message="";
var sumatoria = 0; var enero = 0; var febrero = 0; var marzo = 0; var abril = 0; var mayo = 0; var junio = 0;
var julio = 0; var agosto = 0; var septiembre = 0; var octubre = 0; var noviembre = 0; var diciembre = 0;

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

function calc(req) {
    req.body.total = (
        parseFloat(req.body.enero) + parseFloat(req.body.febrero) + parseFloat(req.body.marzo)
        + parseFloat(req.body.abril) + parseFloat(req.body.mayo) + parseFloat(req.body.junio) 
        + parseFloat(req.body.julio) + parseFloat(req.body.agosto) + parseFloat(req.body.septiembre) 
        + parseFloat(req.body.octubre) + parseFloat(req.body.noviembre) + parseFloat(req.body.diciembre)
    );
    req.body.total = parseFloat(req.body.total).toFixed(5);
};

function sum(electricity){
    sumatoria = 0; enero = 0; febrero = 0; marzo = 0; abril = 0; mayo = 0; junio = 0;
    julio = 0; agosto = 0; septiembre = 0; octubre = 0; noviembre = 0; diciembre = 0;
    for (var x of electricity.medidor) {
        sumatoria = sumatoria + parseFloat(x.total); enero = enero + parseFloat(x.enero); febrero = febrero + parseFloat(x.febrero);
        marzo = marzo + parseFloat(x.marzo); abril = abril + parseFloat(x.abril); mayo = mayo + parseFloat(x.mayo);
        junio = junio + parseFloat(x.junio); julio = julio + parseFloat(x.julio); agosto = agosto + parseFloat(x.agosto);
        septiembre = septiembre + parseFloat(x.septiembre); octubre = octubre + parseFloat(x.octubre);
        noviembre = noviembre + parseFloat(x.noviembre); diciembre = diciembre + parseFloat(x.diciembre);
    }
    sumatoria = parseFloat(sumatoria).toFixed(5);
}

//Método para guardar reportes de electricidad
electricityController.save = async function (req, res) {
    req.body.total = 0;
    var electricity = new Electricity(req.body);
    var comp = await Company.findById(req.params.comp);
    electricity.company = comp;
    await electricity.save(function (error, elec) {
        verifyStatus(res.statusCode);
        if (error) {
            res.render("../views/electricity/NewElectricity", {
                status: status,
                company: elec.company._id,
                message: message
            });
        } else {
            var ton = elec.factor_emision/1000;
            ton = parseFloat(ton).toFixed(5);
            var body = {
                alcance: "2",
                fuente_generador:"Electricidad",
                cantidad: "",
                unidad: "Kilowatts/hora",
                kilogram: elec.factor_emision,
                ton: ton,
                gei: elec.gei,
                pcg: elec.pcg,
                co2: 0,
                ch4: 0,
                n2o: 0,
                company: elec.company._id,
                electricity: elec._id
            };
            var emission = new Emission(body);
            emission.save();

            comp.electricidad.push(electricity);
            comp.emission.push(emission);
            comp.save();
            res.render("../views/electricity/NewElectricity", {
                status: status,
                company: elec.company._id,
                message: message
            });
        }
    });
};

//Método que renderiza el objeto compañía a la vista de NewElectricity
electricityController.renderPageNewElectricity = function (req, res) {
    Company.findOne({ _id: req.params.comp }).exec(function (err, company) {
        if (err) {
            res.render("../views/electricity/NewElectricity", { company: company._id });
        }else{
            res.render("../views/electricity/NewElectricity", { company: company._id });
        }
    });
};

//Método que renderiza el objeto compañía a la vista de AllElectricities
electricityController.renderPageAllElectricites = function (req, res) {
    Company.findOne({ _id: req.params.comp })
        .populate("electricidad")
        .exec(function (err, company) {
            var total = 0; 
            for (var x of company.electricidad) {
                total = total + parseFloat(x.total); 
            }
            res.render("../views/electricity/AllElectricities", {
                electricities: company.electricidad,
                company: company._id,
                sumatoria: total
            });
        });
};

//Método que renderiza el objeto electricidad a la vista de EditElectricity
electricityController.renderPageEditElectricity = function (req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function (err, electricity) {
        res.render("../views/electricity/EditElectricity", {
            electricity: electricity,
            company: electricity.company,
        });
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
            verifyStatus(res.statusCode);
            if (err) {
                Company.findOne({ _id: electricity.company })
                    .populate("electricidad")
                    .exec(function (error, company) {
                        res.render("../views/electricity/AllElectricities", {
                            message: message,
                            electricities: company.electricidad,
                            company: company._id,
                            status: status
                        });
                    });
            } else {
                var cant;
                var ton;
                var pcg;
                var co2;
                var kg;
                Electricity.findOne({ _id: req.params.id }).exec(function (err, elec) {
                    cant = elec.total;
                    ton = elec.factor_emision/1000;
                    ton = parseFloat(ton).toFixed(5);
                    pcg = elec.pcg;
                    co2 = cant * ton * pcg;
                    co2 = parseFloat(co2).toFixed(5);
                    kg = elec.factor_emision;
                    Emission.updateOne({ electricity: req.params.id }, {
                        $set: {
                            co2: co2,
                            kilogram: kg,
                            pcg: pcg, 
                            ton: ton
                        },
                    }).exec(function (err, ems) {});
                });
                Company.findOne({ _id: electricity.company })
                    .populate("electricidad")
                    .exec(function (error, company) {    
                    res.render("../views/electricity/AllElectricities", {
                        message: message,
                        electricities: company.electricidad,
                        company: company._id,
                        status: status,
                        sumatoria: sumatoria
                    });
                });                
            }
        }
    );
};

electricityController.delete = function (req, res) {
    var id;
    Emission.findOne({ electricity: req.params.id }).exec(function (err, e) {
        id = e._id;
        Company.updateOne({ _id: req.params.comp }, {
            $pull: { 
                emission: id
            }
        }).exec(function (err, electricity) {
        });
    });
    Company.updateOne({ _id: req.params.comp }, {
        $pull: { 
            electricidad: req.params.id
        }
    }).exec(function (err, electricity) {
        if (electricity) {
            Electricity.deleteOne({ _id: req.params.id }, function (err) {
                verifyStatus(res.statusCode);
                Company.findOne({ _id: req.params.comp })
                .populate("electricidad")
                .exec(function (error, company) {
                    Emission.deleteOne({ electricity: req.params.id }).exec(function (err, electricity) {});
                    var total = 0; 
                    for (var x of company.electricidad) {
                        total = total + parseFloat(x.total); 
                    }
                    res.render("../views/electricity/AllElectricities", {
                        company: company,
                        message: message,
                        electricities: company.electricidad,
                        status: status,
                        sumatoria: total
                    });
                });
            });
        }else{
            Company.findOne({ _id: req.params.comp })
            .populate("electricidad")
            .exec(function (error, company) {
                res.render("../views/electricity/AllElectricities", {
                    company: company,
                    message: message,
                    electricities: company.electricidad,
                    status: status,
                    sumatoria: total
                });
            })
        }
    });
};

//--------------------------------------------------METER FUNCTIONS--------------------------------------------

//Método que renderiza el objeto electricidad a la vista de NewMeter
electricityController.renderPageNewMeter = function (req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function (err, electricity) {
        var emission;
        Company.findOne({_id: req.params.comp}).exec(function (err, comp) {
            emission = comp.emission
        });
        res.render("../views/electricity/NewMeter", {
            company: electricity.company,
            electricity: electricity,
            emission: emission
        });
    });
};

electricityController.addMeter = function (req, res) {
    calc(req);
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
            verifyStatus(res.statusCode);
            if (error) {
                Electricity.findOne({ _id: req.params._id }).exec(function (err, electricity) {
                    res.render("../views/electricity/NewMeter", {
                        company: electricity.company,
                        electricity: electricity,
                        message: message,
                        status: status
                    });
                });
            } else {
                Electricity.findOne({ _id: req.params._id }).exec(function (err, electricity) {
                    sum(electricity)
                    
                    Electricity.updateOne(
                        {_id: req.params._id},
                        {
                            $set: {
                                total: sumatoria
                            },
                        },
                        function (err, elect) {
                            Electricity.findOne({ _id: req.params._id }).exec(function (err, elec) {
                                Emission.updateOne({ electricity: req.params._id }, {
                                    $set: {
                                        cantidad: sumatoria,
                                        co2: co2,
                                        kilogram: kg,
                                        pcg: pcg, 
                                        ton: ton
                                    },
                                }).exec(function (err, ems) {
                                });
                            });
                            res.render("../views/electricity/NewMeter", {
                                company: electricity.company,
                                electricity: electricity,
                                message: message,
                                status: status
                            });
                        }
                    )
                })
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
            //return res.json("Meter 6236c47570128e323c51b05c found");
            res.render("../views/electricity/EditMeter", {
                electricity: electricity,
                company: electricity.company,
                meter: m,
            });
        }
    });
};

electricityController.updateMeter = function (req, res) {
    calc(req);
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
                "medidor.$.diciembre": req.body.diciembre,
                "medidor.$.total": req.body.total
            },
        },
        { new: true },
        function (error, electricity) {
            verifyStatus(res.statusCode);
            Electricity.findOne({ _id: req.params.elec }).exec(function (
                err,
                electric
            ) {
                if(error || err){
                    res.render("../views/electricity/AllMeters", {
                        message: message,
                        electricity: electric,
                        company: electric.company,
                        meter: req.body,
                        status: status,
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
                }else{
                    var m;
                    for (var x of electric.medidor) {
                        if (req.params.meter == x._id) {
                            m = x;
                        }
                    }
                    sum(electric)
                    Electricity.updateOne(
                        {_id: req.params.elec},
                        {
                            $set: {
                                total: sumatoria
                            },
                        },
                        function (err, elect) {
                            Electricity.findOne({ _id: req.params.elec }).exec(function (err, elec) {
                                Emission.updateOne({ electricity: req.params.elec }, {
                                    $set: {
                                        cantidad: sumatoria,
                                    },
                                }).exec(function (err, ems){

                                });
                            });
                        }
                    )
                    res.render("../views/electricity/AllMeters", {
                        message: message,
                        electricity: electric,
                        company: electric.company,
                        meter: m,
                        status: status,
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
    );
};

electricityController.renderPageAllMeters = function (req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function (err, electricity) {
        if(!err){
            sum(electricity);
        }
        res.render("../views/electricity/AllMeters", {
            electricity: electricity,
            company: electricity.company,
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
    });
};

electricityController.deleteMeter = function (req, res) {
    Electricity.updateOne({ "_id": req.params.elec }, {
        "$pull": {
            "medidor": {
                "_id": req.params.meter
            }
        }
    }, { multi: true }, (error, elect) => {
        verifyStatus(res.statusCode);
        if (error) {
            Electricity.findOne({ _id: req.params.elec }).exec(function (err, electricity) {
                res.render("../views/electricity/AllMeters", {
                    message: message,
                    electricity: electricity,
                    company: electricity.company,
                    status: status
                });
            });
        } else {
            Electricity.findOne({ _id: req.params.elec }).exec(function (err, electricity) {
                sum(electricity)
                Electricity.updateOne(
                    {_id: req.params.elec},
                    {
                        $set: {
                            total: sumatoria
                        },
                    },
                    function (err, elect) {
                        Electricity.findOne({ _id: req.params.elec }).exec(function (err, elec) {
                            var cant = sumatoria;
                            var ton = elec.factor_emision/1000;
                            var pcg = elec.pcg;
                            var co2 = cant * ton * pcg;
                            Emission.updateOne({ electricity: req.params.elec }, {
                                $set: {
                                    cantidad: sumatoria,
                                    co2: co2,
                                },
                            }).exec(function (err, ems) {
                            });
                        });
                        res.render("../views/electricity/AllMeters", {
                            message: message,
                            electricity: electricity,
                            company: electricity.company,
                            status: status,
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
                )
            })
        }
    });
};
module.exports = electricityController;
