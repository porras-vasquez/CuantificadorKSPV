'use strict'
var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController');
const passport = require('passport');
const isAuthenticated= require('../helpers/auth');

/* GET users listing. */
router.get('/create', isAuthenticated,isAuthenticated,(req, res) =>{
    res.render('../views/users/NewUser');
});
router.get('/principal', function(req, res) {
    res.render('../views/login');
});
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/search/:id', userController.search);
router.get('/show', userController.list);
router.post('/save', userController.save);
router.post('/delete/:id', userController.delete);
router.post('/update/:id', userController.update);
/** Para realizar los test es necesario quitar 'isAuthenticated' para poder acceder a los metodos */
module.exports = router;