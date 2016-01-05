var User=require('./models/user.js');
var mongoose = require('mongoose');
var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
/*
Here we are configuring our SMTP Server details.
STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport("SMTP",{
service: "Gmail",
auth: {
user: "totodukamer@gmail.com",
pass: "abcDEF123456"
}
});

module.exports=function(app){
	app.get('/',function(req,res){
	console.log("=== / ===");
res.sendfile('public/friends_invite.html');
});
app.get('/send',function(req,res){
	console.log("=== sent ===");	
var mailOptions={
to : req.query.to,
subject : req.query.subject,
text : req.query.text
}
console.log(mailOptions);
smtpTransport.sendMail(mailOptions, function(error, response){
if(error){
console.log(error);
res.end("error");
}else{
console.log("Message sent: " + response.message);
res.end("sent");
}
});
});
	app.post('/profile', function (req, res) {
		console.log("=== profile ===");	
		console.log("session: "+ req.body.session);
		console.log("name: "+ req.body.firstname);
		//console.dir(req.body)	
		User.findOne({email : req.body.session},function (err,user){
			if(err) throw err;
			user.email = req.body.email
			user.password = req.body.password
			user.firstName = req.body.firstName
			user.lastName = req.body.lastName
			user.save(); 
			res.send('{"success":true}');
		});

	});
	app.post('/updateExpenses', function (req, res) {
		console.log("=== Expenses ===");	
		console.log("session: "+ req.body.session);
		console.log(req.body);
		//console.dir(req.body)	
		User.findOne({email : req.body.session},function (err,user){
			if(err) throw err;
			user.expenses = req.body.expenses;
			user.save(); 
			res.send('{"success":true}');
		});

	});
	app.post('/addBill', function (req, res) {
		console.log("=== addBill ===");	
		console.log("sessiongroup: "+ req.body.session);
		console.log("desc: "+ req.body.desc);
		console.log("price: "+ req.body.price);
		console.log("groupid: "+ req.body.groupid);
		
		var groupid = req.body.groupid;
		var query;
		var now = new Date(Date.now());
		var dd = now.getDate();
    	var mm = now.getMonth()+1; //January is 0!

    	var yyyy = now.getFullYear();
    	if(dd<10){
       	 dd='0'+dd
   		 } 
   		 if(mm<10){
      	  mm='0'+mm
   		 } 
   		 var today = dd+'/'+mm+'/'+yyyy;
		User.findOne({email : req.body.session},function (err,user){
			if(err) throw err;
			var id= user.expenses.length;
			user.expenses.push({"id": id,"desc":req.body.desc,"price":req.body.price,"groupname":user.groups[groupid].name,"date":today});
			user.groups[groupid].bills.push({"desc":req.body.desc,"price":req.body.price});
			console.log(user.groups);
			query=user.groups;
			 user.save(); 
			
		});
		User.findOneAndUpdate({ email : req.body.session }, {groups: query});
 		console.log(query);
 		res.send('{"success":true}');

	});
	app.post('/addFriend', function (req, res) {
		console.log("=== addFriend ===");	
		console.log("sessiongroup: "+ req.body.session);
		console.log("groupemail: "+ req.body.email);
		//console.dir(req.body)	
		User.findOne({email : req.body.session},function (err,user){
			if(err) throw err;
			var id= user.friends.length
			user.friends.push({"id":id, "email":req.body.email});
			user.save(); 
			res.send('{"success":true}');
		});

	});

	app.post('/addGroup', function (req, res) {
		console.log("=== addGroup ===");	
		console.log("sessiongroup: "+ req.body.session);
		console.log("groupname: "+ req.body.name);
		//console.dir(req.body)	
		User.findOne({email : req.body.session},function (err,user){
			if(err) throw err;
			var id= user.groups.length
			user.groups.push({"id":id, "name":req.body.name, "bills": [mongoose.Schema.Types.Mixed] });
			user.save(); 
			res.send('{"success":true}');
		});

	});
	app.post('/addRepayment', function (req, res) {
		console.log("=== addRepayment ===");	
		console.log("sessiongroup: "+ req.body.session);
		console.log("desc: "+ req.body.expenses.desc);
		console.log("price: "+ req.body.expenses.price);
		console.log("groupid: "+ req.body.expenses.groupid);
		
		var groupid = req.body.expenses.groupid;
		var query;
		var now = new Date(Date.now());
		var dd = now.getDate();
    	var mm = now.getMonth()+1; //January is 0!

    	var yyyy = now.getFullYear();
    	if(dd<10){
       	 dd='0'+dd
   		 } 
   		 if(mm<10){
      	  mm='0'+mm
   		 } 
   		 var today = dd+'/'+mm+'/'+yyyy;
		User.findOne({email : req.body.session},function (err,user){
			if(err) throw err;
			var id= user.repayments.length;
			user.repayments.push({"id": id,"desc":req.body.desc,"expenses":req.body.expenses,"date":today});
			console.log(user.repayments);
			 user.save(); 
			
		});
	});
	
	app.post('/removeGroup', function (req, res) {
		console.log("=== addGroup ===");	
		console.log("sessiongroup: "+ req.body.session);
		console.log("groupname: "+ req.body.name);
		//console.dir(req.body)	
		User.findOne({email : req.body.session},function (err,user){
			if(err) throw err;
			var id= user.groups.length
			user.groups.push({"id":id, "name":req.body.name, "bills": [mongoose.Schema.Types.Mixed] });
			user.save(); 
			res.send('{"success":true}');
		});

	});

	
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
					console.log("session: "+req.body.session)
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


	app.get('/user/:session',function(req,res){
		console.log("=== groups ===")
		var query=User.find(null);
		var session= req.params.session.split(":")[1];
		console.log(session)
		query.where('email',session);
		
		query.exec(function (err, data) {
  			if (err) { throw err; }
  			console.log(data);
  			res.json(data);
		});

	});
}