'use strict' 
var express = require('express');
var router = express.Router();
const AirConditioningController = require('../controllers/AirConditioningController');
const isAuthenticated= require('../helpers/auth');
/* GET gases listing. */
router.get('/createAirConditioning',isAuthenticated, function(req, res) {
    res.render('../views/airConditioning/NewAirConditioning');
});
router.get('/airConditioningSearchcompany/:id', AirConditioningController.searchCompany);
router.get('/airConditioningShow/:id', AirConditioningController.list);
router.get('/searchAirConditioning/:id', AirConditioningController.search);

router.post('/updateAirConditioning/:id', AirConditioningController.update);
router.post('/saveAirConditioning/:id', AirConditioningController.save);
router.post('/deleteAirConditioning/:id/:comp', AirConditioningController.delete);
module.exports = router;