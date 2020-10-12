var express = require('express');
var router = express.Router();
var mysql = require("mysql");

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("hello");
    let stmt = "SELECT * FROM items";
    db.query(stmt, function(error, results) {
        if (error) throw error;
        res.render('landingPage', {snacks: results, username: req.session.user}); // req.session.user
    });
});

router.post('/', function(req, res, next) {
    // console.log(req.body.username + '\n');
    // let userLoggedIn = await validateLogin(req.body.username, req.body.password);
    // if(userLoggedIn.length) {
    //     res.render('landingPage'); // previously passed in 'main'
    // }
    res.render('landingPage', {invalidLogin:true});
});
// Product details page up above

function dbConnection(){
    let conn = mysql.createConnection({
                 host: "localhost",
                 user: "username",
             password: "password",
             database: "snackDB"
        });

return conn;
}

const db = dbConnection();

db.connect(function(err) {
    if (err) {
        console.log('error when connecting to db:', err);
    }
});

module.exports = router;