'use strict'
var express = require('express');
var router = express.Router();
const companyController = require('../controllers/CompanyController');
const passport = require('passport');
/* GET users listing. */
router.get('/create', function(req, res) {
    res.render('../views/companies/NewCompany');
});
router.get('/principal', function(req, res) {
    res.render('../views/login');
});
router.post('/principal', passport.authenticate('local-singup', {
    succesRedirect: '/create',
    failureRedirect: '/principal',
    passReqToCallback: true
}));
router.get('/searchCompany/:id', companyController.search);
router.get('/showCompany', companyController.list);
router.post('/saveCompany', companyController.save);
router.post('/deleteCompany/:id', companyController.delete);
router.post('/updateCompany/:id', companyController.update);
module.exports = router;