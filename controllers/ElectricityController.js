'use strict'
require('../connection');
const Electricity = require("../models/Electricity");
const Company = require("../models/Company");
var electricityController = {};


electricityController.save = async function(req, res) {
    var electricity = new Electricity(req.body);
    var comp = await Company.findById(req.params.id);
    electricity.company = comp;
    //console.log(comp);
    await electricity.save(function(err, elec) {
        console.log(elec);
        if (err) { 
            res.render('../views/electricity/NewElectricity', { message : "error", company: elec.company._id });
        }
        else{
            comp.electricidad.push(electricity);
            comp.save(function(err, company){
                if (err) { 
                    res.render('../views/electricity/NewElectricity', { message : "error", company: company });
                }
                else{
                    res.render('../views/electricity/NewElectricity', { message : "success", company: company });
                }
            });
        }
    });
};

electricityController.searchCompany = function (req, res) {
    Company.findOne({ _id: req.params.id }).exec(function (err, company) {
        if (err) { console.log('Error: ', err); return; }
        res.render('../views/electricity/NewElectricity', { company: company });
    });
};

electricityController.list = function(req, res) {
    Company.findOne({ _id: req.params.id }).populate('electricidad').exec(function (err, company) {
        if (err) { 
            res.render('../views/electricity/AllElectricities', { electricities: company.electricidad });
        }else{
            res.render('../views/electricity/AllElectricities', { electricities: company.electricidad });
        }
    });
};

electricityController.list2 = function (req, res) {
    Company.findOne({ _id: req.params.id }).populate('electricidad').exec(function (err, company) {
        if (err) { 
            res.render('../views/electricity/AllElectricities', { electricities: company.electricidad });
        }else{
            res.render('../views/electricity/AllElectricities', { electricities: company.electricidad });
        }
    });
};

electricityController.search = function(req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function(err, electricity) {
        if (err) { 
            console.log('Error: ', err);        
            res.render('../views/electricity/search', { electricity: electricity, company: electricity.company }); 
        }else{
            res.render('../views/electricity/search', { electricity: electricity, company: electricity.company });
        }
    });

};

electricityController.meter = function(req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function(err, electricity) {
        if (err) { console.log("Error:", err); return; }
        res.render('../views/electricity/NewMeter', { electricity: electricity });
    });
};

electricityController.getMeters = function(req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function(err, electricity) {
        if (err) { 
            res.render('../views/electricity/AllMeters', { electricity: electricity});
        }else{
            res.render('../views/electricity/AllMeters', { electricity: electricity});
        }

    });
};

/*electricityController.updateMeter = function(req, res){
    Electricity.findByIdAndUpdate(req.params.id, {
        $set: {
            medidor: req.body
        }
    }, { new: true },
        function (err, electricity) {
            if (err) {
                console.log('Error: ', err);
                //res.redirect('/electricities/electricities2');
                res.send(err);
            }
            res.send(electricity.medidor);
            //res.redirect('/electricities/electricities2');
    });
};*/

electricityController.update = function (req, res) {
    Electricity.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            unidad_medida: req.body.unidad_medida,
            fuente_reporte: req.body.fuente_reporte,
            ultima_update: req.body.ultima_update,
            observacion: req.body.observacion,
         
           
        }
    }, { new: true },
        function (err, electricity) {
            if (err) {
                console.log('Error: ', err);
                
                Company.findOne({ _id: electricity.company }).populate('electricidad').exec(function (error, company) {
                    if (error) { 
                        res.render('../views/electricity/AllElectricities', { message: "error", electricities: company.electricidad });
                    }else{
                        res.render('../views/electricity/AllElectricities', {message: "success", electricities: company.electricidad });
                    }
                });
            }else{
                Company.findOne({ _id: electricity.company }).populate('electricidad').exec(function (error, company) {
                    if (error) { 
                        res.render('../views/electricity/AllElectricities', { message: "error", electricities: company.electricidad });
                    }else{
                        res.render('../views/electricity/AllElectricities', { message: "success", electricities: company.electricidad });
                    }
                });
            }
        });
};

electricityController.addMeter = function(req, res) {
    if (req.params._id) {
        Electricity.updateOne({ _id: req.params._id }, {
                $push: {
                    'medidor': {
                        nrc: req.body.nrc,
                        type: req.body.type,
                        medida: req.body.medida,
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
                        diciembre: req.body.diciembre
                    }
                }
            },
           (error) => {
                if (error) {
                    res.render('../views/electricity/NewMeter', { electricity: req.params._id, message : "error" });
                } else {
                    res.render('../views/electricity/NewMeter', { electricity: req.params._id, message : "success" });
                }
            }
        )
    } else {
        res.render('../views/electricity/NewMeter', { electricity: req.params._id, message : "error" });
    }
};

electricityController.delete = function(req, res) {

    Electricity.deleteOne({ _id: req.params.id }, function(err) {

        if (err) { console.log('Error: ', err); return; }

        console.log("deleted!");
        res.redirect("/electricities/electricities2");

    });

};
module.exports = electricityController;