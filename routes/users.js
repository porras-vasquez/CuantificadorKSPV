'use strict'
var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController');
const passport = require('passport');
const isAuthenticated= require('../helpers/auth');

/* GET users listing. */
router.get('/create', isAuthenticated,function(req, res) {
    res.render('../views/users/NewUser');
});

  
router.get('/search/:id', userController.search);
router.get('/show', userController.list);
router.get('/show2', userController.list2); //No eficiente, hay que ver que hacemos mas adelante
router.post('/save', userController.save);
router.post('/delete/:id', userController.delete);
router.post('/update/:id', userController.update);

module.exports = router;