<<<<<<< HEAD
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('signup', { title: 'Express' });
});

module.exports = router;
=======
var express = require('express');
var router = express.Router();
var mysql = require("mysql");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('signup', { title: 'Express' });
});

router.post('/', async function(req, res, next) {
    console.log(req.body.username + '\n');
    let userSignedUp = await checkUsernameAvailability(req.body.username);
    if(userSignedUp.length) {
        res.render('signup', {usernameAlreadyTaken:true});
    }
    db.query('INSERT INTO users (username, password) VALUES (?,?)', [req.body.username, req.body.password], function(error, results){
        if (error) throw error;
        res.render('login');
    });
});

function checkUsernameAvailability(username) {
    let stmt = 'SELECT * FROM users WHERE username=?';
    let data = [username];
    return new Promise(function(resolve, reject) {
        console.log(db + '\n');
        db.query(stmt, data, function(error, results) {
            if (error) throw error;
            console.log(results);
            resolve(results);
     }) 
  });
}

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
>>>>>>> Created Login and Sign Up Pages
