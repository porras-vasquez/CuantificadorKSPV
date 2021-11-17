'use strict'
var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController');
const passport = require('passport');
//import { isAuthenticated } from "../helpers/auth";


router.get('/principal', function(req, res) {
    res.render('../views/login');
});
router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;