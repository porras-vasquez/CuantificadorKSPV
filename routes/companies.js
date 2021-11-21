'use strict'
var express = require('express');
var router = express.Router();
const companyController = require('../controllers/CompanyController');
const passport = require('passport');
const isAuthenticated= require('../helpers/auth');
/* GET users listing. */
router.get('/createCompany', isAuthenticated,function(req, res) {
    res.render('../views/company/NewCompany');
});

router.post('/saveElectricity/:id',isAuthenticated, companyController.addElectricity);
router.get('/searchCompany/:id',isAuthenticated, companyController.search);
router.get('/showCompany', isAuthenticated,isAuthenticated,companyController.list);
router.get('/showCompany2',isAuthenticated, companyController.list2);
router.post('/saveCompany', isAuthenticated,companyController.save);
router.post('/deleteCompany/:id', isAuthenticated,companyController.delete);
router.post('/updateCompany/:id',isAuthenticated, companyController.update);
module.exports = router;