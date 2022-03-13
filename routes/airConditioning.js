'use strict' 
var express = require('express');
var router = express.Router();
const AirConditioningController = require('../controllers/AirConditioningController');
const isAuthenticated= require('../helpers/auth');
/* GET gases listing. */
router.get('/createAirConditioning',isAuthenticated, function(req, res) {
    res.render('../views/airConditioning/NewAirConditioning');
});
router.get('/airConditioningSearchcompany/:id', isAuthenticated, AirConditioningController.searchCompany);
/*
router.get('/gasesshow/:id', isAuthenticated, AirConditionerController.list);
router.post('/updateGases/:id', isAuthenticated, AirConditionerController.update);
router.get('/searchGases/:id', isAuthenticated, AirConditionerController.search);
router.post('/deleteGases/:id/:comp', isAuthenticated, AirConditionerController.delete);*/
router.post('/saveAirConditioning/:id', isAuthenticated, AirConditioningController.save);
module.exports = router; 