var express = require('express');
var exphbs  = require('express-handlebars');
var path    = require('path');
const bodyParser = require('body-parser');
var mongodb = require('mongodb').MongoClient;

//database connection
var database;

new mongodb('mongodb://ds251807.mlab.com:51807/usm', {
    auth: {
       user: 'mayankshekhar03',
       password: 'sharda#1',
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
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
