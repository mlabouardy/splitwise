var User=require('./models/user.js');
var Bill=require('./models/bill.js');
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
			//var id= user.expenses.length;
			//user.expenses.push({"id": id,"desc":req.body.desc,"price":req.body.price,"groupname":user.groups[groupid].name,"date":today});
			for (var i = 0; i < user.groups.length; i++) {
				if(user.groups[i]._id==groupid){
					user.groups[i].bills.push({"desc":req.body.desc,"price":req.body.price,paid:false});
			
				}
			};
			console.log(user.groups);

			user.save();

		});
		User.findOneAndUpdate({ email : req.body.session }, {groups: query});
		console.log(query);
		res.send('{"success":true}');

	});
	app.post('/addFriend', function (req, res) {
		console.log("=== New Friend ===");
		console.log("Current session: "+ req.body.session);
		console.log("Friend email: "+ req.body.email);
		User.findOne({email : req.body.email},'firstName lastName email friends',function (err,friend){
			if(err) throw err;
			if(friend==null){
					res.send('{"success":false}');
			}else{
					User.findOne({email : req.body.session},'firstName lastName email friends',function (err,user){
						var tmpFriend={
							 _id:friend._id,
							 firstName:friend.firstName,
							 lastName:friend.lastName,
							 email:friend.email
						};
						
						user.friends.push(tmpFriend);
						user.save();

						var tmpUser={
							_id:user._id,
							firstName:user.firstName,
							lastName:user.lastName,
							email:user.email
						}

						friend.friends.push(tmpUser);
						friend.save();

						res.send('{"success":true}');
					});
			}
		});

	});

	app.post('/addGroup', function (req, res) {
		console.log("=== New Group ===");
		console.log("sessiongroup: "+ req.body.session);
		console.log("groupname: "+ req.body.name);
		var friends;
		//console.dir(req.body)
		User.findOne({email : req.body.session},function (err,user){
			if(err) throw err;
			var group={
				name:req.body.name,
				bills:[]
			};
			user.groups.push(group);
			friends=user.friends;
			user.save(function(err){
				if(err){throw err;}
			});
			for(var i in user.friends){
				var friend=user.friends[i];
				User.findOne({email: friend.email},function (err,tmpUser){
					if (err) throw err;
					if (tmpUser!=null) {

								
				var element = { name: req.body.name, bills: [] };
				tmpUser.groups.pushIfNotExist(element, function(e) { 
	    		return e.name === element.name; 
				});
						//tmpUser.groups.push({"name":req.body.name,
						//"bills":[]});
						tmpUser.save(function(err){
							if(err){
								console.log(err)
								//res.send('{"success": false}');	
							}
							else{
								console.log("new Friend");
								console.log(tmpUser);
							}
						})
					}
				})
				
			}
			console.log("_______ NEW GROUP OK _______");
			res.send('{"success":true}');
		});


	});
	app.post('/addRepayment', function (req, res) {
		console.log("=== addRepayment ===");
		console.log("user: "+ req.body.session);
		console.log("bill_desc: "+ req.body.expenses.bill_desc);
		console.log("bill_price: "+ req.body.expenses.bill_price);
		console.log("group_name: "+ req.body.expenses.group_name);
		console.log(req.body.details);

		//get req parameter
		var group_name = req.body.expenses.group_name;
		var bill_desc = req.body.expenses.bill_desc;
		var bill_price = req.body.expenses.bill_price;
		var end = false;



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
			//user.repayments.push({"id": id,"desc":req.body.desc,"expenses":req.body.expenses,"date":today});
			var bill = new Bill();
			bill.group_name = group_name;
			bill.bill_desc = bill_desc;
			bill.bill_price = bill_price;
			bill.details = req.body.details;
			bill.autor_email = req.body.session;
			console.log("new bill");
			console.log(bill);
			//bill.save();

			for(var i in bill.details){
				var friend = bill.details[i].friend;
				//friend
				if (undefined !=friend || friend !=null) {
				if(friend.email!=bill.autor_email){
					//add bill of each friend
					User.findOne({email : friend.email},function (err,userFriend){
					if(err) throw err;
					//var id= user.expenses.length;
					//user.expenses.push({"id": id,"desc":req.body.desc,"price":req.body.price,"groupname":user.groups[groupid].name,"date":today});
					if(userFriend!=null){
						for (var i = 0; i < userFriend.groups.length; i++) {
							if(userFriend.groups[i].name==group_name){
								var element = {"desc":bill_desc,"price":bill_price,paid:false};
								userFriend.groups[i].bills.pushIfNotExist(element, function(e) { 
	    							return e.desc === element.desc; 
								});
								userFriend.save();
								console.log("ok for my friends");
								end=true;
								console.log("----------------!End addRepayment !");
								//res.send('{"success":true}');
								//push({"desc":bill_desc,"price":bill_price,paid:false});
							}
						}
					};
					});
				}
				}
			}
		//User.findOneAndUpdate({ email : req.body.session }, {groups: query});
		//console.log(query);
		//res.send('{"success":true}');

				
			
			user.repayments.push(bill);
			user.save();
			bill.save(function(err){
			if(err){
				console.log(err)
				var errorMessages = []
				for (field in err.errors) {
					console.log(err.errors[field].message)
		            errorMessages.push(err.errors[field].message) 
		        }
		        console.log("error from mboutoucou")
		        res.status(500).send(err.errmsg)
			}
			else{
				if(end){
					res.send('{"success":true}')
				}
			}
		})
		});
		
	});

	app.post('/removeGroup', function (req, res) {
		console.log("=== remove Group ===");
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
				console.log(errorMessages)
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

	app.get('/bill/:desc',function(req,res){
		console.log("=== bill ===")
		var query=Bill.find(null);
		var bill_desc= req.params.desc.split(":")[1];
		console.log(bill_desc)
		query.where('bill_desc',bill_desc);
		
		query.exec(function (err, data) {
  			if (err) { throw err; }
  			console.log(data);
  			res.json(data);

		console.log("-------- ! End getBill ! -------\n");
		});
	});
	app.get('/user/:session',function(req,res){
		console.log("=== user session ===")
		var query=User.find(null);
		var session= req.params.session.split(":")[1];
		console.log(session)
		query.where('email',session);
		
		query.exec(function (err, data) {
  			if (err) { throw err; }
  			console.log(data);
  			res.json(data);

		console.log("-------- ! End getUser ! -------\n");
		});
	});
}
Array.prototype.inArray = function(comparer) { 
	    for(var i=0; i < this.length; i++) { 
	        if(comparer(this[i])) return true; 
	    }
	    return false; 
	}; 

	// adds an element to the array if it does not already exist using a comparer 
	// function
Array.prototype.pushIfNotExist = function(element, comparer) { 
	    if (!this.inArray(comparer)) {
	        this.push(element);
	    }
	}; 