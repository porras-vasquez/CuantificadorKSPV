var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/navbar', function(req, res) {
    res.render('../views/navbar');
});
module.exports = router;