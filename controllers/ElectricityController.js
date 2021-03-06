"use strict";
require("../connection");
const Electricity = require("../models/Electricity");
const Company = require("../models/Company");
const Emission = require("../models/Emission");
let electricityController = {};
let status = 0;
let message="";
let sumatoria = 0; let enero = 0; let febrero = 0; let marzo = 0; let abril = 0; let mayo = 0; let junio = 0;
let julio = 0; let agosto = 0; let septiembre = 0; let octubre = 0; let noviembre = 0; let diciembre = 0;
/**
 * @param {string} statusCode Codigo de estado devuelto por una funcion al ser ejecutada, se toma para lanzar un mensaje
 * Status: 200 ¡Realizado exitosamente!
 * Status: 400 ¡Error, solicitud incorrecta!
 * Status: 401 ¡Error, usuario no autenticado!
 * Status: 404 ¡Ocurrió un problema con la ruta de acceso!
 * Status: 500 ¡Lo sentimos, ocurrió un problema con el servidor!
 * Status: 503 ¡Lo sentimos, el servidor se encuentra en mantenimiento!
 */
function verifyStatus(statusCode){
    if(statusCode==200){
        status=200;
        message="¡Realizado exitosamente!";
    }else if(statusCode==400){
        status=400;
        message="¡Error, solicitud incorrecta!";
    }else if(statusCode==401){
        status=401;
        message="¡Error, usuario no autenticado!";
    }else if(statusCode==404){
        status=404;
        message="¡Ocurrió un problema con la ruta de acceso!";
    }else if(statusCode==500){
        status=500;
        message="¡Lo sentimos, ocurrió un problema con el servidor!";
    }else if(statusCode==503){
        status=503;
        message="¡Lo sentimos, el servidor se encuentra en mantenimiento!";
    }
}
/**
 * Recibe las variables y se realiza el cálculo respectivo
 * @param {JSON} req 
 */
function calc(req) {
    req.body.total = (
        parseFloat(req.body.enero) + parseFloat(req.body.febrero) + parseFloat(req.body.marzo)
        + parseFloat(req.body.abril) + parseFloat(req.body.mayo) + parseFloat(req.body.junio) 
        + parseFloat(req.body.julio) + parseFloat(req.body.agosto) + parseFloat(req.body.septiembre) 
        + parseFloat(req.body.octubre) + parseFloat(req.body.noviembre) + parseFloat(req.body.diciembre)
    );
    req.body.total = parseFloat(req.body.total).toFixed(5);
};
/**
 * Recibe las variables y se realiza el cálculo respectivo
 * @param {JSON} electricity 
 */
function sum(electricity){
    sumatoria = 0; enero = 0; febrero = 0; marzo = 0; abril = 0; mayo = 0; junio = 0;
    julio = 0; agosto = 0; septiembre = 0; octubre = 0; noviembre = 0; diciembre = 0;
    for (let x of electricity.medidor) {
        sumatoria = sumatoria + parseFloat(x.total);
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
    sumatoria = parseFloat(sumatoria).toFixed(5);
    enero = parseFloat(enero).toFixed(5);
    febrero = parseFloat(febrero).toFixed(5);
    marzo = parseFloat(marzo).toFixed(5);
    abril = parseFloat(abril).toFixed(5);
    mayo = parseFloat(mayo).toFixed(5);
    junio = parseFloat(junio).toFixed(5);
    julio = parseFloat(julio).toFixed(5);
    agosto = parseFloat(agosto).toFixed(5);
    septiembre = parseFloat(septiembre).toFixed(5);
    octubre = parseFloat(octubre).toFixed(5);
    noviembre = parseFloat(noviembre).toFixed(5);    
    diciembre = parseFloat(diciembre).toFixed(5);
}
/**
 * Método para guardar una emisión de electricidad en una colección.
 * @async
 * @function save
 * @param {JSON} req 
 * @param {JSON} res 
 */
electricityController.save = async function (req, res) {
    req.body.total = 0;
    let electricity = new Electricity(req.body);
    let comp = await Company.findById(req.params.comp);
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
            let ton = parseFloat(elec.factor_emision)/1000;
            let pcg = parseFloat(elec.pcg);
            let cant = parseFloat(elec.total);
            let co2 = 0;
            if(elec.gei=="CO2"){
                co2 = cant * ton * pcg;
                co2 = parseFloat(co2).toFixed(5);
            }
            let body = {
                alcance: "2",
                fuente_generador:"Electricidad",
                cantidad: cant,
                unidad: "Kilowatts/hora",
                kilogram: elec.factor_emision,
                ton: ton,
                gei: elec.gei,
                pcg: pcg,
                co2: co2,
                ch4: 0,
                n2o: 0,
                totalCo2: co2,
                totalFuente: co2,
                company: elec.company._id,
                electricity: elec._id
            };
            let emission = new Emission(body);
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
/**
 * Método para buscar una emisión de electricidad en una compañía.
 * @function renderPageNewElectricity
 * @param {JSON} req 
 * @param {JSON} res 
 */
electricityController.renderPageNewElectricity = function (req, res) {
    Company.findOne({ _id: req.params.comp }).exec(function (err, company) {
        if (err) {
            res.render("../views/electricity/NewElectricity", { company: company._id });
        }else{
            res.render("../views/electricity/NewElectricity", { company: company._id });
        }
    });
};
/**
 * Método para mostrar emisiones en una colección.
 * @function renderPageAllElectricites
 * @param {JSON} req 
 * @param {JSON} res 
 */
electricityController.renderPageAllElectricites = function (req, res) {
    Company.findOne({ _id: req.params.comp })
        .populate("electricidad")
        .exec(function (err, company) {
            let total = 0; 
            for (let x of company.electricidad) {
                total = total + parseFloat(x.total); 
            }
            res.render("../views/electricity/AllElectricities", {
                electricities: company.electricidad,
                company: company._id,
                sumatoria: total
            });
        });
};
/**
 * Método para buscar una emisión de electricidad en una colección.
 * @function renderPageEditElectricity
 * @param {JSON} req 
 * @param {JSON} res 
 */
electricityController.renderPageEditElectricity = function (req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function (err, electricity) {
        res.render("../views/electricity/EditElectricity", {
            electricity: electricity,
            company: electricity.company,
        });
    });
};
/**
 * Método para editar una emisión de electricidad en una colección.
 * @function update
 * @param {JSON} req 
 * @param {JSON} res 
 */
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
                let cant;
                let ton;
                let pcg;
                let co2;
                let kg;
                Electricity.findOne({ _id: req.params.id }).exec(function (err, elec) {
                    cant = parseFloat(elec.total);
                    ton = parseFloat(elec.factor_emision)/1000;
                    pcg = parseFloat(elec.pcg);
                    co2 = cant * ton * pcg;
                    co2 = parseFloat(co2).toFixed(5);
                    kg = elec.factor_emision;
                    if(elec.gei=="CO2"){
                        co2 = cant * ton * pcg;
                        co2 = parseFloat(co2).toFixed(5);
                    }
                    Emission.updateOne({ electricity: req.params.id }, {
                        $set: {
                            cantidad: cant,
                            co2: co2,
                            totalCo2: co2,
                            totalFuente: co2,
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
/**
 * Método para eliminar una emisión de electricidad en una colección.
 * @function delete
 * @param {JSON} req 
 * @param {JSON} res 
 */
electricityController.delete = function (req, res) {
    Emission.findOne({ electricity: req.params.id }).exec(function (err, e) {
        Company.updateOne({ _id: req.params.comp }, {
            $pull: { 
                emission: e._id
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
                    let total = 0; 
                    for (let x of company.electricidad) {
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
/**
 * Método para buscar un medidor de electricidad en una colección.
 * @function renderPageNewMeter
 * @param {JSON} req 
 * @param {JSON} res 
 */
electricityController.renderPageNewMeter = function (req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function (err, electricity) {
        let emission;
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
/**
 * Método para añadir un medidor de electricidad en una colección.
 * @function addMeter
 * @param {JSON} req 
 * @param {JSON} res 
 */
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
                            let cant;
                            let ton;
                            let pcg;
                            let co2;
                            let kg;
                            Electricity.findOne({ _id: req.params._id }).exec(function (err, elec) {
                                cant =parseFloat(elec.total);
                                ton = parseFloat(elec.factor_emision)/1000;
                                pcg = parseFloat(elec.pcg);
                                co2 = cant * ton * pcg;
                                co2 = parseFloat(co2).toFixed(5);
                                Emission.updateOne({ electricity: req.params._id }, {
                                    $set: {
                                        cantidad: sumatoria,
                                        co2: co2,
                                        totalCo2: co2,
                                        totalFuente: co2
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

/**
 * Método para buscar un medidor de electricidad en una colección.
 * @function renderPageEditMeter
 * @param {JSON} req 
 * @param {JSON} res 
 */
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
            let m;
            for (let x of electricity.medidor) {
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
/**
 * Método para actualizar un medidor de electricidad en una colección.
 * @function updateMeter
 * @param {JSON} req 
 * @param {JSON} res 
 */
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
                    let m;
                    for (let x of electric.medidor) {
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
                                let cant =parseFloat(elec.total);
                                let ton = parseFloat(elec.factor_emision)/1000;
                                let pcg = parseFloat(elec.pcg);
                                let co2 = cant * ton * pcg;
                                co2 = parseFloat(co2).toFixed(5)
                                Emission.updateOne({ electricity: req.params.elec }, {
                                    $set: {
                                        cantidad: sumatoria,
                                        co2: co2,
                                        totalCo2: co2,
                                        totalFuente: co2
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
/**
 * Método para mostrar todos los medidores de una electricidad en una colección.
 * @function renderPageAllMeters
 * @param {JSON} req 
 * @param {JSON} res 
 */
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
/**
 * Método para eliminar un medidor de electricidad en una colección.
 * @function deleteMeter
 * @param {JSON} req 
 * @param {JSON} res 
 */
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
                            let cant = sumatoria;
                            let ton = elec.factor_emision/1000;
                            let pcg = elec.pcg;
                            let co2 = cant * ton * pcg;
                            Emission.updateOne({ electricity: req.params.elec }, {
                                $set: {
                                    cantidad: sumatoria,
                                    co2: co2,
                                    totalCo2: co2,
                                    totalFuente: co2
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
