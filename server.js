var express=require('express'),
	session = require('express-session'),
    mongoose=require('mongoose'),
    bodyParser = require('body-parser'),
    path= require('path'),
    constants=require('./constants'),
    api=require('./api'),
    app=express();

app.set('port',3000);

mongoose.connect(constants.DATABASE_HOST);

var config={
	secret: 'alzej6a4dae846a21azr8zeg894da',
	saveUninitialized: true,
	resave: true
};

app.use(session(config));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
api(app);

app.listen(app.get('port'), function(){
	console.log('Listening to port '+app.get('port'));
});
