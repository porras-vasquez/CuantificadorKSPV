'use strict'
require('../connection');
const Company = require("../models/Company");
const AirConditioning = require('../models/AirConditioning');
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
        req.body.totalHCFC = (parseFloat(req.body.fugaTotal) / 1000);
        req.body.totalCO2 = (parseFloat(req.body.potencialCalentamineto) * parseFloat(req.body.totalHCFC));
        req.body.totalR22 =0;
        req.body.totalCO2R22 = 0;
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
        
    } else if(req.body.tipoRefrigerante=='R22'){
        req.body.totalR22 = (parseFloat(req.body.fugaTotal) / 1000);
        req.body.totalCO2R22 = (parseFloat(req.body.potencialCalentamineto) * parseFloat(req.body.totalR22));
        req.body.totalHCFC = 0;
        req.body.totalCO2 =0;
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
        req.body.totalHCFC = 0;
        req.body.totalCO2 =0;
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
        req.body.totalHCFC = 0;
        req.body.totalCO2 =0;
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
        req.body.totalHCFC = 0;
        req.body.totalCO2 =0;
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
        req.body.totalHCFC = 0;
        req.body.totalCO2 =0;
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
        req.body.totalHCFC = 0;
        req.body.totalCO2 =0;
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
        req.body.totalHCFC = 0;
        req.body.totalCO2 =0;
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
        req.body.totalHCFC = 0;
        req.body.totalCO2 =0;
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
    }else if(req.body.tipoRefrigerante=='R410a'){
        req.body.totalR22 = 0;
        req.body.totalCO2R22 = 0;
        req.body.totalHCFC = 0;
        req.body.totalCO2 =0;
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
    }else if(req.body.tipoRefrigerante=='R507'){
        req.body.totalR22 = 0;
        req.body.totalCO2R22 = 0;
        req.body.totalHCFC = 0;
        req.body.totalCO2 =0;
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
        req.body.totalHCFC = 0;
        req.body.totalCO2 =0;
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
        console.log(airConditionings);
        if (err) {
            verifyStatus(res.statusCode);
            res.render('../views/airConditioning/NewAirConditioning', { status: status, message: message, company: airConditionings.company._id });
        } else {
            comp.airConditioning.push(airConditionings);
            comp.save(function(err, company) {
                if (err) {
                    res.render('../views/airConditioning/NewAirConditioning', { status: status, message: message, company: company });
                } else {
                    res.render('../views/airConditioning/NewAirConditioning', {status: status, message: message, company: company });
                }
            });
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
            var  totalHCFC = 0,totalR22=0, totalCO2=0, totalCO2R22=0,
            totalHFC134a=0,totalHFC134aCo2=0,totalHFC152a=0,totalHFC152aCo2=0,totalR402a=0,
            totalR402aCo2=0,totalR402b=0,totalR402bCo2=0,totalR404a=0,totalR404aCo2=0,totalR404B=0,
            totalR404BCo2=0,totalR407c=0,totalR407cCo2=0,totalR410a=0,totalR410aCo2=0,totalR507=0,totalR507Co2=0,total508B=0,totalR508BCo2=0;
            for (var x of company.airConditioning) {
                totalHCFC = totalHCFC + parseFloat(x.totalHCFC); 
                totalR22 = totalR22 + parseFloat(x.totalR22); 
                totalCO2 = totalCO2 + parseFloat(x.totalCO2); 
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
                    totalHCFC:totalHCFC,
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
                    totalHCFC:totalHCFC,
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
                totalHCFC: req.body.totalHCFC,
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
                                message: "error",
                                airConditionings: company.airConditioning,
                                company: company._id,
                            });
                        } else {
                            res.render("../views/airConditioning/AllAirConditioning", {
                                message: "success",
                                airConditionings: company.airConditioning,
                                company: company._id,
                            });
                        }
                    });
            } else {
                Company.findOne({ _id: airConditionings.company })
                    .populate("airConditioning")
                    .exec(function(error, company) {
                        console.log(error);
                        console.log(company);
                        var  totalHCFC = 0,totalR22=0, totalCO2=0, totalCO2R22=0,
                        totalHFC134a=0,totalHFC134aCo2=0,totalHFC152a=0,totalHFC152aCo2=0,totalR402a=0,
                        totalR402aCo2=0,totalR402b=0,totalR402bCo2=0,totalR404a=0,totalR404aCo2=0,totalR404B=0,
                        totalR404BCo2=0,totalR407c=0,totalR407cCo2=0,totalR410a=0,totalR410aCo2=0,totalR507=0,totalR507Co2=0,total508B=0,totalR508BCo2=0;
                        for (var x of company.airConditioning) {
                            totalHCFC = totalHCFC + parseFloat(x.totalHCFC); 
                            totalR22 = totalR22 + parseFloat(x.totalR22); 
                            totalCO2 = totalCO2 + parseFloat(x.totalCO2); 
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
                                message: "error",
                                airConditionings: company.airConditioning,
                                company: company._id,
                                totalHCFC:totalHCFC,
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
                                message: "success",
                                airConditionings: company.airConditioning,
                                company: company._id,
                                totalHCFC:totalHCFC,
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
    Company.updateOne({ "_id": req.params.comp }, {
        $pull: { "airConditioning": req.params.id }
    }).exec(function (err, airConditioning) {
        if (airConditioning) {
            AirConditioning.deleteOne({ _id: req.params.id }, function (err) {
                if (err) {

                            if (error) {
                               // verifyStatus(res.statusCode);
                                res.render("../views/airConditioning/AllAirConditioning", {
                                    company: company,
                                    airConditionings: company.airConditioning,
                                    
                                });
                            }
                        
                } else {
                    Company.findOne({ _id: req.params.comp })
                        .populate("airConditioning")
                        .exec(function (error, company) {
                            var  totalHCFC = 0,totalR22=0, totalCO2=0, totalCO2R22=0,
                            totalHFC134a=0,totalHFC134aCo2=0,totalHFC152a=0,totalHFC152aCo2=0,totalR402a=0,
                            totalR402aCo2=0,totalR402b=0,totalR402bCo2=0,totalR404a=0,totalR404aCo2=0,totalR404B=0,
                            totalR404BCo2=0,totalR407c=0,totalR407cCo2=0,totalR410a=0,totalR410aCo2=0,totalR507=0,totalR507Co2=0,total508B=0,totalR508BCo2=0;
                            for (var x of company.airConditioning) {
                                totalHCFC = totalHCFC + parseFloat(x.totalHCFC); 
                                totalR22 = totalR22 + parseFloat(x.totalR22); 
                                totalCO2 = totalCO2 + parseFloat(x.totalCO2); 
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
                                    totalHCFC:totalHCFC,
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
                                    totalHCFC:totalHCFC,
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
        }
    });
};

module.exports = airConditioningController;