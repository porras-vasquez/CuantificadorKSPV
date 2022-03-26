'use strict'
var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController');
const passport = require('passport');
const isAuthenticated= require('../helpers/auth');

/* GET users listing. */
router.get('/create', isAuthenticated,isAuthenticated,(req, res) =>{
    res.render('../views/users/NewUser');
  //  return res.json("all users sent");
});
router.get('/principal', function(req, res) {
    res.render('../views/login');
});
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/search/:id',isAuthenticated, userController.search);
router.get('/show',isAuthenticated, userController.list, (req, res) =>{
    return res.json("all users sent"); 
});
router.post('/save',isAuthenticated, userController.save);
router.post('/delete/:id',isAuthenticated, userController.delete);
router.post('/update/:id',isAuthenticated, userController.update);

module.exports = router;