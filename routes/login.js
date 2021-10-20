var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/principal', function(req, res) {
    res.render('../views/login');
});

module.exports = router;