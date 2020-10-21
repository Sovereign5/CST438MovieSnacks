var express = require('express');
var router = express.Router();
var mysql = require("mysql");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('productDetailsPage', { title: 'Express' });
});

router.post('/', async function(req, res, next) {
    // let userLoggedIn = await validateLogin(req.body.username, req.body.password);
    // console.log(userLoggedIn);
    // console.log();
    // if(userLoggedIn.length) {
    //     req.session.authenticated = true;
    //     req.session.user = req.body.username;
    //     res.redirect("landingPage");
    //     return;
    //  }
    res.render('productDetailsPage');
});

module.exports = router;
