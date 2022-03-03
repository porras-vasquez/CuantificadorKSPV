'use strict' 
var express = require('express');
var router = express.Router();
const fuelsAndOilController = require('../controllers/FuelsAndOilController');
const passport = require('passport');
const isAuthenticated= require('../helpers/auth');
/* GET gases listing. */
router.get('/createFuelsAndOil', function(req, res) {
    res.render('../views/fuelsAndOil/NewFuelsAndOil');
});
router.get('/fuelsAndOilsearchcompany/:id',isAuthenticated, fuelsAndOilController.searchCompany);
router.post('/saveFuelsAndOil/:id', fuelsAndOilController.save);
//router.get('/gasesshow/:id', isAuthenticated, gasesController.list);
module.exports = router;