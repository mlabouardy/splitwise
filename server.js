var express=require('express');
var session = require('express-session');
var mongoose=require('mongoose');
var bodyParser = require('body-parser');
var constants=require('./constants');
var port=3000;

var app=express();

mongoose.connect(constants.DATABASE_HOST);

app.use(session({secret: 'alzej6a4dae846a21azr8zeg894da',
				 saveUninitialized: true,
				 resave: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./api')(app);

app.listen(port, function(){
	console.log('Listening to port '+port);
});