'use strict'
var express = require('express');
var router = express.Router();
const electricityController = require('../controllers/ElectricityController');
const passport = require('passport');
/* GET electricities listing. */
router.get('/create', function(req, res) {
    res.render('../views/electricities/NewElectricity');
});
router.get('/principal', function(req, res) {
    res.render('../views/login');
});
router.post('/principal', passport.authenticate('local-singup', {
    succesRedirect: '/create',
    failureRedirect: '/principal',
    passReqToCallback: true
}));
router.get('/search/:id', electricityController.search);
router.get('/show', electricityController.list);
router.post('/save', electricityController.save);
router.post('/delete/:id', electricityController.delete);
router.post('/update/:id', electricityController.update);
module.exports = router;