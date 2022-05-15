'use strict'
var express = require('express');
var router = express.Router();
const electricityController = require('../controllers/ElectricityController');
const passport = require('passport');
const isAuthenticated= require('../helpers/auth');
/* GET electricities listing. */
router.get('/createElectricity',isAuthenticated, function(req, res) {
    res.render('../views/electricity/NewElectricity');
});

//RENDERIZAN PÁGINAS
router.get('/electricity/:comp',isAuthenticated, electricityController.renderPageNewElectricity);
router.get('/editElectricity/:id', electricityController.renderPageEditElectricity);
router.get('/electricities/:comp', electricityController.renderPageAllElectricites, (req, res) =>{
    return res.json("all electricity sent"); 
});
router.get('/newMeter/:id/:comp', isAuthenticated, electricityController.renderPageNewMeter);
router.get('/editMeter/:elec/:meter', electricityController.renderPageEditMeter);
router.get('/meters/:id', electricityController.renderPageAllMeters);

//ELIMINAN, GUARDAN O ACTUALIZAN DATOS
router.post('/updateElectricity/:id', isAuthenticated, electricityController.update);
router.post('/saveElectricity/:comp', electricityController.save);
router.post('/deleteElectricity/:id/:comp', electricityController.delete);
router.post('/addMeter/:_id/:comp', electricityController.addMeter);
router.post('/updateMeter/:elec/:meter', isAuthenticated, electricityController.updateMeter);
router.post('/deleteMeter/:elec/:meter', electricityController.deleteMeter);
//router.post('/updateElectricity/:id', electricityController.update);
module.exports = router; 