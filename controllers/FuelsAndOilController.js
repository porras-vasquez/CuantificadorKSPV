'use strict'
require('../connection');
const Company = require("../models/Company");
const FuelsAndOil = require('../models/FuelsAndOil');
const Emission = require("../models/Emission");
const { clearCache } = require('ejs');
let FuelsAndOilController = {};
let status = 0;
let message = "";
let sumatoria = 0;
sumatoria = sumatoria.toFixed(5);
let enero = 0; let febrero = 0; let marzo = 0; let abril = 0; let mayo = 0; let junio = 0;
let julio = 0; let agosto = 0; let septiembre = 0; let octubre = 0; let noviembre = 0; let diciembre = 0;


function verifyStatus(statusCode) {
    if (statusCode == 200) {
        status = 200;
        message = "¡Realizado exitosamente!";
    } else if (statusCode == 400) {
        status = 400;
        message = "¡Error, solicitud incorrecta!";
    } else if (statusCode == 401) {
        status = 401;
        message = "¡Error, usuario no autenticado!";
    } else if (statusCode == 404) {
        status = 404;
        message = "¡Ocurrió un problema con la ruta de acceso!";
    } else if (statusCode == 500) {
        status = 500;
        message = "¡Lo sentimos, ocurrió un problema con el servidor!";
    } else if (statusCode == 503) {
        status = 503;
        message = "¡Lo sentimos, el servidor se encuentra en mantenimiento!";
    }
}

function calc(req) {
    req.body.emision = (parseFloat(req.body.enero) + parseFloat(req.body.febrero) + parseFloat(req.body.marzo) + parseFloat(req.body.abril) +
        parseFloat(req.body.mayo) + parseFloat(req.body.junio) + parseFloat(req.body.julio) + parseFloat(req.body.agosto) +
        parseFloat(req.body.septiembre) + parseFloat(req.body.octubre) + parseFloat(req.body.noviembre) + parseFloat(req.body.diciembre));
};

function sum(company){
    sumatoria = 0; enero = 0; febrero = 0; marzo = 0; abril = 0; mayo = 0; junio = 0;
    julio = 0; agosto = 0; septiembre = 0; octubre = 0; noviembre = 0; diciembre = 0;
    for (let x of company.fuelsAndOil) {
        sumatoria = sumatoria + parseFloat(x.emision); enero = enero + parseFloat(x.enero); febrero = febrero + parseFloat(x.febrero);
        marzo = marzo + parseFloat(x.marzo); abril = abril + parseFloat(x.abril); mayo = mayo + parseFloat(x.mayo);
        junio = junio + parseFloat(x.junio); julio = julio + parseFloat(x.julio); agosto = agosto + parseFloat(x.agosto);
        septiembre = septiembre + parseFloat(x.septiembre); octubre = octubre + parseFloat(x.octubre);
        noviembre = noviembre + parseFloat(x.noviembre); diciembre = diciembre + parseFloat(x.diciembre);
    }
    sumatoria = parseFloat(sumatoria).toFixed(5);
}

FuelsAndOilController.save = async function (req, res) {
    const { combustible, enero, febrero, marzo, abril, junio, julio, agosto, septiembre, octubre, noviembre, diciembre, emision, gei, pcg } = req.body; //
    calc(req);
    let fuelsAndOil = new FuelsAndOil(req.body);
    let comp = await Company.findById(req.params.id);
    fuelsAndOil.company = comp;
    //console.log(req.body.total);
    await fuelsAndOil.save(function (err, fuels) {
        if (err) {
            verifyStatus(res.statusCode);
            res.render('../views/fuelsAndOil/NewfuelsAndOil', { message: message, company: fuels.company._id, status: status });
        }
        else {
            Company.findOne({ _id: fuels.company })
            .populate("fuelsAndOil")
            .exec(function (err, company) {
                let validar = false;
                for (let x of company.fuelsAndOil) {
                    if(x.combustible == fuels.combustible && fuels.combustible == "Aceite 2t/4t"){
                        validar = true;
                    }
                }
                let ton = parseFloat(fuels.factor)/1000;
                let cant = parseFloat(fuels.emision);
                cant = cant.toFixed(5);
                let pcg = parseFloat(fuels.pcg);
                let co2 = 0;
                let ch4 = 0;
                let n2o = 0;
                let fuente;
                if(fuels.combustible=="Gasolina"){
                    fuente = "Gasolina";
                }else if(fuels.combustible=="Diésel"){
                    fuente = "Diésel";
                }else{
                    fuente = "Aceite 2t/4t";
                }

                if(fuels.gei=="CO2"){
                    co2 = cant * ton * pcg;
                    co2 = parseFloat(co2).toFixed(5);
                }else if(fuels.gei=="CH4"){
                    ch4 = cant * ton * pcg;
                    ch4 = parseFloat(ch4).toFixed(5);
                }else{
                    n2o = cant * ton * pcg;
                    n2o = parseFloat(n2o).toFixed(5);
                }

                let cant2 = n2o + ch4 + co2;
                cant2 = cant2.toFixed(5);
                if(validar == true){
                    comp.fuelsAndOil.push(fuels);
                    comp.save(function (err, comp) {
                        Company.findOne({ _id: req.params.id })
                        .populate("fuelsAndOil")
                        .exec(function(err, company) { 
                            sum(company);
                            Emission.updateOne({ fuente_generador: fuente}, {
                                $set: {
                                    cantidad: sumatoria,
                                    co2: co2,
                                    ch4: ch4,
                                    n2o: n2o,
                                    totalCo2: cant2,
                                    totalFuente: cant2
                                },
                            }).exec(function (error, ems) {
                                console.log("3");
                                console.log(ems);
                                res.render('../views/fuelsAndOil/NewfuelsAndOil', { message: message, company: company, status: status });
                            });
                        })
                    });
                }else{
                    let body = {
                        alcance: "1",
                        fuente_generador: fuente,
                        cantidad: cant,
                        unidad: "Litro",
                        kilogram: fuels.factor,
                        ton: ton,
                        gei: fuels.gei,
                        pcg: pcg,
                        co2: co2,
                        ch4: ch4,
                        n2o: n2o,
                        totalCo2: cant2,
                        totalFuente: cant2,
                        company: fuels.company._id,
                        fuelsAndOil: fuels._id
                    };
                    let emission = new Emission(body);
                    emission.save();
                    comp.emission.push(emission);
                    comp.fuelsAndOil.push(fuels);
                    comp.save(function (err, company) {
                        verifyStatus(res.statusCode);
                        res.render('../views/fuelsAndOil/NewfuelsAndOil', { message: message, company: company, status: status });
                    });
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

FuelsAndOilController.list = function (req, res) {
    Company.findOne({ _id: req.params.id })
        .populate("fuelsAndOil")
        .exec(function (err, company) {
            sum(company);
            if (err) {
                res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                    fuelsAndOils: company.fuelsAndOil,
                    company: company._id,
                    comp: company.nombre,
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
                    comp: company.nombre,
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
            res.render("../views/fuelsAndOil/EditFuelsAndOil", {
                fuelsAndOil: fuelsAndOil,
                company: fuelsAndOil.company,
            });
        } else {
            res.render("../views/fuelsAndOil/EditFuelsAndOil", {
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
                factor: req.body.factor,
                gei: req.body.gei,
                pcg: req.body.pcg,
            },
        },
        { new: true },
        function (err, fuelsAndOils) {
            if (err) {
                Company.findOne({ _id: fuelsAndOils.company })
                    .populate("fuelsAndOil")
                    .exec(function (error, company) {
                        verifyStatus(res.statusCode);
                        sum(company);
                        if (error) {
                            verifyStatus(res.statusCode);
                            res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                message: message,
                                fuelsAndOils: company.fuelsAndOil,
                                company: company._id,
                                comp: company.nombre,
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
                                status: status
                            });
                        } else {
                            verifyStatus(res.statusCode);
                            res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                message: message,
                                fuelsAndOils: company.fuelsAndOil,
                                company: company._id,
                                comp: company.nombre,
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
                                status: status
                            });
                        }
                    });
            } else {
                FuelsAndOil.findOne({ _id: req.params.id }).exec(function (err, fuel) {
                    let ton = fuel.factor/1000;
                    let cant = fuel.emision;
                    cant = parseFloat(cant).toFixed(5);
                    let gei = fuel.gei;
                    let pcg = fuel.pcg;
                    let co2 = 0;
                    let ch4 = 0;
                    let n2o = 0;
                    let kg = fuel.factor;
                    let fuente = fuel.combustible;
                    let unidad = fuel.unidad;
        
                    if(fuel.gei=="CO2"){
                        co2 = cant * ton * pcg;
                        co2 = parseFloat(co2).toFixed(5);
                    }else if(fuel.gei=="CH4"){
                        ch4 = cant * ton * pcg;
                        ch4 = parseFloat(ch4).toFixed(5);
                    }else{
                        n2o = cant * ton * pcg;
                        n2o = parseFloat(n2o).toFixed(5);
                    }
                    Emission.updateOne({ fuelsAndOil: req.params.id }, {
                        $set: {
                            cantidad: cant,
                            co2: co2,
                            ch4: ch4,
                            n2o: n2o,
                            kilogram: kg,
                            pcg: pcg, 
                            ton: ton,
                            fuente_generador: fuente,
                            gei: gei,
                            unidad: unidad
                        },
                    }).exec(function (err, ems) {});
                });
                Company.findOne({ _id: fuelsAndOils.company })
                    .populate("fuelsAndOil")
                    .exec(function (error, company) {
                        sum(company);
                        if (error) {
                            verifyStatus(res.statusCode);
                            res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                message: message,
                                fuelsAndOils: company.fuelsAndOil,
                                company: company._id,
                                comp: company.nombre,
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
                                status: status
                            });
                        } else {
                            verifyStatus(res.statusCode);
                            res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                message: message,
                                fuelsAndOils: company.fuelsAndOil,
                                company: company._id,
                                comp: company.nombre,
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
                                status: status
                            });
                        }
                    });
            }
        }
    );
};

FuelsAndOilController.delete = function (req, res) {
    Emission.findOne({ fuente_generador: req.params.fue }).exec(function (err, e) {
        FuelsAndOil.findOne({ _id: req.params.id }).exec(function(err, fuels) {
            Company.findOne({ _id: req.params.comp })
            .exec(function (error, company) {
                let cant = 0, restar = 0, total = 0, restar2 = 0, total2 = 0, cant2 = 0;
                for(let x of company.emission){
                    if(fuels.combustible == x.fuente_generador && fuels.combustible == "Aceite 2t/4t"){
                        cant = parseFloat(x.cantidad);
                        cant2 = parseFloat(x.totalCo2);
                    }
                }
                if(fuels.combustible == "Aceite 2t/4t"){
                    sum(company);
                    restar = parseFloat(sumatoria);
                    if(fuels.gei=="CO2"){
                        restar2 = parseFloat(fuels.emision) * parseFloat(fuels.pcg) * parseFloat(fuels.ton);
                    }else if(fuels.gei=="CH4"){
                        restar2 = parseFloat(fuels.emision) * parseFloat(fuels.pcg) * parseFloat(fuels.ton);
                    }else{
                        restar2 = parseFloat(fuels.emision) * parseFloat(fuels.pcg) * parseFloat(fuels.ton);
                    }
                }else{
                    Company.updateOne({ _id: req.params.comp }, {
                        $pull: { 
                            emission: e._id
                        }
                    }).exec(function (err, e) { 
                        Emission.deleteOne({ fuelsAndOil: req.params.id }).exec(function (err, emission) {}); 
                    });
                }
                restar = parseFloat(restar).toFixed(5);
                restar2 = parseFloat(restar2).toFixed(5);
                total = cant - restar;
                total2 = cant2 - restar2;
                total = parseFloat(total).toFixed(5);
                total2 = parseFloat(total2).toFixed(5);
                if(total == 0 && total2 == 0){
                    Company.updateOne({ _id: req.params.comp }, {
                        $pull: { 
                            emission: e._id
                        }
                    }).exec(function (err, e) { 
                        Emission.deleteOne({ fuelsAndOil: req.params.id }).exec(function (err, emission) {}); 
                    });
                }else{
                    Emission.updateOne({ fuente_generador: fuelsAndOils.combustible }, {
                        $set: {
                            cantidad: total,
                            totalCo2: total2,
                            totalFuente: total2
                        },
                    }).exec(function (err, ems) {
                        console.log(ems);
                    });
                }
            });
        });
    });
    Company.updateOne({ "_id": req.params.comp }, {
        $pull: { "fuelsAndOil": req.params.id }
    }).exec(function (err, fuelsAndOil) {
        if (fuelsAndOil) {
    
            FuelsAndOil.deleteOne({ _id: req.params.id }, function (err) {
                if (err) {
                    Company.findOne({ _id: req.params.comp })
                        .populate("fuelsAndOil")
                        .exec(function (error, company) {
                            sum(company);
                            if (error) {
                                verifyStatus(res.statusCode);
                                res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                    company: company,
                                    comp: company.nombre,
                                    message: message,
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
                                    status: status
                                });
                            } else {
                                verifyStatus(res.statusCode);
                                res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                    company: company,
                                    comp: company.nombre,
                                    message: message,
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
                                    status: status
                                });
                            }
                        });
                } else {
                    Company.findOne({ _id: req.params.comp })
                        .populate("fuelsAndOil")
                        .exec(function (error, company) {
                            sum(company);
                            if (error) {
                                verifyStatus(res.statusCode);
                                res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                    company: company,
                                    comp: company.nombre,
                                    message: message,
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
                                    status: status
                                });
                            } else {
                                verifyStatus(res.statusCode);
                                res.render("../views/fuelsAndOil/AllFuelsAndOil", {
                                    company: company,
                                    comp: company.nombre,
                                    message: message,
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
                                    status: status
                                });
                            }
                        });
                }
            });
        }
    });
};

module.exports = FuelsAndOilController;