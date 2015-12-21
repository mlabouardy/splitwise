var express=require('express');
var mongoose=require('mongoose');
var constants=require('./constants');
var port=3000;

var app=express();

mongoose.connect(constants.DATABASE_HOST);

app.get('/',function(req,res){
	res.send('Hello');
});

require('./api')(app);

app.listen(port, function(){
	console.log('Listening to port '+port);
});