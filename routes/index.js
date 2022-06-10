const express = require('express');
const router = express.Router();
const isAuthenticated= require('../helpers/auth');
/* GET home page. */
router.get('/',isAuthenticated, function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/navbar', function(req, res) {
    res.render('../views/navbar');
});
  
module.exports = router;