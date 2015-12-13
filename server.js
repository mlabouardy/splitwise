var express=require('express');
var port=3000;

var app=express();

app.get('/',function(req,res){
	res.send('Hello');
});

app.listen(port, function(){
	console.log('Listening to port '+port);
});