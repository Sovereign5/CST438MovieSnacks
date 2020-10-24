const express = require("express");
var mysql = require("mysql");
const app = express();
const session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

app.set("view engine", "ejs");
app.use(express.static("public")); //folder for img, css, js

app.set('views', path.join(__dirname, 'views'));

var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var logoutRouter = require('./routes/logout');
var landingPageRouter = require('./routes/landingPage');
var productDetailsRouter = require('./routes/productDetailsPage');
var searchResultRouter = require('./routes/search-result');
var adminRouter = require('./routes/admin');
var adminAddRouter = require('./routes/admin-add');
var adminModifyRouter = require('./routes/admin-modify');

app.use(bodyParser.urlencoded({extended:true})); //use to parse data sent using the POST method
app.use(session({ secret: 'any word', cookie: { maxAge: 1000 * 60 * 5 }, resave: true, saveUninitialized: true}));
app.use(function(req, res, next) {
   res.locals.isAuthenticated = req.session.authenticated;
   next();
});

app.get("/", async function(req, res){
    if (req.isAuthenticated) {
        console.log("AUTHENTICATED!");
    }
    res.render("main");
});//root

app.post('/views/login', async function(req, res) {
    console.log(req.body.username + '\n');
    let userLoggedIn = await validateLogin(req.body.username, req.body.password);
    if(userLoggedIn.length) {
        res.render('main');
    }
    res.render('login', {invalidLogin:true});
});

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/logout', logoutRouter);
app.use('/landingPage', landingPageRouter);
app.use('/productDetailsPage', productDetailsRouter);
app.use('/search-result', searchResultRouter);
app.use('/admin', adminRouter);
app.use('/admin-add', adminAddRouter);
app.use('/admin-modify', adminModifyRouter);
module.exports = app;

// functions //
function isAuthenticated(req, res, next){
     if(!req.session.authenticated) res.redirect('/login');
     else next();
}
//global.isAuthenticated = isAuthenticated();

// function dbConnection(){
//     let conn = mysql.createConnection({
//                  host: "localhost",
//                  user: "username",
//              password: "password",
//              database: "snackDB"
//         });

// return conn;
// }

app.post('/admin-delete', async function(req, res) {
    const db = dbConnection();
    db.connect(function(err) {
    if (err) {
        console.log('error when connecting to db:', err);
    }
});

    let sql = 'DELETE FROM items WHERE itemname = ?';
    let params = [req.query.name];
    console.log(req.query.name);
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


const db = dbConnection().connect();
global.db = db;

//starting server
app.listen(process.env.PORT, process.env.IP, function(){
console.log("Express server is running...");
});

var listener = app.listen(8888, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});
