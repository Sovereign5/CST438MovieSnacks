var express = require('express');
var router = express.Router();
var mysql = require("mysql");

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session);
    res.render('login', { title: 'Express' }); // previously put login
});

router.post('/', async function(req, res, next) {
    let userLoggedIn = await validateLogin(req.body.username, req.body.password);
    console.log(userLoggedIn);
    console.log();
    if(userLoggedIn.length) {
        req.session.authenticated = true;
        req.session.user = req.body.username;
        res.redirect("landingPage");
        return;
     }
    res.render('login', {invalidLogin:true});
});

function validateLogin(username, password) {
  const db = dbConnection();
  db.connect(function(err) {
    if (err) {
        console.log('error when connecting to db:', err);
    }
});
  let stmt = 'SELECT * FROM users WHERE username=? and password=?';
  let data = [username, password];
  return new Promise(function(resolve, reject) {
     console.log(db + '\n');
     db.query(stmt, data, function(error, results) {
         if (error) throw error;
         console.log(results);
         resolve(results);
     }) 
     db.end();
  });
};


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

//const db = dbConnection();



module.exports = router;
