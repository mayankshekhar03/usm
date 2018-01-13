var express = require('express');
var exphbs  = require('express-handlebars');
var path    = require('path');
const bodyParser = require('body-parser');

var app     = express();
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
