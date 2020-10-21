var express = require('express');
var router = express.Router();
var mysql = require("mysql");

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session);
    req.session.destroy();
    
    res.redirect("/login");
});

module.exports = router;