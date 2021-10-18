'use strict'
var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController');

/* GET users listing. */
router.get('/create', function(req, res){
    res.render('../views/users/NewUser');
});
router.post('/save', userController.save);

module.exports = router;

