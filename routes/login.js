var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

module.exports = router;

function checkUsername(username){
    let stmt = 'SELECT * FROM users WHERE username=?';
    return new Promise(function(resolve, reject){
        connection.query(stmt, [username], function(error, results){
            if(error) throw error;
            resolve(results);
        });
    });
}

function checkPassword(password, hash){
    return new Promise(function(resolve, reject){

    });
}