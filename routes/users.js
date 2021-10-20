'use strict'
var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController');

/* GET users listing. */
router.get('/create', function(req, res) {
    res.render('../views/users/NewUser');
});
router.get('/shown/:id', userController.show);
router.get('/show', userController.list);
router.post('/save', userController.save);
router.post('/delete/:id', userController.delete);
module.exports = router;