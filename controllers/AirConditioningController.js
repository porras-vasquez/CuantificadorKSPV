'use strict'
require('../connection');
var ObjectID = require('mongodb').ObjectID;
const Company = require("../models/Company");
const AirConditioning = require('../models/AirConditioning');
const Emission = require("../models/Emission");
var airConditioningController = {};
var status = 0;
var message = "";
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
    var airConditioning = new AirConditioning(req.body);
    var comp = await Company.findById(req.params.id);
    airConditioning.company = comp;
    //console.log(comp);
    await airConditioning.save(function(err, airConditionings) {
        console.log("0");
        if (err) {
            res.render('../views/airConditioning/NewAirConditioning', { status: status, message: message, company: airConditionings.company._id });
        } else {
            var ton = airConditionings.factor_emision/1000;
            var cant = 0;
            var gei = airConditionings.gei;
            var pcg = airConditionings.pcg;
            var co2 = 0;
            var ch4 = 0;
            var n2o = 0;
            var kg = airConditionings.factor;
            var hfc = 0;
            var hcfc = 0;

            if(airConditionings.gei=="HFC"){
                hfc = cant * ton * pcg;
                hfc = parseFloat(hfc).toFixed(5);
            }else if(airConditionings.gei=="HCFC"){
                hcfc = cant * ton * pcg;
                hcfc = parseFloat(hcfc).toFixed(5);
            }
            var body = {
                alcance: "1",
                fuente_generador: "Gas refrigerante A/C",
                cantidad: cant,
                unidad: airConditionings.tipoRefrigerante,
                kilogram: airConditionings.factor_emision,
                ton: ton,
                gei: airConditionings.gei,
                pcg: pcg,
                co2: "",
                ch4: "",
                n2o: "",
                company: airConditionings.company._id,
                airConditioning: airConditionings._id
            };

            var totalR410a = 0;
            var totalR22 = 0;
            var validar410A = false;
            var validarR22 = false;
            var validarHFC134a = false;
            var validarHFC152a = false;
            var validarR402a = false;
            var validarR402b = false;
            var validarR404a = false;
            var validarR404B = false;
            var validarR407c = false;
            var validarR507 = false;
            var validarR508B = false;

            Company.findOne({ _id: req.params.id })
            .populate("emission")
            .exec(function(err, company) {
                console.log("1");
                for(var x of company.emission){
                    console.log(x.unidad);
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
                            for (var x of company.airConditioning) {
                                if(validar410A==true){
                                    totalR410a = parseFloat(totalR410a) + parseFloat(x.totalR410a);
                                    cant = totalR410a;
                                }else if(validarR22==true){
                                    totalR22 = parseFloat(totalR22) + parseFloat(x.totalR22);
                                    cant = totalR22;
                                }
                            }
                            console.log("2");
                            console.log(cant);
                            console.log(airConditionings.tipoRefrigerante);
    
                            Emission.updateOne({ unidad: airConditionings.tipoRefrigerante}, {
                                $set: {
                                    cantidad: cant,
                                    co2: co2,
                                    ch4: ch4,
                                    n2o: n2o,
                                    kilogram: kg,
                                    pcg: pcg, 
                                    ton: ton,
                                    gei: gei,
                                },
                            }).exec(function (error, ems) {
                                console.log("3");
                                res.render('../views/airConditioning/NewAirConditioning', {status: status, message: message, company: company });
                            });
                        });
                    });
                }else {
                    var emission = new Emission(body);
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
            //console.log("VERDADERO VALOR DE VALIDAR: " + validar);

            if(airConditionings.tipoRefrigerante=="R22"){

            }else{

            } 

            if(airConditionings.tipoRefrigerante=="HFC134a"){

            }else{

            } 

            if(airConditionings.tipoRefrigerante=="HFC152a"){

            }else{

            }

            if(airConditionings.tipoRefrigerante=="R402a"){

            }else{

            } 

            if(airConditionings.tipoRefrigerante=="R402b"){

            }else{

            } 

            if(airConditionings.tipoRefrigerante=="R404a"){

            }else{

            }

            if(airConditionings.tipoRefrigerante=="R404B"){

            }else{

            } 

            if(airConditionings.tipoRefrigerante=="R407c"){

            }else{

            } 

            if(airConditionings.tipoRefrigerante=="R507"){

            }else{

            } 

            if(airConditionings.tipoRefrigerante=="R508B"){

            }else{

            }
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
            var totalR22=0, totalCO2=0, totalCO2R22=0,
            totalHFC134a=0,totalHFC134aCo2=0,totalHFC152a=0,totalHFC152aCo2=0,totalR402a=0,
            totalR402aCo2=0,totalR402b=0,totalR402bCo2=0,totalR404a=0,totalR404aCo2=0,totalR404B=0,
            totalR404BCo2=0,totalR407c=0,totalR407cCo2=0,totalR410a=0,totalR410aCo2=0,totalR507=0,totalR507Co2=0,total508B=0,totalR508BCo2=0;
            for (var x of company.airConditioning) {
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
                    var ton = ac.factor_emision/1000;
                    var cant = ac.emision;
                    cant = parseFloat(cant).toFixed(5);
                    var gei = ac.gei;
                    var pcg = ac.pcg;
                    var co2 = 0;
                    var ch4 = 0;
                    var n2o = 0;
                    var kg = ac.factor;
                    var fuente = ac.combustible;
                    var unidad = ac.unidad;
        
                    if(ac.gei=="CO2"){
                        co2 = cant * ton * pcg;
                        co2 = parseFloat(co2).toFixed(5);
                    }else if(ac.gei=="CH4"){
                        ch4 = cant * ton * pcg;
                        ch4 = parseFloat(ch4).toFixed(5);
                    }else{
                        n2o = cant * ton * pcg;
                        n2o = parseFloat(n2o).toFixed(5);
                    }
                    Emission.updateOne({ airConditioning: req.params.id }, {
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
                Company.findOne({ _id: airConditionings.company })
                    .populate("airConditioning")
                    .exec(function(error, company) {
                        console.log(error);
                        console.log(company);
                        var totalR22=0, totalCO2=0, totalCO2R22=0,
                        totalHFC134a=0,totalHFC134aCo2=0,totalHFC152a=0,totalHFC152aCo2=0,totalR402a=0,
                        totalR402aCo2=0,totalR402b=0,totalR402bCo2=0,totalR404a=0,totalR404aCo2=0,totalR404B=0,
                        totalR404BCo2=0,totalR407c=0,totalR407cCo2=0,totalR410a=0,totalR410aCo2=0,totalR507=0,totalR507Co2=0,total508B=0,totalR508BCo2=0;
                        for (var x of company.airConditioning) {
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
    Emission.findOne({ airConditioning: req.params.id }).exec(function (err, e) {
        if(e!=null){
            Company.updateOne({ _id: req.params.comp }, {
                $pull: { 
                    emission: e._id
                }
            }).exec(function (err, e) {
            });
        }
    });
    Company.updateOne({ "_id": req.params.comp }, {
        $pull: { "airConditioning": req.params.id }
    }).exec(function (err, airConditioning) {
        if (airConditioning) {
            AirConditioning.deleteOne({ _id: req.params.id }, function (err, air) {
                Emission.deleteOne({ airConditioning: req.params.id }).exec(function (err, emission) {});               
                if (err) {
                    Company.findOne({ _id: req.params.comp })
                        .populate("airConditioning")
                        .exec(function (error, company) {
                            Company.findOne({ _id: req.params.comp })
                            .populate("airConditioning")
                            .exec(function (error, company) {
                                var totalR22=0, totalCO2=0, totalCO2R22=0,
                                totalHFC134a=0,totalHFC134aCo2=0,totalHFC152a=0,totalHFC152aCo2=0,totalR402a=0,
                                totalR402aCo2=0,totalR402b=0,totalR402bCo2=0,totalR404a=0,totalR404aCo2=0,totalR404B=0,
                                totalR404BCo2=0,totalR407c=0,totalR407cCo2=0,totalR410a=0,totalR410aCo2=0,totalR507=0,totalR507Co2=0,total508B=0,totalR508BCo2=0;
                                for (var x of company.airConditioning) {
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
                        });    
                        
                } else {
                    Company.findOne({ _id: req.params.comp })
                        .populate("airConditioning")
                        .exec(function (error, company) {
                            var totalR22=0, totalCO2=0, totalCO2R22=0,
                            totalHFC134a=0,totalHFC134aCo2=0,totalHFC152a=0,totalHFC152aCo2=0,totalR402a=0,
                            totalR402aCo2=0,totalR402b=0,totalR402bCo2=0,totalR404a=0,totalR404aCo2=0,totalR404B=0,
                            totalR404BCo2=0,totalR407c=0,totalR407cCo2=0,totalR410a=0,totalR410aCo2=0,totalR507=0,totalR507Co2=0,total508B=0,totalR508BCo2=0;
                            for (var x of company.airConditioning) {
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
                    var totalR22=0, totalCO2=0, totalCO2R22=0,
                    totalHFC134a=0,totalHFC134aCo2=0,totalHFC152a=0,totalHFC152aCo2=0,totalR402a=0,
                    totalR402aCo2=0,totalR402b=0,totalR402bCo2=0,totalR404a=0,totalR404aCo2=0,totalR404B=0,
                    totalR404BCo2=0,totalR407c=0,totalR407cCo2=0,totalR410a=0,totalR410aCo2=0,totalR507=0,totalR507Co2=0,total508B=0,totalR508BCo2=0;
                    for (var x of company.airConditioning) {
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
};

module.exports = airConditioningController;