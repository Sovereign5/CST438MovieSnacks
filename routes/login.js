var express = require('express');
var router = express.Router();
var mysql = require("mysql");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.post('/', async function(req, res, next) {
    console.log(req.body.username + '\n');
    let userLoggedIn = await validateLogin(req.body.username, req.body.password);
    if(userLoggedIn.length) {
        res.render('main');
    }
    res.render('login', {invalidLogin:true});
});

function validateLogin(username, password) {
  let stmt = 'SELECT * FROM users WHERE username=? and password=?';
  let data = [username, password];
  return new Promise(function(resolve, reject) {
     console.log(db + '\n');
     db.query(stmt, data, function(error, results) {
         if (error) throw error;
         console.log(results);
         resolve(results);
     }) 
  });
};


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
