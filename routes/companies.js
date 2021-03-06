'use strict'
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/CompanyController');
const passport = require('passport');
const isAuthenticated= require('../helpers/auth');
/* GET users listing. */
router.get('/createCompany', /*isAuthenticated,*/ function(req, res) {
    res.render('../views/company/NewCompany');
});

router.get('/searchCompany/:id', /**/ isAuthenticated, companyController.search);
router.get('/showCompany', /**/isAuthenticated, companyController.list);
router.get('/emissions/:comp',isAuthenticated, companyController.renderPageAllEmissions);
//router.get('/showCompany2',isAuthenticated, companyController.list2);

router.post('/saveCompany', /**/isAuthenticated, companyController.save);
router.get('/deleteCompany/:id', /**/isAuthenticated, companyController.delete);
router.post('/updateCompany/:id', /**/isAuthenticated, companyController.update);
module.exports = router;