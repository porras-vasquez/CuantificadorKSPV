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

router.get('/electricity/:id',isAuthenticated, electricityController.searchCompany);
router.get('/searchElectricity/:id', isAuthenticated, electricityController.search);
router.get('/electricities/:id', isAuthenticated, electricityController.list);
router.get('/electricities2/:id', isAuthenticated, electricityController.list2);
router.post('/updateElectricity/:id', isAuthenticated, electricityController.update);
router.post('/saveElectricity/:id', isAuthenticated, electricityController.save);
router.post('/deleteElectricity/:id/:comp',isAuthenticated, electricityController.delete);
router.post('/addMeter/:_id/:comp', isAuthenticated, electricityController.addMeter);
router.post('/updateMeter/:elec/:meter', isAuthenticated, electricityController.updateMeter);
router.get('/newMeter/:id/:comp', isAuthenticated, electricityController.meter);
router.get('/editMeter/:elec/:meter', isAuthenticated, electricityController.editMeter);
router.post('/deleteMeter/:elec/:meter', isAuthenticated, electricityController.deleteMeter);
router.get('/meters/:id', isAuthenticated, electricityController.getMeters);
//router.post('/updateElectricity/:id', electricityController.update);
module.exports = router; 