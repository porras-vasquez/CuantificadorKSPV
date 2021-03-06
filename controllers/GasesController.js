'use strict'
require('../connection');
const Gaseslp = require('../models/Gaseslp');
const Company = require("../models/Company");
const Emission = require("../models/Emission");
const { clearCache } = require('ejs');
let gasesController = {};
let status = 0;
let message = "";
let sumatoria = 0;
let enero = 0; let febrero = 0; let marzo = 0; let abril = 0; let mayo = 0; let junio = 0;
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
/**
 * Recibe las variables y se realiza el cálculo respectivo
 * @param {JSON} req 
 */
function calc(req) {
    if (parseFloat(req.body.densidad) > 0) {
        req.body.emision= ((parseFloat(req.body.enero)+parseFloat(req.body.febrero)+parseFloat(req.body.marzo)+parseFloat(req.body.abril)+ 
        parseFloat(req.body.mayo)+parseFloat(req.body.junio)+parseFloat(req.body.julio)+parseFloat(req.body.agosto)+ 
        parseFloat(req.body.septiembre)+parseFloat(req.body.octubre)+parseFloat(req.body.noviembre)+parseFloat(req.body.diciembre))/parseFloat(req.body.densidad)).toFixed(5);
    } else {
        req.body.emision = ((parseFloat(req.body.enero)+parseFloat(req.body.febrero)+parseFloat(req.body.marzo)+parseFloat(req.body.abril)+ 
        parseFloat(req.body.mayo)+parseFloat(req.body.junio)+parseFloat(req.body.julio)+parseFloat(req.body.agosto)+ 
        parseFloat(req.body.septiembre)+parseFloat(req.body.octubre)+parseFloat(req.body.noviembre)+parseFloat(req.body.diciembre))).toFixed(5);
    }
    req.body.total = parseFloat(req.body.total).toFixed(5);
};
/**
 * Recibe las variables y se realiza el cálculo respectivo
 * @param {JSON} company 
 */
function sum(company){
    sumatoria = 0; enero = 0; febrero = 0; marzo = 0; abril = 0; mayo = 0; junio = 0;
    julio = 0; agosto = 0; septiembre = 0; octubre = 0; noviembre = 0; diciembre = 0;
    for (let x of company.gaslp) {
        sumatoria = sumatoria + parseFloat(x.emision);
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
 * Método para guardar datos de la emisión de gases.
 * @async
 * @function save
 * @param {JSON} req 
 * @param {JSON} res 
 */
gasesController.save = async function (req, res) {
    calc(req);
    let gases = new Gaseslp(req.body);
    let comp = await Company.findById(req.params.id);
    gases.company = comp;
    await gases.save(function (err, gas) {
        if (err) {
            verifyStatus(res.statusCode);
            res.render('../views/gaseslp/NewGas', { message: message, company: gas.company._id, status: status });
        }
        else {
            let ton = gas.factor/1000;
            let cant = gas.emision;
            cant = parseFloat(cant).toFixed(5);
            let pcg = gas.pcg;
            let co2=0;
            let ch4=0;
            let n2o=0;
            if(gas.gei=="CO2"){
                co2 = cant * ton * pcg;
                co2 = parseFloat(co2).toFixed(5);
                ch4 = 0;
                n2o = 0;
            }else if(gas.gei=="CH4"){
                ch4 = cant * ton * pcg;
                ch4 = parseFloat(ch4).toFixed(5);
                co2 = 0;
                n2o = 0;
            }else{
                n2o = cant * ton * pcg;
                n2o = parseFloat(n2o).toFixed(5);
                ch4 = 0;
                co2 = 0;
            }
            let cant2 = n2o + ch4 + co2;
            cant2 = parseFloat(cant2).toFixed(5);
            let body = {
                alcance: "1",
                fuente_generador:"Gas Lpg",
                cantidad: cant,
                unidad: "Litro",
                kilogram: gas.factor,
                ton: ton,
                gei: gas.gei,
                pcg: pcg,
                co2: co2,
                ch4: ch4,
                n2o: n2o,
                totalCo2: cant2,
                totalFuente: cant2,
                company: gas.company._id,
                gaslp: gas._id
            };
            let emission = new Emission(body);
            emission.save();

            comp.gaslp.push(gases);
            comp.emission.push(emission);
            comp.save(function (err, company) {
                if (err) {
                    verifyStatus(res.statusCode);
                    res.render('../views/gaseslp/NewGas', { message: message, company: company, status: status });
                }
                else {
                    verifyStatus(res.statusCode);
                    res.render('../views/gaseslp/NewGas', { message: message, company: company, status: status });
                }
            });
        }
    });
};
/**
 * Método para buscar la compañía de una emisión de gases.
 * @function searchCompany
 * @param {JSON} req 
 * @param {JSON} res 
 */
gasesController.searchCompany = function (req, res) {
    Company.findOne({ _id: req.params.id }).exec(function (err, company) {
        if (err) { console.log('Error: ', err); return; }
        res.render('../views/gaseslp/NewGas', { company: company._id });
    });
};
/**
 * Método para mostrar todas las emisiones de gases.
 * @function list
 * @param {JSON} req 
 * @param {JSON} res 
 */
gasesController.list = function (req, res) {
    Company.findOne({ _id: req.params.id })
        .populate("gaslp")
        .exec(function (err, company) {
            sum(company);
            if (err) {
                res.render("../views/gaseslp/AllGas", {
                    gases: company.gaslp,
                    company: company._id,
                    sumatoria: sumatoria, enero: enero, febrero: febrero,
                    marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                    julio: julio, agosto: agosto, septiembre: septiembre,
                    octubre: octubre, noviembre: noviembre, diciembre: diciembre
                });
            } else {
                res.render("../views/gaseslp/AllGas", {
                    gases: company.gaslp,
                    company: company._id,
                    sumatoria: sumatoria, enero: enero, febrero: febrero,
                    marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                    julio: julio, agosto: agosto, septiembre: septiembre,
                    octubre: octubre, noviembre: noviembre, diciembre: diciembre
                });
            }
        });
};
/**
 * Método para buscar una emisión de gas.
 * @function search
 * @param {JSON} req 
 * @param {JSON} res 
 */
gasesController.search = function (req, res) {
    Gaseslp.findOne({ _id: req.params.id }).exec(function (err, gaslp) {
        if (err) {
            res.render("../views/gaseslp/EditGas", {
                gaslp: gaslp,
                company: gaslp.company,
            });
        } else {
            res.render("../views/gaseslp/EditGas", {
                gaslp: gaslp,
                company: gaslp.company,
            });
        }
    });
};
/**
 * Método para actualizar una emisión de gas.
 * @function update
 * @param {JSON} req 
 * @param {JSON} res 
 */
gasesController.update = function (req, res) {
    calc(req);
    Gaseslp.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                unidad: req.body.unidad,
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
                emision: req.body.emision,
                gei: req.body.gei,
                pcg: req.body.pcg,
                factor: req.body.factor
            },
        },
        { new: true },
        function (err, gases) {
            verifyStatus(res.statusCode);
            if (err) {
                Company.findOne({ _id: gases.company })
                    .populate("gaslp")
                    .exec(function (error, company) {
                        sum(company);
                        if (error) {
                            res.render("../views/gaseslp/AllGas", {
                                message: message,
                                gases: company.gaslp,
                                company: company._id,
                                sumatoria: sumatoria, enero: enero, febrero: febrero,
                                marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                                julio: julio, agosto: agosto, septiembre: septiembre,
                                octubre: octubre, noviembre: noviembre, diciembre: diciembre,status: status
                            });
                        } else {
                            res.render("../views/gaseslp/AllGas", {
                                message: message,
                                gases: company.gaslp,
                                company: company._id,
                                sumatoria: sumatoria, enero: enero, febrero: febrero,
                                marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                                julio: julio, agosto: agosto, septiembre: septiembre,
                                octubre: octubre, noviembre: noviembre, diciembre: diciembre,status: status
                            });
                        }
                    });
            } else {
                let cant;
                let pcg;
                let kg;
                Gaseslp.findOne({ _id: req.params.id }).exec(function (err, gas) {
                    let gei = gas.gei;
                    let ton = parseFloat(gas.factor)/1000;
                    let co2=0;
                    let ch4=0;
                    let n2o=0;
                    cant = parseFloat(gas.emision);
                    pcg = parseFloat(gas.pcg);
                    kg = parseFloat(gas.factor);
                    if(gas.gei=="CO2"){
                        co2 = cant * ton * pcg;
                        co2 = parseFloat(co2).toFixed(5);
                        ch4 = 0;
                        n2o = 0;
                    }else if(gas.gei=="CH4"){
                        ch4 = cant * ton * pcg;
                        ch4 = parseFloat(ch4).toFixed(5);
                        co2 = 0;
                        n2o = 0;
                    }else{
                        n2o = cant * ton * pcg;
                        n2o = parseFloat(n2o).toFixed(5);
                        ch4 = 0;
                        co2 = 0;
                    }
                    let cant2 = n2o + ch4 + co2;
                    cant2 = parseFloat(cant2).toFixed(5);
                    Emission.updateOne({ gaslp: req.params.id }, {
                        $set: {
                            cantidad: cant,
                            co2: co2,
                            ch4: ch4,
                            n2o: n2o,
                            kilogram: kg,
                            pcg: pcg, 
                            ton: ton,
                            gei: gei,
                            totalCo2: cant2,
                            totalFuente: cant2,
                        },
                    }).exec(function (err, ems) {});
                });
                Company.findOne({ _id: gases.company })
                    .populate("gaslp")
                    .exec(function (error, company) {
                        sum(company);
                        if (error) {
                            res.render("../views/gaseslp/AllGas", {
                                message: message,
                                gases: company.gaslp,
                                company: company._id,
                                sumatoria: sumatoria, enero: enero, febrero: febrero,
                                marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                                julio: julio, agosto: agosto, septiembre: septiembre,
                                octubre: octubre, noviembre: noviembre, diciembre: diciembre,status: status
                            });
                        } else {
                            res.render("../views/gaseslp/AllGas", {
                                message: message,
                                gases: company.gaslp,
                                company: company._id,
                                sumatoria: sumatoria, enero: enero, febrero: febrero,
                                marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                                julio: julio, agosto: agosto, septiembre: septiembre,
                                octubre: octubre, noviembre: noviembre, diciembre: diciembre,status: status
                            });
                        }
                    });
            }
        }
    );
};
/**
 * Método para eliminar una emisión de gas.
 * @function delete
 * @param {JSON} req 
 * @param {JSON} res 
 */
gasesController.delete = function (req, res) {
    Emission.findOne({ gaslp: req.params.id }).exec(function (err, e) {
        Company.updateOne({ _id: req.params.comp }, {
            $pull: { 
                emission: e._id
            }
        }).exec(function (err, electricity) {
        });
    });
    Company.updateOne({ "_id": req.params.comp }, {
        $pull: { "gaslp": req.params.id }
    }).exec(function (err, objGases) {
       
        if (objGases) {
            Emission.deleteOne({ gaslp: req.params.id }).exec(function (err, electricity) {});
            Gaseslp.deleteOne({ _id: req.params.id }, function (err) {
                verifyStatus(res.statusCode);
                if (err) {
                    Company.findOne({ _id: req.params.comp })
                        .populate("gaslp")
                        .exec(function (error, company) {
                            sum(company);
                            if (error) {
                                res.render("../views/gaseslp/AllGas", {
                                    company: company,
                                    message: message,
                                    gases: company.gaslp,
                                    sumatoria: sumatoria, enero: enero, febrero: febrero,
                                    marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                                    julio: julio, agosto: agosto, septiembre: septiembre,
                                    octubre: octubre, noviembre: noviembre, diciembre: diciembre,status: status
                                });
                            } else {
                                res.render("../views/gaseslp/AllGas", {
                                    company: company,
                                    message: message,
                                    gases: company.gaslp,
                                    sumatoria: sumatoria, enero: enero, febrero: febrero,
                                    marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                                    julio: julio, agosto: agosto, septiembre: septiembre,
                                    octubre: octubre, noviembre: noviembre, diciembre: diciembre,status: status
                                });
                            }
                        });
                } else {
                    Company.findOne({ _id: req.params.comp })
                        .populate("gaslp")
                        .exec(function (error, company) {
                            sum(company);
                            if (error) {
                                res.render("../views/gaseslp/AllGas", {
                                    company: company,
                                    message: message,
                                    gases: company.gaslp,
                                    sumatoria: sumatoria, enero: enero, febrero: febrero,
                                    marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                                    julio: julio, agosto: agosto, septiembre: septiembre,
                                    octubre: octubre, noviembre: noviembre, diciembre: diciembre,status: status
                                });
                            } else {
                                res.render("../views/gaseslp/AllGas", {
                                    company: company,
                                    message: message,
                                    gases: company.gaslp,
                                    sumatoria: sumatoria, enero: enero, febrero: febrero,
                                    marzo: marzo, abril: abril, mayo: mayo, junio: junio,
                                    julio: julio, agosto: agosto, septiembre: septiembre,
                                    octubre: octubre, noviembre: noviembre, diciembre: diciembre,status: status
                                });
                            }
                        });
                }
            });
        }
    });
};
module.exports = gasesController;