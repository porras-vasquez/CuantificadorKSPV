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
router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/users/show',
    failureRedirect: '/users/principal',
    failureFlash: true
  }));
  
router.get('/search/:id', userController.search);
router.get('/show', userController.list);
router.get('/show2', userController.list2); //No eficiente, hay que ver que hacemos mas adelante
router.post('/save', userController.save);
router.post('/delete/:id', userController.delete);
router.post('/update/:id', userController.update);
module.exports = router;