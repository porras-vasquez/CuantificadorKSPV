'use strict' 
var express = require('express');
var router = express.Router();
const gasesController = require('../controllers/GasesController');
const passport = require('passport');
const isAuthenticated= require('../helpers/auth');
/* GET electricities listing. */
router.get('/createGases',isAuthenticated, function(req, res) {
    res.render('../views/gaseslp/NewGas');
});
router.post('/saveGas/:id', isAuthenticated, gasesController.save);
module.exports = router; 