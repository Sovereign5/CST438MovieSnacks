var express = require('express');
var router = express.Router();
var mysql = require("mysql");

/* GET home page. */
router.get('/', function(req, res, next) {
    const db = dbConnection();
    db.connect(function(err) {
    if (err) {
        console.log('error when connecting to db:', err);
    }
});
    //res.render('productDetailsPage', { title: 'Express' });
    let stmt = "SELECT * FROM items where itemId=?";
    let data = [req.query.snackID];
    db.query(stmt, data, function(error, results) {
        if (error) throw error;
        console.log(results);
        res.render('admin-modify', {snacks: results[0]}); // req.session.user
    });
    db.end();
});

router.post('/', async function(req, res) {
    const db = dbConnection();
    db.connect(function(err) {
    if (err) {
        console.log('error when connecting to db:', err);
        }
    });

    let stmt = "SELECT * FROM items where itemname=?";
    let data = [req.body.itemname];
    console.log(data);
    var resultsAnswer;
    db.query(stmt, data, function(error, results) {
        if (error) throw error;
        console.log(results);
        resultsAnswer = results;
    });


    // let stmt2 = `UPDATE items
    //             SET unitsleft = ?,
    //             price = ?,
    //             description = ?,

    //             WHERE itemname = ?`;


               let sql = `UPDATE items
                      SET unitsleft = ?, 
                      price = ?, 
                      description = ?
                      
                      WHERE itemname = ?`;

    //console.log("TESTING TESTING TESTING TESTING" + req.body.itemId);

    let params = [req.body.uleft, req.body.cost, req.body.desc, req.body.sname];
    console.log(params);
    db.query(sql, params, function(error, results) {
        if (error) throw error;
    });
    db.end();
    res.render('admin-modify', {snacks: resultsAnswer}); // req.session.user
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

module.exports = router;
