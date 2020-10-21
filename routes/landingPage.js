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
             host: 'gx97kbnhgjzh3efb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
                 user: 'cx6tbrdol6qyktv4',
             password: 'ch5yuk0579o1cvp9',
             database: 'n6uisw5co07k8u4o',
            //  port: '8888'
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