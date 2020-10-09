var express = require('express');
var router = express.Router();
var app = express();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('main', { page:'login', menuID:'login' });
});

module.exports = router;