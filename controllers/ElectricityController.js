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
    Electricity.find({}).exec(function(err, electricities) {
        if (err) { console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/electricity/AllElectricities', { electricities: electricities });

    });

};

electricityController.search = function(req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function(err, electricity) {
        if (err) { console.log('Error: ', err); return; }


        res.render('../views/electricity/search', { electricity: electricity });
    });

};

electricityController.edit = function(req, res) {
    Electricity.findOne({ _id: req.params.id }).exec(function(err, electricity) {
        if (err) { console.log("Error:", err); return; }

        res.render('../views/electricity/search', { electricity: electricity });

    });
};

/*electricityController.save = function(req, res) {
    let body = req.body;
    let elect = new Electricity(body);

    elect.save(function(err) {
        if (err) {
            return res.json({
                success: false,
                msj: 'No se pudo registrar',
                err
            });
        } else {
            res.json({
                success: true,
                msj: 'Se registró con éxito'
            });
        }
    });
};*/

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
                    return res.json({
                        success: false,
                        msj: 'No se pudo agregar el medidor',
                        err
                    });
                } else {
                    return res.json({
                        success: true,
                        msj: 'Se agregó correctamente el medidor'
                    });
                }
            }
        )
    } else {
        return res.json({
            success: false,
            msj: 'No se pudo agregar el medidor, por favor verifique que el _id sea correcto'
        });
    }
};



electricityController.delete = function(req, res) {

    Electricity.remove({ _id: req.params.id }, function(err) {

        if (err) { console.log('Error: ', err); return; }

        console.log("deleted!");
        res.redirect("/electricities/showElectricity/");

    });

};
module.exports = electricityController;