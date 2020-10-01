const express = require("express");
// const mysql   = require("mysql");
const app = express();
const session = require('express-session');


app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js
//app.use(express.urlencoded()); //use to parse data sent using the POST method
app.use(session({ secret: 'any word', cookie: { maxAge: 1000 * 60 * 5 }}));
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

// functions //


// function isAuthenticated(req, res, next){
//     if(!req.session.authenticated) res.redirect('/login');
//     else next();
// }

// function dbConnection(){

//    let conn = mysql.createConnection({
//                  host: "us-cdbr-iron-east-01.cleardb.net",
//                  user: "b7e06ef97d1c7b",
//              password: "08496ced",
//              database: "heroku_eeffc7f196aa5e6"
//        });

// return conn;

// }


//starting server
app.listen(process.env.PORT, process.env.IP, function(){
console.log("Express server is running...");
});

var listener = app.listen(8888, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});
