'use strict' 
const express = require('express');
const router = express.Router();
const fuelsAndOilController = require('../controllers/FuelsAndOilController');
const passport = require('passport');
const isAuthenticated= require('../helpers/auth');
/* GET gases listing. */
router.get('/createFuelsAndOil', function(req, res) {
    res.render('../views/fuelsAndOil/NewFuelsAndOil');
});
router.get('/fuelsAndOilsearchcompany/:id', /**/isAuthenticated, fuelsAndOilController.searchCompany);
router.get('/fuelsAndOilShow/:id', /**/isAuthenticated, fuelsAndOilController.list, (req, res) =>{
    return res.json("all fuelandoil sent"); 
});
router.get('/searchFuelsAndOil/:id',/**/ isAuthenticated, fuelsAndOilController.search);

router.post('/saveFuelsAndOil/:id',/**/isAuthenticated, fuelsAndOilController.save);
router.post('/updateFuelsAndOil/:id',/**/ isAuthenticated, fuelsAndOilController.update);
router.post('/deleteFuelsAndOil/:id/:comp/:fue',/**/ isAuthenticated, fuelsAndOilController.delete);
module.exports = router;