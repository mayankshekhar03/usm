var express = require('express');
var exphbs  = require('express-handlebars');
var path    = require('path');
const bodyParser = require('body-parser');
var mongodb = require('mongodb').MongoClient;

//database connection
var database;

new mongodb('mongodb://ds251807.mlab.com:51807/usm', {
    auth: {
       user: process.env.DB_USER,
       password: process.env.DB_PASS,
    }
}).connect(
    (err, db) => {
      if (err) return console.error(err);
      console.log('Database connected');
      database = db.db('foo'); 
});
//~database connection 

var app     = express();

//making staticfiles available
app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.render('home');
  console.log(req.query.longurl); //url to be shortened
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
