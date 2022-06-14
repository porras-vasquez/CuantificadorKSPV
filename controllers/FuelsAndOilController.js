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
    calc(req);
    let fuelsAndOil = new FuelsAndOil(req.body);
    let comp = await Company.findById(req.params.id);
    fuelsAndOil.company = comp;
    //console.log(req.body.total);
    await fuelsAndOil.save(function (err, fuels) {
        verifyStatus(res.statusCode);
        if (err) {
            res.render('../views/fuelsAndOil/NewfuelsAndOil', { message: message, company: fuels.company._id, status: status });
        }
        else {
            Emission.findOne({ fuente_generador: fuels.combustible })
            .populate("fuelsAndOil")
            .exec(function (err, e) {
                let validar = false;
                if(e!=null){
                    if(e.fuente_generador == fuels.combustible && fuels.combustible == "Aceite 2t-4t"){
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
                    fuente = "Aceite 2t-4t";
                }

                if(fuels.gei=="CO2"){
                    co2 = cant * ton * pcg;
                    co2 = parseFloat(co2).toFixed(5);
                    ch4 = 0;
                    n2o = 0;
                }else if(fuels.gei=="CH4"){
                    ch4 = cant * ton * pcg;
                    ch4 = parseFloat(ch4).toFixed(5);
                    co2 = 0;
                    n2o = 0;
                }else{
                    n2o = cant * ton * pcg;
                    n2o = parseFloat(n2o).toFixed(5);
                    co2 = 0;
                    ch4 = 0;
                }
                
                let cant2 = n2o + ch4 + co2;
                cant2 = parseFloat(cant2).toFixed(5);
                if(validar == true){
                    comp.fuelsAndOil.push(fuels);
                    comp.save(function (err, comp) {
                        Company.findOne({ _id: req.params.id })
                        .populate("fuelsAndOil")
                        .exec(function(err, company) { 
                            Emission.findOne({ fuente_generador: fuente })
                            .exec(function(err, em) {
                                let tot = parseFloat(em.totalCo2) + parseFloat(cant2);
                                console.log(em.totalCo2);
                                console.log(cant2);
                                console.log(tot);
                                sum(company);
                                Emission.updateOne({ fuente_generador: fuente }, {
                                    $set: {
                                        cantidad: sumatoria,
                                        totalCo2: tot,
                                        totalFuente: tot
                                    },
                                }).exec(function (error, ems) {
                                    console.log("3");
                                    console.log(ems);
                                    res.render('../views/fuelsAndOil/NewfuelsAndOil', { message: message, company: company, status: status });
                                });
                             })
                        })
                    });
                }else{
                    let body = {
                        alcance: "1",
                        fuente_generador: fuente,
                        cantidad: cant,
                        unidad: "Litro",
                        kilogram: parseFloat(fuels.factor),
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
                    Company.updateOne(
                        { _id: req.params.id },
                        {
                            $push: {
                                emission: emission,
                                fuelsAndOil: fuels
                            },
                        },
                        (error, c) => {
                            Company.findOne({ _id: req.params.id })
                            .exec(function(err, company) {
                                res.render('../views/fuelsAndOil/NewfuelsAndOil', { message: message, company: company, status: status });
                            })

                        }
                    );
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
    verifyStatus(res.statusCode);
    FuelsAndOil.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
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
                    });
            } else {
                FuelsAndOil.findOne({ _id: req.params.id }).exec(function (err, fuel) {
                    Company.findOne({ _id: fuel.company })
                    .populate("emission")
                    .exec(function(err, company) {
                        let tot = 0, co2 = 0, ch4 = 0, n2o = 0, t = 0;
                        let emi = null, emi2 = null;
                        let id;
                        for (let x of company.emission) {
                            if(emi2==null && fuel.combustible == x.fuente_generador && fuel.combustible == "Aceite 2t-4t"){
                                emi = x;
                                id = emi._id;
                            }else if(emi==null && fuel.combustible == x.fuente_generador && x._id == fuel._id){
                                emi2 = x;
                                id = emi2._id
                            }
                        }
                        let ton = parseFloat(fuel.factor)/1000;
                        let cant = tot;
                        cant = parseFloat(cant).toFixed(5);
                        let gei = fuel.gei;
                        let pcg = parseFloat(fuel.pcg);
                        let kg = parseFloat(fuel.factor);
                        let fuente = fuel.combustible;

                        if(fuel.gei=="CO2"){
                            co2 = cant * ton * pcg;
                            co2 = parseFloat(co2).toFixed(5);
                            t = co2;
                            ch4 = 0;
                            n2o = 0;
                        }else if(fuel.gei=="CH4"){
                            ch4 = cant * ton * pcg;
                            ch4 = parseFloat(ch4).toFixed(5);
                            t = ch4;
                            n2o = 0;
                            co2 = 0;
                        }else{
                            n2o = cant * ton * pcg;
                            n2o = parseFloat(n2o).toFixed(5);
                            t = n2o;
                            ch4 = 0;
                            co2 = 0;
                        }
                        
                        if(emi!=null){

                        }else if(emi2!=null){

                        }
                        Emission.updateOne({ _id: id }, {
                            $set: {
                                cantidad: cant,
                                co2: co2,
                                ch4: ch4,
                                n2o: n2o,
                                kilogram: kg,
                                pcg: pcg, 
                                ton: ton,
                                totalCo2: t,
                                totalFuente: t,
                                fuente_generador: fuente,
                                gei: gei
                            },
                        }).exec(function (err, ems) {});
                    });
                });
                Company.findOne({ _id: fuelsAndOils.company })
                    .populate("fuelsAndOil")
                    .exec(function (error, company) {
                        sum(company);
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
                    });
            }
        }
    );
};

FuelsAndOilController.delete = function (req, res) {
    FuelsAndOil.findOne({ _id: req.params.id }).exec(function(err, fuels) {
        console.log(fuels);
        Company.findOne({ _id: req.params.comp })
        .populate("emission")
        .exec(function (error, company) {
            let cant = 0, restar = 0, total = 0, restar2 = 0, total2 = 0, cant2 = 0, co2 = 0, ch4 = 0, n2o = 0;
            let emi = null;
            let emi2 = null;
            for(let x of company.emission){
                console.log(x);
                if(emi2==null && fuels.combustible == x.fuente_generador && fuels.combustible == "Aceite 2t-4t"){
                    cant = parseFloat(x.cantidad);
                    cant2 = parseFloat(x.totalCo2);
                    emi = x;
                }else if(emi==null && fuels.combustible == x.fuente_generador && x._id == fuels._id){
                    emi2 = x;
                }
            }
            console.log("EMI ---- "+emi);
            console.log("EMI2 ---- "+emi2);
            if(emi!=null){
                restar2 = parseFloat(fuels.emision) * parseFloat(fuels.pcg) * (parseFloat(fuels.factor)/1000);
                restar = parseFloat(fuels.emision);
                restar = parseFloat(restar).toFixed(5);
                //restar2 = parseFloat(restar2).toFixed(5);
                if(restar <= cant){
                    total = cant - restar;
                }else{
                    total = restar - cant;
                }

                if(restar2 <= cant2){
                    total2 = cant2 - restar2;
                }else{
                    total2 = restar2 - cant2;
                }
                total = parseFloat(total).toFixed(5);
                total2 = parseFloat(total2).toFixed(5);
                console.log("CANT2  "+cant2);
                console.log("RESTAR2  "+restar2);
                console.log("TOTAL2  "+total2);
                console.log();
                if(total == 0 && total2 == 0){
                    Company.updateOne({ _id: req.params.comp }, {
                        $pull: { 
                            emission: emi._id
                        }
                    }).exec(function (err, e) { 
                        Emission.deleteOne({ _id: emi._id }).exec(function (err, emission) {
                            console.log("ENTONCES TOTAL ES 0  "+emission);
                        }); 
                    });
                }else{
                    Emission.updateOne({ _id: emi._id }, {
                        $set: {
                            cantidad: total,
                            totalCo2: total2,
                            totalFuente: total2
                        },
                    }).exec(function (err, ems) {
                        console.log("TOTAL NO ES 0  "+ems);
                    });
                }
            }else if(emi2!=null){
                Company.updateOne({ _id: req.params.comp }, {
                    $pull: { 
                        emission: emi2._id
                    }
                }).exec(function (err, e) { 
                    Emission.deleteOne({ _id: emi2._id }).exec(function (err, emission) {
                    }); 
                });
            }
            Company.updateOne({ "_id": req.params.comp }, {
                $pull: { "fuelsAndOil": req.params.id }
            }).exec(function (err, fuelsAndOil) {
                FuelsAndOil.deleteOne({ _id: req.params.id }, function (err) {
                    Company.findOne({ _id: req.params.comp })
                    .populate("fuelsAndOil")
                    .exec(function (error, company) {
                        sum(company);
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
                    });
                });
            });
        });
    });
};

module.exports = FuelsAndOilController;