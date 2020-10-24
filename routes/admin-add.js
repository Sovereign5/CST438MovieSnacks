var express = require('express');
var router = express.Router();
var mysql = require("mysql");

router.get('/', function(req, res, next) {
	res.render('admin-add');
});



router.post('/', async function(req, res) {
    const db = dbConnection();
    db.connect(function(err) {
    if (err) {
        console.log('error when connecting to db:', err);
        }
    });
    let id = Math.floor(Math.random() * 1000) + 10;
    console.log("Random ID" + id);
    let sql = 'INSERT INTO items (itemId, itemlink, itemname, unitsleft, price, description) VALUES (?,?,?,?,?,?)'



    let params = [id, req.body.pic, req.body.pic, req.body.sname, req.body.uleft, req.body.cost, req.body.desc];
    console.log("PARAMS" + params);
    db.query(sql, params, function(error, results) {
        if (error) throw error;
    });
    db.end();
    var snacksList = await getSnackList();
    res.render('admin', {"snacks": snacksList}); // req.session.user
});






// Functions
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