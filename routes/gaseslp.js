'use strict' 
const express = require('express');
const router = express.Router();
const gasesController = require('../controllers/GasesController');
const passport = require('passport');
const isAuthenticated= require('../helpers/auth');
//RENDERIZAN PÁGINAS
router.get('/createGases', /**/ isAuthenticated, function(req, res) {res.render('../views/gaseslp/NewGas');});
router.get('/gasessearchcompany/:id', isAuthenticated, gasesController.searchCompany);
router.get('/editGases/:id', /**/isAuthenticated, gasesController.search);
router.get('/gasesshow/:id', isAuthenticated, gasesController.list);

/*router.get('/gaspagination/:page', isAuthenticated, gasesController.pagination);*/

//ELIMINAN, GUARDAN O ACTUALIZAN DATOS
router.post('/saveGas/:id', /**/isAuthenticated, gasesController.save);
router.post('/updateGases/:id', /**/isAuthenticated, gasesController.update);
router.post('/deleteGases/:id/:comp', /**/isAuthenticated, gasesController.delete);
module.exports = router; 