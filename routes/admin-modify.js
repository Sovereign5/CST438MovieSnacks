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

    let sql = `UPDATE items
                SET unitsleft = ?, 
                price = ?, 
                description = ?
                      
                WHERE itemname = ?`;


    let params = [req.body.uleft, req.body.cost, req.body.desc, req.body.sname];
    db.query(sql, params, function(error, results) {
        if (error) throw error;
    });
    db.end();
    var snacksList = await getSnackList();
    res.render('admin', {"snacks": snacksList}); // req.session.user
});

router.get('/admin-delete', async function(req, res) {
    const db = dbConnection();
    db.connect(function(err) {
    if (err) {
        console.log('error when connecting to db:', err);
    }
});
        
    let sql = 'DELETE FROM items WHERE itemname = ?';
    let params = [req.body.sname];
    db.query(sql, params, function(error, results) {
    if (error) throw error;
    });
    db.end();
    var snacksList = await getSnackList();
    res.render('admin', {"snacks": snacksList}); // req.session.user
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
    return new Promise(function(resolve, reject) {
        let stmt = "SELECT * FROM items";
        db.query(stmt, function(error, results) {
            if (error) throw error;
            db.end();
            resolve(results);
        });
    });
}

module.exports = router;
