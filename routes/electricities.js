'use strict'
var express = require('express');
var router = express.Router();
const electricityController = require('../controllers/ElectricityController');
const passport = require('passport');
/* GET electricities listing. */
router.get('/createElectricity', function(req, res) {
    res.render('../views/electricity/NewElectricity');
});
router.get('/principal', function(req, res) {
    res.render('../views/login');
});

router.get('/searchElectricity/:id', electricityController.search);
router.get('/showElectricity', electricityController.list);
router.post('/saveElectricity', electricityController.save);
router.post('/deleteElectricity/:id', electricityController.delete);
router.post('/addMeter/:_id', electricityController.addMeter);
//router.post('/updateElectricity/:id', electricityController.update);
module.exports = router; 