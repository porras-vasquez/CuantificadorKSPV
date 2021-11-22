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
router.get('/electricities', isAuthenticated, electricityController.list);
router.post('/saveElectricity/:id', isAuthenticated, electricityController.save);
router.post('/deleteElectricity/:id',isAuthenticated, electricityController.delete);
router.post('/addMeter/:_id', isAuthenticated, electricityController.addMeter);
//router.post('/updateElectricity/:id', electricityController.update);
module.exports = router; 