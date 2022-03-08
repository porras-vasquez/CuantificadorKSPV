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
router.post('/saveFuelsAndOil/:id',isAuthenticated, fuelsAndOilController.save);
router.get('/fuelsAndOilShow/:id', isAuthenticated, fuelsAndOilController.list);
router.get('/searchFuelsAndOil/:id', isAuthenticated, fuelsAndOilController.search);
router.post('/updateFuelsAndOil/:id', isAuthenticated, fuelsAndOilController.update);
router.post('/deleteFuelsAndOil/:id/:comp', isAuthenticated, fuelsAndOilController.delete);
module.exports = router;