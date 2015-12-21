var user=require('./models/user');

module.exports=function(app){

	app.post('/register',function(req,res){
		var user = new User();

		user.email = req.body.email;
		user.password = req.body.password;
		user.firstName = req.body.firstName;
		user.lastName = req.body.lastName;

		user.save(function(err){
			if(err){
				var errorMessages = [];
				for (field in err.errors) {
		            errorMessages.push(err.errors[field].message); 
		        }
		        res.status(500).send(errorMessages);
			}
			else{
				res.send('/');
			}
		});
	});


	app.post('/login', function (req, res) {

		User.findOne({email : req.body.email},function (err,user){
			if (!user){
				res.status(500).send("Invalid email or password");
			}
			else{
				if (req.body.password === user.password){
					req.session.user = user;
					res.send('/board');
				}else{
					res.status(500).send("Invalid email or password");
				}
			}
		});

	});

	app.get('/verify',function(req,res){
		if (req.session && req.session.user){
			User.findOne({email : req.session.user.email},function (err,user){
				if (!user){
					req.session.reset();
					res.status(500).send();
				}
				else{
					res.user = user;
					res.status(200).send();
				}
			});
		}
		else{
			res.status(500).send();
		}
	});

	app.get('/logout',function(req,res){
		req.session.destroy();
		res.status(200).send('/');
	});

}