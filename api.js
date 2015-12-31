var User=require('./models/user.js');
var mail="";

module.exports=function(app){
	
	app.post('/addGroup', function (req, res) {
		console.log("=== addGroup ===");	
		console.log("mailgroup: "+ mail);
		console.log("groupname: "+ req.body.name)
		//console.dir(req.body)	
		User.findOne({email : mail},function (err,user){
			if(err) throw err;
			var id= user.groups.length
			user.groups.push({"id":id, "name":req.body.name});
			user.save(); 
			res.send('{"success":true}')
		})

	})

	app.post('/register',function (req,res){
		var user = new User()

		user.email = req.body.email
		user.password = req.body.password
		user.firstName = req.body.firstName
		user.lastName = req.body.lastName
		//mail= user.email;
		user.save(function(err){
			if(err){
				var errorMessages = []
				for (field in err.errors) {
		            errorMessages.push(err.errors[field].message) 
		        }
		        res.status(500).send(errorMessages)
			}
			else{
				res.send('{"success":true}')
			}
		})
	})


	app.post('/login', function (req, res) {
		console.log("==== login ===")
		User.findOne({email : req.body.email},function (err,user){
			
			if (!user){
				res.status(500).send("Invalid email or password")
			}
			else{
				if (req.body.password === user.password){
					mail=req.body.email
					console.log("mail: "+mail)
					req.session.user = user
					res.send('/board')
				}else{
					res.status(500).send("Invalid email or password")
				}
			}
		})

	})

	app.get('/verify',function(req,res){
		if (req.session && req.session.user){
			User.findOne({email : req.session.user.email},function (err,user){
				if (!user){
					req.session.reset()
					res.status(500).send()
				}
				else{
					res.user = user
					res.status(200).send()
				}
			})
		}
		else{
			res.status(500).send()
		}
	});

	app.get('/logout',function(req,res){
		req.session.destroy()
		res.status(200).send('/')
	})

}