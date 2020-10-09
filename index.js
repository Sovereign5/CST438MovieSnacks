//imports
const express = require("express");
// const mysql   = require("mysql");
const app = express();
const port = 8888;

// Set Views
app.set('views', './views');

//Static files
app.set("view engine", "ejs");
//app.use(express.static("public")); //folder for img, css, js
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

var loginRouter = require('./routes/login');

//Set Views
app.get('',(req,res) => {
    res.render('main', { text: 'This is EJS'})
})

app.get('/login',(req,res) => {
    res.render('login', { text: 'Login Noggin Froggin'})
})

//starting server

var listener = app.listen(port, () =>
    console.log('Listening on port ' + listener.address().port) //Listening on port 8888
);
