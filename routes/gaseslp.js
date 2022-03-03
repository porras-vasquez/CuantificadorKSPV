'use strict' 
var express = require('express');
var router = express.Router();
const gasesController = require('../controllers/GasesController');
const passport = require('passport');
const isAuthenticated= require('../helpers/auth');
/* GET gases listing. */
router.get('/createGases',isAuthenticated, function(req, res) {
    res.render('../views/gaseslp/NewGas');
});
router.get('/gasessearchcompany/:id', isAuthenticated, gasesController.searchCompany);
router.post('/saveGas/:id', isAuthenticated, gasesController.save);
router.get('/gasesshow/:id', isAuthenticated, gasesController.list);
router.post('/updateGases/:id', isAuthenticated, gasesController.update);
router.get('/searchGases/:id', isAuthenticated, gasesController.search);
router.post('/deleteGases/:id/:comp', isAuthenticated, gasesController.delete);
module.exports = router; 