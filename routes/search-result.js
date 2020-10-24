var express = require('express');
var router = express.Router();
var mysql = require("mysql");

router.get('/',  function(req, res, next) {
    res.render('search-result');
});

router.post('/', async function(req, res, next) {
    const db = dbConnection();
    db.connect(function(err) {
    if (err) {
        console.log('error when connecting to db:', err);
        }
    });
    var params = [req.body.search]
    let sql = "SELECT * FROM items WHERE itemId = ?";
    db.query(sql, params, function(error, results) {
        if (error) throw error;
    });
    var snacksList = await getSnackList();
    db.end();
    res.render('search-result', snacksList);
});

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

function getSnackList() {
    const db = dbConnection();
    db.connect(function(err) {
      if (err) {
          console.log('error when connecting to db:', err);
      }
    });
}

module.exports = router;
