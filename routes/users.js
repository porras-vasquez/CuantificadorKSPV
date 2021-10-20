'use strict'
var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController');
const passport = require('passport');
/* GET users listing. */
router.get('/create', function(req, res) {
    res.render('../views/users/NewUser');
});
router.get('/principal', function(req, res) {
    res.render('../views/login');
});
router.post('/principal', passport.authenticate('local-singup', {
    succesRedirect: '/create',
    failureRedirect: '/principal',
    passReqToCallback: true
}));
router.get('/search/:id', userController.search);
router.get('/show', userController.list);
router.post('/save', userController.save);
router.post('/delete/:id', userController.delete);
router.post('/update/:id', userController.update);
module.exports = router;