'use strict'
require('../connection');
const Company = require("../models/Company");
const AirConditioning = require('../models/AirConditioning');
const Emission = require("../models/Emission");
const airConditioningController = {};

let status = 0;
let message = "";

function verifyStatus(statusCode) {
    if (statusCode == 200) {//Satisfactorio
        status = 200;
        message = "¡Realizado exitosamente!";
    } else if (statusCode == 400) {//Solicitud incorrecta
        status = 400;
        message = "¡Error, solicitud incorrecta!";
    } else if (statusCode == 401) {//No autenticado
        status = 401;
        message = "¡Error, usuario no autenticado!";
    } else if (statusCode == 404) {//No encontrado
        status = 404;
        message = "¡Ocurrió un problema con la ruta de acceso!";
    } else if (statusCode == 500) {//Error del servidor
        status = 500;
        message = "¡Lo sentimos, ocurrió un problema con el servidor!";
    } else if (statusCode == 503) {//Mantenimiento
        status = 503;
        message = "¡Lo sentimos, el servidor se encuentra en mantenimiento!";
    }
}

function calc(req) {

    req.body.fugaTotal = ((parseFloat(req.body.capacidadConfinamiento) * parseFloat(req.body.tasaAnualFuga)) / 100);

    if(req.body.tipoRefrigerante=='410-A'){
        req.body.totalR22 = 0;
        req.body.totalCO2R22 = 0;
        req.body.totalHFC134a= 0;
        req.body.totalHFC134aCo2= 0;
        req.body.totalHFC152a=0;
        req.body.totalHFC152aCo2= 0;
        req.body.totalR402a= 0;
        req.body.totalR402aCo2= 0;
        req.body.totalR402b=0;
        req.body.totalR402bCo2=0;
        req.body.totalR404a=0;
        req.body.totalR404aCo2=0;
        req.body.totalR404B=0;
        req.body.totalR404BCo2=0;
        req.body.totalR407c=0;
        req.body.totalR407cCo2=0;
        req.body.totalR410a=(parseFloat(req.body.fugaTotal) / 1000);
        req.body.totalR410aCo2=(parseFloat(req.body.potencialCalentamineto) * parseFloat(req.body.totalR410a));
        req.body.totalR507=0;
        req.body.totalR507Co2=0;
        req.body.total508B=0;
        req.body.totalR508BCo2=0;
        
    } else if(req.body.tipoRefrigerante=='R22'){
        req.body.totalR22 = (parseFloat(req.body.fugaTotal) / 1000);
        req.body.totalCO2R22 = (parseFloat(req.body.potencialCalentamineto) * parseFloat(req.body.totalR22));
        req.body.totalHFC134a=0;
        req.body.totalHFC134aCo2=0;
        req.body.totalHFC152a=0;
        req.body.totalHFC152aCo2=0;
        req.body.totalR402a=0;
        req.body.totalR402aCo2=0;
        req.body.totalR402b=0;
        req.body.totalR402bCo2=0;
        req.body.totalR404a=0;
        req.body.totalR404aCo2=0;
        req.body.totalR404B=0;
        req.body.totalR404BCo2=0;
        req.body.totalR407c=0;
        req.body.totalR407cCo2=0;
        req.body.totalR410a=0
        req.body.totalR410aCo2=0;
        req.body.totalR507=0;
        req.body.totalR507Co2=0;
        req.body.total508B=0;
        req.body.totalR508BCo2=0;
    }else if(req.body.tipoRefrigerante=='HFC134a'){

        req.body.totalR22 = 0;
        req.body.totalCO2R22 = 0;
        req.body.totalHFC134a= (parseFloat(req.body.fugaTotal) / 1000);
        req.body.totalHFC134aCo2= (parseFloat(req.body.potencialCalentamineto) * parseFloat(req.body.totalHFC134a));
        req.body.totalHFC152a=0;
        req.body.totalHFC152aCo2=0;
        req.body.totalR402a=0;
        req.body.totalR402aCo2=0;
        req.body.totalR402b=0;
        req.body.totalR402bCo2=0;
        req.body.totalR404a=0;
        req.body.totalR404aCo2=0;
        req.body.totalR404B=0;
        req.body.totalR404BCo2=0;
        req.body.totalR407c=0;
        req.body.totalR407cCo2=0;
        req.body.totalR410a=0
        req.body.totalR410aCo2=0;
        req.body.totalR507=0;
        req.body.totalR507Co2=0;
        req.body.total508B=0;
        req.body.totalR508BCo2=0;
    }else if(req.body.tipoRefrigerante=='HFC152a'){
        req.body.totalR22 = 0;
        req.body.totalCO2R22 = 0;
        req.body.totalHFC134a= 0;
        req.body.totalHFC134aCo2= 0;
        req.body.totalHFC152a=(parseFloat(req.body.fugaTotal) / 1000);;
        req.body.totalHFC152aCo2= (parseFloat(req.body.potencialCalentamineto) * parseFloat(req.body.totalHFC152a));
        req.body.totalR402a=0;
        req.body.totalR402aCo2=0;
        req.body.totalR402b=0;
        req.body.totalR402bCo2=0;
        req.body.totalR404a=0;
        req.body.totalR404aCo2=0;
        req.body.totalR404B=0;
        req.body.totalR404BCo2=0;
        req.body.totalR407c=0;
        req.body.totalR407cCo2=0;
        req.body.totalR410a=0
        req.body.totalR410aCo2=0;
        req.body.totalR507=0;
        req.body.totalR507Co2=0;
        req.body.total508B=0;
        req.body.totalR508BCo2=0;
    }else if(req.body.tipoRefrigerante=='R402a'){
        req.body.totalR22 = 0;
        req.body.totalCO2R22 = 0;
        req.body.totalHFC134a= 0;
        req.body.totalHFC134aCo2= 0;
        req.body.totalHFC152a=0;
        req.body.totalHFC152aCo2= 0;
        req.body.totalR402a= (parseFloat(req.body.fugaTotal) / 1000);
        req.body.totalR402aCo2= (parseFloat(req.body.potencialCalentamineto) * parseFloat(req.body.totalR402a));
        req.body.totalR402b=0;
        req.body.totalR402bCo2=0;
        req.body.totalR404a=0;
        req.body.totalR404aCo2=0;
        req.body.totalR404B=0;
        req.body.totalR404BCo2=0;
        req.body.totalR407c=0;
        req.body.totalR407cCo2=0;
        req.body.totalR410a=0
        req.body.totalR410aCo2=0;
        req.body.totalR507=0;
        req.body.totalR507Co2=0;
        req.body.total508B=0;
        req.body.totalR508BCo2=0;
    }else if(req.body.tipoRefrigerante=='R402b'){
        req.body.totalR22 = 0;
        req.body.totalCO2R22 = 0;
        req.body.totalHFC134a= 0;
        req.body.totalHFC134aCo2= 0;
        req.body.totalHFC152a=0;
        req.body.totalHFC152aCo2= 0;
        req.body.totalR402a= 0;
        req.body.totalR402aCo2= 0;
        req.body.totalR402b=(parseFloat(req.body.fugaTotal) / 1000);
        req.body.totalR402bCo2=(parseFloat(req.body.potencialCalentamineto) * parseFloat(req.body.totalR402b));
        req.body.totalR404a=0;
        req.body.totalR404aCo2=0;
        req.body.totalR404B=0;
        req.body.totalR404BCo2=0;
        req.body.totalR407c=0;
        req.body.totalR407cCo2=0;
        req.body.totalR410a=0
        req.body.totalR410aCo2=0;
        req.body.totalR507=0;
        req.body.totalR507Co2=0;
        req.body.total508B=0;
        req.body.totalR508BCo2=0;
    }else if(req.body.tipoRefrigerante=='R404a'){
        req.body.totalR22 = 0;
        req.body.totalCO2R22 = 0;
        req.body.totalHFC134a= 0;
        req.body.totalHFC134aCo2= 0;
        req.body.totalHFC152a=0;
        req.body.totalHFC152aCo2= 0;
        req.body.totalR402a= 0;
        req.body.totalR402aCo2= 0;
        req.body.totalR402b=0;
        req.body.totalR402bCo2=0;
        req.body.totalR404a=(parseFloat(req.body.fugaTotal) / 1000);
        req.body.totalR404aCo2=(parseFloat(req.body.potencialCalentamineto) * parseFloat(req.body.totalR404a));
        req.body.totalR404B=0;
        req.body.totalR404BCo2=0;
        req.body.totalR407c=0;
        req.body.totalR407cCo2=0;
        req.body.totalR410a=0
        req.body.totalR410aCo2=0;
        req.body.totalR507=0;
        req.body.totalR507Co2=0;
        req.body.total508B=0;
        req.body.totalR508BCo2=0;
    }else if(req.body.tipoRefrigerante=='R407c'){
        req.body.totalR22 = 0;
        req.body.totalCO2R22 = 0;
        req.body.totalHFC134a= 0;
        req.body.totalHFC134aCo2= 0;
        req.body.totalHFC152a=0;
        req.body.totalHFC152aCo2= 0;
        req.body.totalR402a= 0;
        req.body.totalR402aCo2= 0;
        req.body.totalR402b=0;
        req.body.totalR402bCo2=0;
        req.body.totalR404a=0;
        req.body.totalR404aCo2=0;
        req.body.totalR404B=0;
        req.body.totalR404BCo2=0;
        req.body.totalR407c=(parseFloat(req.body.fugaTotal) / 1000);
        req.body.totalR407cCo2=(parseFloat(req.body.potencialCalentamineto) * parseFloat(req.body.totalR407c));
        req.body.totalR410a=0
        req.body.totalR410aCo2=0;
        req.body.totalR507=0;
        req.body.totalR507Co2=0;
        req.body.total508B=0;
        req.body.totalR508BCo2=0;
    }else if(req.body.tipoRefrigerante=='R404B'){
        req.body.totalR22 = 0;
        req.body.totalCO2R22 = 0;
        req.body.totalHFC134a= 0;
        req.body.totalHFC134aCo2= 0;
        req.body.totalHFC152a=0;
        req.body.totalHFC152aCo2= 0;
        req.body.totalR402a= 0;
        req.body.totalR402aCo2= 0;
        req.body.totalR402b=0;
        req.body.totalR402bCo2=0;
        req.body.totalR404a=0;
        req.body.totalR404aCo2=0;
        req.body.totalR404B=(parseFloat(req.body.fugaTotal) / 1000);
        req.body.totalR404BCo2=(parseFloat(req.body.potencialCalentamineto) * parseFloat(req.body.totalR404B));
        req.body.totalR407c=0;
        req.body.totalR407cCo2=0;
        req.body.totalR410a=0
        req.body.totalR410aCo2=0;
        req.body.totalR507=0;
        req.body.totalR507Co2=0;
        req.body.total508B=0;
        req.body.totalR508BCo2=0;
    }else if(req.body.tipoRefrigerante=='R507'){
        req.body.totalR22 = 0;
        req.body.totalCO2R22 = 0;
        req.body.totalHFC134a= 0;
        req.body.totalHFC134aCo2= 0;
        req.body.totalHFC152a=0;
        req.body.totalHFC152aCo2= 0;
        req.body.totalR402a= 0;
        req.body.totalR402aCo2= 0;
        req.body.totalR402b=0;
        req.body.totalR402bCo2=0;
        req.body.totalR404a=0;
        req.body.totalR404aCo2=0;
        req.body.totalR404B=0;
        req.body.totalR404BCo2=0;
        req.body.totalR407c=0;
        req.body.totalR407cCo2=0;
        req.body.totalR410a=0;
        req.body.totalR410aCo2=0;
        req.body.totalR507=(parseFloat(req.body.fugaTotal) / 1000);
        req.body.totalR507Co2=(parseFloat(req.body.potencialCalentamineto) * parseFloat(req.body.totalR507));
        req.body.total508B=0;
        req.body.totalR508BCo2=0;
    }else if(req.body.tipoRefrigerante=='R508B'){
        req.body.totalR22 = 0;
        req.body.totalCO2R22 = 0;
        req.body.totalHFC134a= 0;
        req.body.totalHFC134aCo2= 0;
        req.body.totalHFC152a=0;
        req.body.totalHFC152aCo2= 0;
        req.body.totalR402a= 0;
        req.body.totalR402aCo2= 0;
        req.body.totalR402b=0;
        req.body.totalR402bCo2=0;
        req.body.totalR404a=0;
        req.body.totalR404aCo2=0;
        req.body.totalR404B=0;
        req.body.totalR404BCo2=0;
        req.body.totalR407c=0;
        req.body.totalR407cCo2=0;
        req.body.totalR410a=0;
        req.body.totalR410aCo2=0;
        req.body.totalR507=0;
        req.body.totalR507Co2=0;
        req.body.total508B=(parseFloat(req.body.fugaTotal) / 1000);
        req.body.totalR508BCo2=(parseFloat(req.body.potencialCalentamineto) * parseFloat(req.body.total508B));
    }
};
 


airConditioningController.save = async function(req, res) {
    calc(req);
    verifyStatus(res.statusCode);
    let airConditioning = new AirConditioning(req.body);
    let comp = await Company.findById(req.params.id);
    airConditioning.company = comp;
    //console.log(comp);
    await airConditioning.save(function(err, airConditionings) {
        console.log("0");
        if (err) {
            res.render('../views/airConditioning/NewAirConditioning', { status: status, message: message, company: airConditionings.company._id });
        } else {
            AirConditioning.findOne({ _id: airConditionings._id }).exec(function(err, airConditioning) {
                let c = 0, c2 = 0;
                let ton = airConditionings.factor_emision/1000;
                let cant = 0, cant2 = 0;
                let pcg = airConditionings.pcg;
                let kg = airConditionings.factor_emision;
                
                if(airConditionings.tipoRefrigerante=="410-A"){
                    c = parseFloat(airConditionings.totalR410a);
                    c2 = parseFloat(airConditionings.totalR410aCo2);
                }else if(airConditionings.tipoRefrigerante=="R22"){
                    c = parseFloat(airConditionings.totalR22);
                    c2 = parseFloat(airConditionings.totalCO2R22);
                }else if(airConditionings.tipoRefrigerante=="HFC134a"){
                    c = parseFloat(airConditionings.totalHFC134a);
                    c2 = parseFloat(airConditionings.totalHFC134aCo2);
                }else if(airConditionings.tipoRefrigerante=="HFC152a"){
                    c = parseFloat(airConditionings.totalHFC152a);
                    c2 = parseFloat(airConditionings.totalHFC152aCo2);
                }else if(airConditionings.tipoRefrigerante=="R402a"){
                    c = parseFloat(airConditionings.totalR402a);
                    c2 = parseFloat(airConditionings.totalR402aCo2);
                }else if(airConditionings.tipoRefrigerante=="R402b"){
                    c = parseFloat(airConditionings.totalR402b);
                    c2 = parseFloat(airConditionings.totalR402bCo2);
                }else if(airConditionings.tipoRefrigerante=="R404a"){
                    c = parseFloat(airConditionings.totalR404a);
                    c2 = parseFloat(airConditionings.totalR404aCo2);
                }else if(airConditionings.tipoRefrigerante=="R404B"){
                    c = parseFloat(airConditionings.totalR404B);
                    c2 = parseFloat(airConditionings.totalR404BCo2);
                }else if(airConditionings.tipoRefrigerante=="R407c"){
                    c = parseFloat(airConditionings.totalR407c);
                    c2 = parseFloat(airConditionings.totalR407cCo2);
                }else if(airConditionings.tipoRefrigerante=="R507"){
                    c = parseFloat(airConditionings.totalR507);
                    c2 = parseFloat(airConditionings.totalR507Co2);
                }else if(airConditionings.tipoRefrigerante=="R508B"){
                    c = parseFloat(airConditionings.totalR508B);
                    c2 = parseFloat(airConditionings.totalR508BCo2);
                }
                let body = {
                    alcance: "1",
                    fuente_generador: "Gas refrigerante A/C",
                    cantidad: c,
                    unidad: airConditionings.tipoRefrigerante,
                    kilogram: airConditionings.factor_emision,
                    ton: ton,
                    gei: airConditionings.gei,
                    pcg: pcg,
                    totalCo2: c2,
                    totalFuente: c2,
                    company: airConditionings.company._id,
                    airConditioning: airConditionings._id
                };
                let totalR410a = 0, totalCo2 = 0, totalR22 = 0, totalHFC134a = 0,  totalHFC152a = 0, totalR402a = 0,
                totalR402b = 0, totalR404a = 0, totalR404B = 0, totalR407c = 0, totalR507 = 0, totalR508B = 0;
    
                let validar410A = false, validarR22 = false, validarHFC134a = false, validarHFC152a = false,
                validarR402a = false, validarR402b = false, validarR404a = false, validarR404B = false, 
                validarR407c = false, validarR507 = false, validarR508B = false;
    
                Company.findOne({ _id: req.params.id })
                .populate("emission")
                .exec(function(err, company) {
                    console.log("1");
                    for(let x of company.emission){
                        if(x.unidad=="410-A" && airConditionings.tipoRefrigerante=="410-A"){
                            validar410A = true;
                        }else if(x.unidad=="R22" && airConditionings.tipoRefrigerante=="R22"){
                            validarR22 = true;
                        }else if(x.unidad=="HFC134a" && airConditionings.tipoRefrigerante=="HFC134a"){
                            validarHFC134a = true;
                        }else if(x.unidad=="HFC152a" && airConditionings.tipoRefrigerante=="HFC152a"){
                            validarHFC152a = true;
                        }else if(x.unidad=="R402a" && airConditionings.tipoRefrigerante=="R402a"){
                            validarR402a = true;
                        }else if(x.unidad=="R402b" && airConditionings.tipoRefrigerante=="R402b"){
                            validarR402b = true;
                        }else if(x.unidad=="R404a" && airConditionings.tipoRefrigerante=="R404a"){
                            validarR404a = true;
                        }else if(x.unidad=="R404B" && airConditionings.tipoRefrigerante=="R404B"){
                            validarR404B = true;
                        }else if(x.unidad=="R407c" && airConditionings.tipoRefrigerante=="R407c"){
                            validarR407c = true;
                        }else if(x.unidad=="R507" && airConditionings.tipoRefrigerante=="R507"){
                            validarR507 = true;
                        }else if(x.unidad=="R508B" && airConditionings.tipoRefrigerante=="R508B"){
                            validarR508B = true;
                        }
                    }
                    console.log(validar410A);
                    console.log(validarR22);
    
                    if(validar410A==true || validarR22==true || validarHFC134a==true || validarHFC152a==true || 
                        validarR402a==true || validarR402b==true || validarR404a==true || validarR404B==true || 
                        validarR407c==true || validarR507==true || validarR508B==true){
    
                        comp.airConditioning.push(airConditionings);
                        comp.save(function(error, comp){
                            Company.findOne({ _id: req.params.id })
                            .populate("airConditioning")
                            .exec(function(err, company) {
                                for (let x of company.airConditioning) {
                                    if(validar410A==true){//410-A
                                        totalR410a = parseFloat(totalR410a) + parseFloat(x.totalR410a);
                                        totalCo2 = parseFloat(totalCo2) + parseFloat(x.totalR410aCo2);
                                        cant2 = totalCo2;
                                        cant = totalR410a;
                                    }else if(validarR22==true){//R22
                                        totalR22 = parseFloat(totalR22) + parseFloat(x.totalR22);
                                        totalCo2 = parseFloat(totalCo2) + parseFloat(x.totalCO2R22);
                                        cant2 = totalCo2;
                                        cant = totalR22;
                                    }else if(validarHFC134a==true){//HFC134a
                                        totalHFC134a = parseFloat(totalHFC134a) + parseFloat(x.totalHFC134a);
                                        totalCo2 = parseFloat(totalCo2) + parseFloat(x.totalHFC134aCo2);
                                        cant2 = totalCo2;
                                        cant = totalHFC134a;
                                    }else if(validarHFC152a==true){//HFC152a
                                        totalHFC152a = parseFloat(totalHFC152a) + parseFloat(x.totalHFC152a);
                                        totalCo2 = parseFloat(totalCo2) + parseFloat(x.totalHFC152aCo2);
                                        cant2 = totalCo2;
                                        cant = totalHFC152a;
                                    }else if(validarR402a==true){//R402a
                                        totalR402a = parseFloat(totalR402a) + parseFloat(x.totalR402a);
                                        totalCo2 = parseFloat(totalCo2) + parseFloat(x.totalR402aCo2);
                                        cant2 = totalCo2;
                                        cant = totalR402a;
                                    }else if(validarR402b==true){//R402b
                                        totalR402b = parseFloat(totalR402b) + parseFloat(x.totalR402b);
                                        totalCo2 = parseFloat(totalCo2) + parseFloat(x.totalR402bCo2);
                                        cant2 = totalCo2;
                                        cant = totalR402b;
                                    }else if(validarR404a==true){//R404a
                                        totalR404a = parseFloat(totalR404a) + parseFloat(x.totalR404a);
                                        totalCo2 = parseFloat(totalCo2) + parseFloat(x.totalR404aCo2);
                                        cant2 = totalCo2;
                                        cant = totalR404a;
                                    }else if(validarR404B==true){//R404B
                                        totalR404B = parseFloat(totalR404B) + parseFloat(x.totalR404B);
                                        totalCo2 = parseFloat(totalCo2) + parseFloat(x.totalR404BCo2);
                                        cant2 = totalCo2;
                                        cant = totalR404B;
                                    }else if(validarR407c==true){//R407c
                                        totalR407c = parseFloat(totalR407c) + parseFloat(x.totalR407c);
                                        totalCo2 = parseFloat(totalCo2) + parseFloat(x.totalR407cCo2);
                                        cant2 = totalCo2;
                                        cant = totalR407c;
                                    }else if(validarR507==true){//R507
                                        totalR507 = parseFloat(totalR507) + parseFloat(x.totalR507);
                                        totalCo2 = parseFloat(totalCo2) + parseFloat(x.totalR507Co2);
                                        cant2 = totalCo2;
                                        cant = totalR507;
                                    }else if(validarR508B==true){//R508B
                                        totalR508B = parseFloat(totalR508B) + parseFloat(x.totalR508B);
                                        totalCo2 = parseFloat(totalCo2) + parseFloat(x.totalR508BCo2);
                                        cant2 = totalCo2;
                                        cant = totalR508B;
                                    }
                                }
                                console.log("2");
                                cant = parseFloat(cant).toFixed(5);
                                cant2 = parseFloat(cant2).toFixed(5);
                                let cant3 = cant2;
                                console.log("CANT "+cant);
                                console.log("CANT2 "+cant3);
                                console.log(airConditionings.tipoRefrigerante);
        
                                Emission.updateOne({ unidad: airConditionings.tipoRefrigerante}, {
                                    $set: {
                                        cantidad: cant,
                                        totalCo2: cant2,
                                        totalFuente: cant3
                                    },
                                }).exec(function (error, ems) {
                                    console.log("3");
                                    console.log(ems);
                                    res.render('../views/airConditioning/NewAirConditioning', {status: status, message: message, company: company });
                                });
                            });
                        });
                    }else {
                        console.log("TOTAL " + c);
                        let emission = new Emission(body);
                        emission.save();
                        comp.emission.push(emission);
                        comp.airConditioning.push(airConditionings);
                        comp.save(function(err, company) {
                            console.log("4");
                            verifyStatus(res.statusCode);
                            res.render('../views/airConditioning/NewAirConditioning', {status: status, message: message, company: company });
                        });
                    } 
                })
            })
        }
    });
};


airConditioningController.searchCompany = function(req, res) {
    Company.findOne({ _id: req.params.id }).exec(function(err, company) {
        if (err) { console.log('Error: ', err); return; }
        res.render('../views/airConditioning/NewAirConditioning', { company: company._id });
    });
};

airConditioningController.list = function(req, res) {
    Company.findOne({ _id: req.params.id })
        .populate("airConditioning")
        .exec(function(err, company) {
            let totalR22=0, totalCO2=0, totalCO2R22=0,
            totalHFC134a=0,totalHFC134aCo2=0,totalHFC152a=0,totalHFC152aCo2=0,totalR402a=0,
            totalR402aCo2=0,totalR402b=0,totalR402bCo2=0,totalR404a=0,totalR404aCo2=0,totalR404B=0,
            totalR404BCo2=0,totalR407c=0,totalR407cCo2=0,totalR410a=0,totalR410aCo2=0,totalR507=0,totalR507Co2=0,total508B=0,totalR508BCo2=0;
            for (let x of company.airConditioning) {
                totalR22 = totalR22 + parseFloat(x.totalR22); 
                totalCO2R22 = totalCO2R22 + parseFloat(x.totalCO2R22);
                totalHFC134a = totalHFC134a + parseFloat(x.totalHFC134a);
                totalHFC134aCo2 = totalHFC134aCo2 + parseFloat(x.totalHFC134aCo2);
                totalHFC152a = totalHFC152a + parseFloat(x.totalHFC152a);
                totalHFC152aCo2 = totalHFC152aCo2 + parseFloat(x.totalHFC152aCo2);
                totalR402a = totalR402a + parseFloat(x.totalR402a);
                totalR402aCo2 = totalR402aCo2 + parseFloat(x.totalR402aCo2);
                totalR402b = totalR402b + parseFloat(x.totalR402b);
                totalR402bCo2 = totalR402bCo2 + parseFloat(x.totalR402bCo2);
                totalR404a = totalR404a + parseFloat(x.totalR404a);
                totalR404aCo2 = totalR404aCo2 + parseFloat(x.totalR404aCo2);
                totalR404B = totalR404B + parseFloat(x.totalR404B);
                totalR404BCo2 = totalR404BCo2 + parseFloat(x.totalR404BCo2);
                totalR407c = totalR407c + parseFloat(x.totalR407c);
                totalR407cCo2 = totalR407cCo2 + parseFloat(x.totalR407cCo2);
                totalR410a = totalR410a + parseFloat(x.totalR410a);
                totalR410aCo2 = totalR410aCo2 + parseFloat(x.totalR410aCo2);
                totalR507 = totalR507 + parseFloat(x.totalR507);
                totalR507Co2 = totalR507Co2 + parseFloat(x.totalR507Co2);
                total508B = total508B + parseFloat(x.total508B);
                totalR508BCo2 = totalR508BCo2 + parseFloat(x.totalR508BCo2);
                
            }
            if (err) {
                res.render("../views/airConditioning/AllAirConditioning", {
                    airConditionings: company.airConditioning,
                    company: company._id,
                    totalR22: totalR22,
                    totalCO2: totalCO2,
                    totalCO2R22: totalCO2R22,
                    totalHFC134a: totalHFC134a,
                    totalHFC134aCo2: totalHFC134aCo2,
                    totalHFC152a: totalHFC152a,
                    totalHFC152aCo2: totalHFC152aCo2,
                    totalR402a: totalR402a,
                    totalR402aCo2: totalR402aCo2,
                    totalR402b: totalR402b,
                    totalR402bCo2: totalR402bCo2,
                    totalR404a: totalR404a,
                    totalR404aCo2: totalR404aCo2,
                    totalR404B: totalR404B,
                    totalR404BCo2: totalR404BCo2,
                    totalR407c: totalR407c,
                    totalR407cCo2: totalR407cCo2,
                    totalR410a: totalR410a,
                    totalR410aCo2: totalR410aCo2,
                    totalR507: totalR507,
                    totalR507Co2: totalR507Co2,
                    total508B: total508B,
                    totalR508BCo2: totalR508BCo2,

                });
            } else {
                res.render("../views/airConditioning/AllAirConditioning", {
                    airConditionings: company.airConditioning,
                    company: company._id,
                    totalR22: totalR22,
                    totalCO2: totalCO2,
                    totalCO2R22: totalCO2R22,
                    totalHFC134a: totalHFC134a,
                    totalHFC134aCo2: totalHFC134aCo2,
                    totalHFC152a: totalHFC152a,
                    totalHFC152aCo2: totalHFC152aCo2,
                    totalR402a: totalR402a,
                    totalR402aCo2: totalR402aCo2,
                    totalR402b: totalR402b,
                    totalR402bCo2: totalR402bCo2,
                    totalR404a: totalR404a,
                    totalR404aCo2: totalR404aCo2,
                    totalR404B: totalR404B,
                    totalR404BCo2: totalR404BCo2,
                    totalR407c: totalR407c,
                    totalR407cCo2: totalR407cCo2,
                    totalR410a: totalR410a,
                    totalR410aCo2: totalR410aCo2,
                    totalR507: totalR507,
                    totalR507Co2: totalR507Co2,
                    total508B: total508B,
                    totalR508BCo2: totalR508BCo2,
                });
            }
        });
};

airConditioningController.search = function(req, res) {
    AirConditioning.findOne({ _id: req.params.id }).exec(function(err, airConditioning) {
        if (err) {
            console.log("Error: ", err);
            res.render("../views/airConditioning/search", {
                airConditioning: airConditioning,
                company: airConditioning.company,
            });
        } else {
            res.render("../views/airConditioning/search", {
                airConditioning: airConditioning,
                company: airConditioning.company,
            });
        }
    });
};
airConditioningController.update = function(req, res) {
    calc(req);
    verifyStatus(res.statusCode);
    AirConditioning.findByIdAndUpdate(
        req.params.id, {
            $set: {
                ubicacion: req.body.ubicacion,
                serie: req.body.serie,
                marca: req.body.marca,
                modelo: req.body.modelo,
                capacidad: req.body.capacidad,
                consumo: req.body.consumo,
                tipoRefrigerante: req.body.tipoRefrigerante,
                capacidadConfinamiento: req.body.capacidadConfinamiento,
                aplicacion: req.body.aplicacion,
                tasaAnualFuga: req.body.tasaAnualFuga,
                fugaTotal: req.body.fugaTotal,
                potencialCalentamineto: req.body.potencialCalentamineto,
                totalR22: req.body.totalR22,
                totalCO2: req.body.totalCO2,
                totalCO2R22: req.body.totalCO2R22,
                totalHFC134a: req.body.totalHFC134a,
                totalHFC134aCo2: req.body.totalHFC134aCo2,
                totalHFC152a: req.body.totalHFC152a,
                totalHFC152aCo2: req.body.totalHFC152aCo2,
                totalR402a: req.body.totalR402a,
                totalR402aCo2: req.body.totalR402aCo2,
                totalR402b: req.body.totalR402b,
                totalR402bCo2: req.body.totalR402bCo2,
                totalR404a: req.body.totalR404a,
                totalR404aCo2: req.body.totalR404aCo2,
                totalR404B: req.body.totalR404B,
                totalR404BCo2: req.body.totalR404BCo2,
                totalR407c: req.body.totalR407c,
                totalR407cCo2: req.body.totalR407cCo2,
                totalR410a: req.body.totalR410a,
                totalR410aCo2: req.body.totalR410aCo2,
                totalR507: req.body.totalR507,
                totalR507Co2: req.body.totalR507Co2,
                total508B: req.body.total508B,
                totalR508BCo2: req.body.totalR508BCo2,
                factor_emision: req.body.factor_emision,
                pcg: req.body.pcg
            },
        }, { new: true },
        function(err, airConditionings) {
            console.log(airConditionings);
            console.log(airConditionings.company);
            if (err) {
                console.log("Error: ", err);
                Company.findOne({ _id: airConditionings.company })
                    .populate("airConditioning")
                    .exec(function(error, company) {
                        if (error) {
                            res.render("../views/airConditioning/AllAirConditioning", {
                                message: message,
                                status: status,
                                airConditionings: company.airConditioning,
                                company: company._id,
                            });
                        } else {
                            res.render("../views/airConditioning/AllAirConditioning", {
                                message: message,
                                status: status,
                                airConditionings: company.airConditioning,
                                company: company._id,
                            });
                        }
                    });
            } else {
                AirConditioning.findOne({ _id: req.params.id }).exec(function (err, ac) {
                    let ton = ac.factor_emision/1000;
                    let cant = ac.emision;
                    cant = parseFloat(cant).toFixed(5);
                    let gei = ac.gei;
                    let pcg = ac.pcg;
                    let kg = ac.factor;
                    let fuente = ac.combustible;
                    let unidad = ac.unidad;
                    Emission.updateOne({ airConditioning: req.params.id }, {
                        $set: {
                            cantidad: cant,
                            kilogram: kg,
                            pcg: pcg, 
                            ton: ton,
                            fuente_generador: fuente,
                            gei: gei,
                            unidad: unidad
                        },
                    }).exec(function (err, ems) {});
                });
                Company.findOne({ _id: airConditionings.company })
                    .populate("airConditioning")
                    .exec(function(error, company) {
                        console.log(error);
                        console.log(company);
                        let totalR22=0, totalCO2=0, totalCO2R22=0,
                        totalHFC134a=0,totalHFC134aCo2=0,totalHFC152a=0,totalHFC152aCo2=0,totalR402a=0,
                        totalR402aCo2=0,totalR402b=0,totalR402bCo2=0,totalR404a=0,totalR404aCo2=0,totalR404B=0,
                        totalR404BCo2=0,totalR407c=0,totalR407cCo2=0,totalR410a=0,totalR410aCo2=0,totalR507=0,totalR507Co2=0,total508B=0,totalR508BCo2=0;
                        for (let x of company.airConditioning) {
                            totalR22 = totalR22 + parseFloat(x.totalR22); 
                            totalCO2R22 = totalCO2R22 + parseFloat(x.totalCO2R22);
                            totalHFC134a = totalHFC134a + parseFloat(x.totalHFC134a);
                            totalHFC134aCo2 = totalHFC134aCo2 + parseFloat(x.totalHFC134aCo2);
                            totalHFC152a = totalHFC152a + parseFloat(x.totalHFC152a);
                            totalHFC152aCo2 = totalHFC152aCo2 + parseFloat(x.totalHFC152aCo2);
                            totalR402a = totalR402a + parseFloat(x.totalR402a);
                            totalR402aCo2 = totalR402aCo2 + parseFloat(x.totalR402aCo2);
                            totalR402b = totalR402b + parseFloat(x.totalR402b);
                            totalR402bCo2 = totalR402bCo2 + parseFloat(x.totalR402bCo2);
                            totalR404a = totalR404a + parseFloat(x.totalR404a);
                            totalR404aCo2 = totalR404aCo2 + parseFloat(x.totalR404aCo2);
                            totalR404B = totalR404B + parseFloat(x.totalR404B);
                            totalR404BCo2 = totalR404BCo2 + parseFloat(x.totalR404BCo2);
                            totalR407c = totalR407c + parseFloat(x.totalR407c);
                            totalR407cCo2 = totalR407cCo2 + parseFloat(x.totalR407cCo2);
                            totalR410a = totalR410a + parseFloat(x.totalR410a);
                            totalR410aCo2 = totalR410aCo2 + parseFloat(x.totalR410aCo2);
                            totalR507 = totalR507 + parseFloat(x.totalR507);
                            totalR507Co2 = totalR507Co2 + parseFloat(x.totalR507Co2);
                            total508B = total508B + parseFloat(x.total508B);
                            totalR508BCo2 = totalR508BCo2 + parseFloat(x.totalR508BCo2);
                            
                        }
                        if (error) {
                            res.render("../views/airConditioning/AllAirConditioning", {
                                message: message,
                                status: status,
                                airConditionings: company.airConditioning,
                                company: company._id,
                                totalR22: totalR22,
                                totalCO2: totalCO2,
                                totalCO2R22: totalCO2R22,
                                totalHFC134a: totalHFC134a,
                                totalHFC134aCo2: totalHFC134aCo2,
                                totalHFC152a: totalHFC152a,
                                totalHFC152aCo2: totalHFC152aCo2,
                                totalR402a: totalR402a,
                                totalR402aCo2: totalR402aCo2,
                                totalR402b: totalR402b,
                                totalR402bCo2: totalR402bCo2,
                                totalR404a: totalR404a,
                                totalR404aCo2: totalR404aCo2,
                                totalR404B: totalR404B,
                                totalR404BCo2: totalR404BCo2,
                                totalR407c: totalR407c,
                                totalR407cCo2: totalR407cCo2,
                                totalR410a: totalR410a,
                                totalR410aCo2: totalR410aCo2,
                                totalR507: totalR507,
                                totalR507Co2: totalR507Co2,
                                total508B: total508B,
                                totalR508BCo2: totalR508BCo2,
                            });
                        } else {
                            res.render("../views/airConditioning/AllAirConditioning", {
                                message: message,
                                status: status,
                                airConditionings: company.airConditioning,
                                company: company._id,
                                totalR22: totalR22,
                                totalCO2: totalCO2,
                                totalCO2R22: totalCO2R22,
                                totalHFC134a: totalHFC134a,
                                totalHFC134aCo2: totalHFC134aCo2,
                                totalHFC152a: totalHFC152a,
                                totalHFC152aCo2: totalHFC152aCo2,
                                totalR402a: totalR402a,
                                totalR402aCo2: totalR402aCo2,
                                totalR402b: totalR402b,
                                totalR402bCo2: totalR402bCo2,
                                totalR404a: totalR404a,
                                totalR404aCo2: totalR404aCo2,
                                totalR404B: totalR404B,
                                totalR404BCo2: totalR404BCo2,
                                totalR407c: totalR407c,
                                totalR407cCo2: totalR407cCo2,
                                totalR410a: totalR410a,
                                totalR410aCo2: totalR410aCo2,
                                totalR507: totalR507,
                                totalR507Co2: totalR507Co2,
                                total508B: total508B,
                                totalR508BCo2: totalR508BCo2,
                            });
                        }
                    });
            }
        }
    );
};

airConditioningController.delete = function (req, res) {
    Emission.findOne({ unidad: req.params.typ }).exec(function (err, e) {
        //if(e!=null){
            AirConditioning.findOne({ _id: req.params.id }).exec(function(err, airConditionings) {
                Company.findOne({ _id: req.params.comp })
                .populate("emission")
                .exec(function (error, company) {
                    let cant = 0, restar = 0, total = 0, restar2 = 0, total2 = 0, cant2 = 0;
                    for(let x of company.emission){
                        if(airConditionings.tipoRefrigerante == x.unidad){
                            cant = parseFloat(x.cantidad);
                        }
                        if(x.unidad=="410-A"){
                            cant2 = parseFloat(x.totalR410aCo2);
                        }
                    }
                    if(airConditionings.tipoRefrigerante=="410-A"){
                        restar = parseFloat(airConditionings.totalR410a);
                        restar2 = parseFloat(airConditionings.totalR410aCo2);
                    }else if(airConditionings.tipoRefrigerante=="R22"){
                        restar = parseFloat(airConditionings.totalR22);
                    }else if(airConditionings.tipoRefrigerante=="HFC134a"){
                        restar = parseFloat(airConditionings.totalHFC134a);
                    }else if(airConditionings.tipoRefrigerante=="HFC152a"){
                        restar = parseFloat(airConditionings.totalHFC152a);
                    }else if(airConditionings.tipoRefrigerante=="R402a"){
                        restar = parseFloat(airConditionings.totalR402a);
                    }else if(airConditionings.tipoRefrigerante=="R402b"){
                        restar = parseFloat(airConditionings.totalR402b);
                    }else if(airConditionings.tipoRefrigerante=="R404a"){
                        restar = parseFloat(airConditionings.totalR404a);
                    }else if(airConditionings.tipoRefrigerante=="R404B"){
                        restar = parseFloat(airConditionings.totalR404B);
                    }else if(airConditionings.tipoRefrigerante=="R407c"){
                        restar = parseFloat(airConditionings.totalR407c);
                    }else if(airConditionings.tipoRefrigerante=="R507"){
                        restar = parseFloat(airConditionings.totalR507);
                    }else if(airConditionings.tipoRefrigerante=="R508B"){
                        restar = parseFloat(airConditionings.totalR508B);
                    }
                    restar = parseFloat(restar).toFixed(5);
                    restar2 = parseFloat(restar2).toFixed(5);
                    total = cant - restar;
                    total2 = cant2 - restar2;
                    total = parseFloat(total).toFixed(5);
                    total2 = parseFloat(total2).toFixed(5);
                    console.log("TOTAL: " + total);
                    if(total==0){
                        Company.updateOne({ _id: req.params.comp }, {
                            $pull: { 
                                emission: e._id
                            }
                        }).exec(function (err, e) { 
                            Emission.deleteOne({ airConditioning: req.params.id }).exec(function (err, emission) {}); 
                        });
                    }else{
                        console.log("Total: " + total);
                        Emission.updateOne({ unidad: airConditionings.tipoRefrigerante }, {
                            $set: {
                                cantidad: total,
                                totalR410aCo2: total2
                            },
                        }).exec(function (err, ems) {
                            console.log(ems);
                        });
                    }
                });
                Company.updateOne({ "_id": req.params.comp }, {
                    $pull: { "airConditioning": req.params.id }
                }).exec(function (err, airConditioning) {
                    if (airConditioning) {
                        AirConditioning.deleteOne({ _id: req.params.id }, function (err, air) {             
                            if (err) {
                                Company.findOne({ _id: req.params.comp })
                                    .populate("airConditioning")
                                    .exec(function (error, company) {
                                        let totalR22=0, totalCO2=0, totalCO2R22=0,
                                        totalHFC134a=0,totalHFC134aCo2=0,totalHFC152a=0,totalHFC152aCo2=0,totalR402a=0,
                                        totalR402aCo2=0,totalR402b=0,totalR402bCo2=0,totalR404a=0,totalR404aCo2=0,totalR404B=0,
                                        totalR404BCo2=0,totalR407c=0,totalR407cCo2=0,totalR410a=0,totalR410aCo2=0,totalR507=0,totalR507Co2=0,total508B=0,totalR508BCo2=0;
                                        for (let x of company.airConditioning) {
                                            totalR22 = totalR22 + parseFloat(x.totalR22);  
                                            totalCO2R22 = totalCO2R22 + parseFloat(x.totalCO2R22);
                                            totalHFC134a = totalHFC134a + parseFloat(x.totalHFC134a);
                                            totalHFC134aCo2 = totalHFC134aCo2 + parseFloat(x.totalHFC134aCo2);
                                            totalHFC152a = totalHFC152a + parseFloat(x.totalHFC152a);
                                            totalHFC152aCo2 = totalHFC152aCo2 + parseFloat(x.totalHFC152aCo2);
                                            totalR402a = totalR402a + parseFloat(x.totalR402a);
                                            totalR402aCo2 = totalR402aCo2 + parseFloat(x.totalR402aCo2);
                                            totalR402b = totalR402b + parseFloat(x.totalR402b);
                                            totalR402bCo2 = totalR402bCo2 + parseFloat(x.totalR402bCo2);
                                            totalR404a = totalR404a + parseFloat(x.totalR404a);
                                            totalR404aCo2 = totalR404aCo2 + parseFloat(x.totalR404aCo2);
                                            totalR404B = totalR404B + parseFloat(x.totalR404B);
                                            totalR404BCo2 = totalR404BCo2 + parseFloat(x.totalR404BCo2);
                                            totalR407c = totalR407c + parseFloat(x.totalR407c);
                                            totalR407cCo2 = totalR407cCo2 + parseFloat(x.totalR407cCo2);
                                            totalR410a = totalR410a + parseFloat(x.totalR410a);
                                            totalR410aCo2 = totalR410aCo2 + parseFloat(x.totalR410aCo2);
                                            totalR507 = totalR507 + parseFloat(x.totalR507);
                                            totalR507Co2 = totalR507Co2 + parseFloat(x.totalR507Co2);
                                            total508B = total508B + parseFloat(x.total508B);
                                            totalR508BCo2 = totalR508BCo2 + parseFloat(x.totalR508BCo2);
                                            
                                        }
                                        if (error) {
                                            //verifyStatus(res.statusCode);
                                            res.render("../views/airConditioning/AllAirConditioning", {
                                                company: company,
                                                airConditionings: company.airConditioning,
                                                totalR22: totalR22,
                                                totalCO2: totalCO2,
                                                totalCO2R22: totalCO2R22,
                                                totalHFC134a: totalHFC134a,
                                                totalHFC134aCo2: totalHFC134aCo2,
                                                totalHFC152a: totalHFC152a,
                                                totalHFC152aCo2: totalHFC152aCo2,
                                                totalR402a: totalR402a,
                                                totalR402aCo2: totalR402aCo2,
                                                totalR402b: totalR402b,
                                                totalR402bCo2: totalR402bCo2,
                                                totalR404a: totalR404a,
                                                totalR404aCo2: totalR404aCo2,
                                                totalR404B: totalR404B,
                                                totalR404BCo2: totalR404BCo2,
                                                totalR407c: totalR407c,
                                                totalR407cCo2: totalR407cCo2,
                                                totalR410a: totalR410a,
                                                totalR410aCo2: totalR410aCo2,
                                                totalR507: totalR507,
                                                totalR507Co2: totalR507Co2,
                                                total508B: total508B,
                                                totalR508BCo2: totalR508BCo2,
                                            });
                                        } else {
                                            //    return res.json("fuels and oil deleted!"); 
                                            //verifyStatus(res.statusCode);
                                            res.render("../views/airConditioning/AllAirConditioning", {
                                                company: company,
                                                airConditionings: company.airConditioning,
                                                totalR22: totalR22,
                                                totalCO2: totalCO2,
                                                totalCO2R22: totalCO2R22,
                                                totalHFC134a: totalHFC134a,
                                                totalHFC134aCo2: totalHFC134aCo2,
                                                totalHFC152a: totalHFC152a,
                                                totalHFC152aCo2: totalHFC152aCo2,
                                                totalR402a: totalR402a,
                                                totalR402aCo2: totalR402aCo2,
                                                totalR402b: totalR402b,
                                                totalR402bCo2: totalR402bCo2,
                                                totalR404a: totalR404a,
                                                totalR404aCo2: totalR404aCo2,
                                                totalR404B: totalR404B,
                                                totalR404BCo2: totalR404BCo2,
                                                totalR407c: totalR407c,
                                                totalR407cCo2: totalR407cCo2,
                                                totalR410a: totalR410a,
                                                totalR410aCo2: totalR410aCo2,
                                                totalR507: totalR507,
                                                totalR507Co2: totalR507Co2,
                                                total508B: total508B,
                                                totalR508BCo2: totalR508BCo2,
                                            });
                                        }
                                    });    
                                    
                            } else {
                                Company.findOne({ _id: req.params.comp })
                                    .populate("airConditioning")
                                    .exec(function (error, company) {
                                        let totalR22=0, totalCO2=0, totalCO2R22=0,
                                        totalHFC134a=0,totalHFC134aCo2=0,totalHFC152a=0,totalHFC152aCo2=0,totalR402a=0,
                                        totalR402aCo2=0,totalR402b=0,totalR402bCo2=0,totalR404a=0,totalR404aCo2=0,totalR404B=0,
                                        totalR404BCo2=0,totalR407c=0,totalR407cCo2=0,totalR410a=0,totalR410aCo2=0,totalR507=0,totalR507Co2=0,total508B=0,totalR508BCo2=0;
                                        for (let x of company.airConditioning) {
                                            totalR22 = totalR22 + parseFloat(x.totalR22);  
                                            totalCO2R22 = totalCO2R22 + parseFloat(x.totalCO2R22);
                                            totalHFC134a = totalHFC134a + parseFloat(x.totalHFC134a);
                                            totalHFC134aCo2 = totalHFC134aCo2 + parseFloat(x.totalHFC134aCo2);
                                            totalHFC152a = totalHFC152a + parseFloat(x.totalHFC152a);
                                            totalHFC152aCo2 = totalHFC152aCo2 + parseFloat(x.totalHFC152aCo2);
                                            totalR402a = totalR402a + parseFloat(x.totalR402a);
                                            totalR402aCo2 = totalR402aCo2 + parseFloat(x.totalR402aCo2);
                                            totalR402b = totalR402b + parseFloat(x.totalR402b);
                                            totalR402bCo2 = totalR402bCo2 + parseFloat(x.totalR402bCo2);
                                            totalR404a = totalR404a + parseFloat(x.totalR404a);
                                            totalR404aCo2 = totalR404aCo2 + parseFloat(x.totalR404aCo2);
                                            totalR404B = totalR404B + parseFloat(x.totalR404B);
                                            totalR404BCo2 = totalR404BCo2 + parseFloat(x.totalR404BCo2);
                                            totalR407c = totalR407c + parseFloat(x.totalR407c);
                                            totalR407cCo2 = totalR407cCo2 + parseFloat(x.totalR407cCo2);
                                            totalR410a = totalR410a + parseFloat(x.totalR410a);
                                            totalR410aCo2 = totalR410aCo2 + parseFloat(x.totalR410aCo2);
                                            totalR507 = totalR507 + parseFloat(x.totalR507);
                                            totalR507Co2 = totalR507Co2 + parseFloat(x.totalR507Co2);
                                            total508B = total508B + parseFloat(x.total508B);
                                            totalR508BCo2 = totalR508BCo2 + parseFloat(x.totalR508BCo2);
                                            
                                        }
                                        if (error) {
                                            //verifyStatus(res.statusCode);
                                            res.render("../views/airConditioning/AllAirConditioning", {
                                                company: company,
                                                airConditionings: company.airConditioning,
                                                totalR22: totalR22,
                                                totalCO2: totalCO2,
                                                totalCO2R22: totalCO2R22,
                                                totalHFC134a: totalHFC134a,
                                                totalHFC134aCo2: totalHFC134aCo2,
                                                totalHFC152a: totalHFC152a,
                                                totalHFC152aCo2: totalHFC152aCo2,
                                                totalR402a: totalR402a,
                                                totalR402aCo2: totalR402aCo2,
                                                totalR402b: totalR402b,
                                                totalR402bCo2: totalR402bCo2,
                                                totalR404a: totalR404a,
                                                totalR404aCo2: totalR404aCo2,
                                                totalR404B: totalR404B,
                                                totalR404BCo2: totalR404BCo2,
                                                totalR407c: totalR407c,
                                                totalR407cCo2: totalR407cCo2,
                                                totalR410a: totalR410a,
                                                totalR410aCo2: totalR410aCo2,
                                                totalR507: totalR507,
                                                totalR507Co2: totalR507Co2,
                                                total508B: total508B,
                                                totalR508BCo2: totalR508BCo2,
                                            });
                                        } else {
                                            //    return res.json("fuels and oil deleted!"); 
                                            //verifyStatus(res.statusCode);
                                            res.render("../views/airConditioning/AllAirConditioning", {
                                                company: company,
                                                airConditionings: company.airConditioning,
                                                totalR22: totalR22,
                                                totalCO2: totalCO2,
                                                totalCO2R22: totalCO2R22,
                                                totalHFC134a: totalHFC134a,
                                                totalHFC134aCo2: totalHFC134aCo2,
                                                totalHFC152a: totalHFC152a,
                                                totalHFC152aCo2: totalHFC152aCo2,
                                                totalR402a: totalR402a,
                                                totalR402aCo2: totalR402aCo2,
                                                totalR402b: totalR402b,
                                                totalR402bCo2: totalR402bCo2,
                                                totalR404a: totalR404a,
                                                totalR404aCo2: totalR404aCo2,
                                                totalR404B: totalR404B,
                                                totalR404BCo2: totalR404BCo2,
                                                totalR407c: totalR407c,
                                                totalR407cCo2: totalR407cCo2,
                                                totalR410a: totalR410a,
                                                totalR410aCo2: totalR410aCo2,
                                                totalR507: totalR507,
                                                totalR507Co2: totalR507Co2,
                                                total508B: total508B,
                                                totalR508BCo2: totalR508BCo2,
                                            });
                                        }
                                    });
                            }
                        });
                    }else {
                        Company.findOne({ _id: req.params.comp })
                            .populate("airConditioning")
                            .exec(function (error, company) {
                                let totalR22=0, totalCO2=0, totalCO2R22=0,
                                totalHFC134a=0,totalHFC134aCo2=0,totalHFC152a=0,totalHFC152aCo2=0,totalR402a=0,
                                totalR402aCo2=0,totalR402b=0,totalR402bCo2=0,totalR404a=0,totalR404aCo2=0,totalR404B=0,
                                totalR404BCo2=0,totalR407c=0,totalR407cCo2=0,totalR410a=0,totalR410aCo2=0,totalR507=0,totalR507Co2=0,total508B=0,totalR508BCo2=0;
                                for (let x of company.airConditioning) {
                                    totalR22 = totalR22 + parseFloat(x.totalR22);  
                                    totalCO2R22 = totalCO2R22 + parseFloat(x.totalCO2R22);
                                    totalHFC134a = totalHFC134a + parseFloat(x.totalHFC134a);
                                    totalHFC134aCo2 = totalHFC134aCo2 + parseFloat(x.totalHFC134aCo2);
                                    totalHFC152a = totalHFC152a + parseFloat(x.totalHFC152a);
                                    totalHFC152aCo2 = totalHFC152aCo2 + parseFloat(x.totalHFC152aCo2);
                                    totalR402a = totalR402a + parseFloat(x.totalR402a);
                                    totalR402aCo2 = totalR402aCo2 + parseFloat(x.totalR402aCo2);
                                    totalR402b = totalR402b + parseFloat(x.totalR402b);
                                    totalR402bCo2 = totalR402bCo2 + parseFloat(x.totalR402bCo2);
                                    totalR404a = totalR404a + parseFloat(x.totalR404a);
                                    totalR404aCo2 = totalR404aCo2 + parseFloat(x.totalR404aCo2);
                                    totalR404B = totalR404B + parseFloat(x.totalR404B);
                                    totalR404BCo2 = totalR404BCo2 + parseFloat(x.totalR404BCo2);
                                    totalR407c = totalR407c + parseFloat(x.totalR407c);
                                    totalR407cCo2 = totalR407cCo2 + parseFloat(x.totalR407cCo2);
                                    totalR410a = totalR410a + parseFloat(x.totalR410a);
                                    totalR410aCo2 = totalR410aCo2 + parseFloat(x.totalR410aCo2);
                                    totalR507 = totalR507 + parseFloat(x.totalR507);
                                    totalR507Co2 = totalR507Co2 + parseFloat(x.totalR507Co2);
                                    total508B = total508B + parseFloat(x.total508B);
                                    totalR508BCo2 = totalR508BCo2 + parseFloat(x.totalR508BCo2);
                                    
                                }
                                if (error) {
                                    //verifyStatus(res.statusCode);
                                    res.render("../views/airConditioning/AllAirConditioning", {
                                        company: company,
                                        airConditionings: company.airConditioning,
                                        totalR22: totalR22,
                                        totalCO2: totalCO2,
                                        totalCO2R22: totalCO2R22,
                                        totalHFC134a: totalHFC134a,
                                        totalHFC134aCo2: totalHFC134aCo2,
                                        totalHFC152a: totalHFC152a,
                                        totalHFC152aCo2: totalHFC152aCo2,
                                        totalR402a: totalR402a,
                                        totalR402aCo2: totalR402aCo2,
                                        totalR402b: totalR402b,
                                        totalR402bCo2: totalR402bCo2,
                                        totalR404a: totalR404a,
                                        totalR404aCo2: totalR404aCo2,
                                        totalR404B: totalR404B,
                                        totalR404BCo2: totalR404BCo2,
                                        totalR407c: totalR407c,
                                        totalR407cCo2: totalR407cCo2,
                                        totalR410a: totalR410a,
                                        totalR410aCo2: totalR410aCo2,
                                        totalR507: totalR507,
                                        totalR507Co2: totalR507Co2,
                                        total508B: total508B,
                                        totalR508BCo2: totalR508BCo2,
                                    });
                                } else {
                                    //    return res.json("fuels and oil deleted!"); 
                                    //verifyStatus(res.statusCode);
                                    res.render("../views/airConditioning/AllAirConditioning", {
                                        company: company,
                                        airConditionings: company.airConditioning,
                                        totalR22: totalR22,
                                        totalCO2: totalCO2,
                                        totalCO2R22: totalCO2R22,
                                        totalHFC134a: totalHFC134a,
                                        totalHFC134aCo2: totalHFC134aCo2,
                                        totalHFC152a: totalHFC152a,
                                        totalHFC152aCo2: totalHFC152aCo2,
                                        totalR402a: totalR402a,
                                        totalR402aCo2: totalR402aCo2,
                                        totalR402b: totalR402b,
                                        totalR402bCo2: totalR402bCo2,
                                        totalR404a: totalR404a,
                                        totalR404aCo2: totalR404aCo2,
                                        totalR404B: totalR404B,
                                        totalR404BCo2: totalR404BCo2,
                                        totalR407c: totalR407c,
                                        totalR407cCo2: totalR407cCo2,
                                        totalR410a: totalR410a,
                                        totalR410aCo2: totalR410aCo2,
                                        totalR507: totalR507,
                                        totalR507Co2: totalR507Co2,
                                        total508B: total508B,
                                        totalR508BCo2: totalR508BCo2,
                                    });
                                }
                            });
                    }
                });
            })   
        //}
    });
};

module.exports = airConditioningController;