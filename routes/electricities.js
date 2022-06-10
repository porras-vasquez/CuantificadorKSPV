'use strict'
const express = require('express');
const router = express.Router();
const electricityController = require('../controllers/ElectricityController');
const passport = require('passport');
const isAuthenticated= require('../helpers/auth');
/* GET electricities listing. */
router.get('/createElectricity',isAuthenticated, function(req, res) {
    res.render('../views/electricity/NewElectricity');
});

//RENDERIZAN PÁGINAS
router.get('/electricity/:comp',isAuthenticated, electricityController.renderPageNewElectricity);
router.get('/editElectricity/:id',isAuthenticated, electricityController.renderPageEditElectricity);
router.get('/electricities/:comp',isAuthenticated, electricityController.renderPageAllElectricites);
router.get('/newMeter/:id/:comp', isAuthenticated, electricityController.renderPageNewMeter);
router.get('/editMeter/:elec/:meter',isAuthenticated, electricityController.renderPageEditMeter);
router.get('/meters/:id',isAuthenticated, electricityController.renderPageAllMeters);

//ELIMINAN, GUARDAN O ACTUALIZAN DATOS
router.post('/updateElectricity/:id', isAuthenticated, electricityController.update);
router.post('/saveElectricity/:comp',isAuthenticated, electricityController.save);
router.post('/deleteElectricity/:id/:comp',isAuthenticated, electricityController.delete);
router.post('/addMeter/:_id/:comp',isAuthenticated, electricityController.addMeter);
router.post('/updateMeter/:elec/:meter', isAuthenticated, electricityController.updateMeter);
router.post('/deleteMeter/:elec/:meter',isAuthenticated, electricityController.deleteMeter);
//router.post('/updateElectricity/:id', electricityController.update);
module.exports = router; 