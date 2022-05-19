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
router.get('/airConditioningShow/:id', isAuthenticated, AirConditioningController.list);
router.get('/searchAirConditioning/:id', isAuthenticated, AirConditioningController.search);

router.post('/updateAirConditioning/:id', isAuthenticated, AirConditioningController.update);
router.post('/saveAirConditioning/:id', isAuthenticated, AirConditioningController.save);
router.post('/deleteAirConditioning/:id/:comp',/**/ isAuthenticated, AirConditioningController.delete);
module.exports = router; 