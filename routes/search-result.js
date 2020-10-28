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
    let sql = "SELECT * FROM items";
    //console.log(req);
    var params = [req.body.urlSearch]

    db.query(sql, params, function(error, results) {
        // select item from results based on query
        //CODE:
        var searchInput = req.body.input1
        var result = ""
        console.log(results)
        for (i = 0; i < results.length; i++) {
            if (results[i].itemname == searchInput) {
                result = results[i]
                console.log(result)
                break;
            }
        }
        console.log(searchInput)
        if (error) throw error;
        res.render('search-result', {snack: result, searchInput : searchInput});
    });
    db.end();
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
