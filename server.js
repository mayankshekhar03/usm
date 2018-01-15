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
      database = db.db('usm'); 
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

//HANDLING NEW LONG URLS
app.get('/', function(req, res){
  if(req.query.longurl == undefined) res.render('home');
  else{
    console.log(req.query.longurl); //url to be shortened
    var lu = req.query.longurl;
    var urls = database.collection('urls');
    var count=0;
    urls.find().toArray(function(err, docs){
      if(err) throw err;
      for(var i = 0;i<docs.length;i++){
        if(count<(docs[i].su+0)){count = docs[i].su+0;}
      }
      var obj  = {lu: lu, su: ++count};
      urls.insert(obj, function(err, res){
        if(err) throw err;
      });
      var apiobj = {long_url: obj.lu, short_url: "usm.glitch.me/"+obj.su};
      res.send(apiobj);
      });
  }
});

//HANDLING REQUEST TO SHORT URLS
app.get('/:su', function(req, res){
  var su = req.params.su;
  var urls = database.collection('urls');
  urls.find({
      su: { $eq: +su }
  }).toArray(function(err, docs){
      if(err){
        res.send("<p>No such short url exists!</p>");
      }else{
        if(docs.length != 0){
          res.redirect(docs[0].lu);
        }else{
          res.send("<p>No such short url exists!</p>");
        }
      }
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
