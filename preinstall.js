var User = require('./models/user.js');
var Group = require('./models/group.js');
var Bill = require('./models/bill.js');
var constants = require('./constants');
var mongoose = require('mongoose');
var md5 = require('md5');

mongoose.connect(constants.DATABASE_HOST, function() {
	
	mongoose.connection.db.dropDatabase()

	var user = new User()
	user.email = "user_1@gmail.com"
	user.password = md5("user_1")
	user.firstName = "user_1 firstName"
	user.lastName = "user_1 lastName"
	user.save(function(err){

		console.log(user.email+' created');
		var friend = new User()
		friend.email = "user_2@gmail.com"
		friend.password = md5("user_2")
		friend.firstName = "user_2 firstName"
		friend.lastName = "user_2 lastName"
		friend.friends.push(user._id);
		friend.save(function(err){
			user.friends.push(friend._id);
		user.save(function(err){
			console.log(friend.email+' created');
			new Group({
				name: "Groupe 1",
				owner: user._id,
				bills: [{
					"description": "Facture payée",
					"price": 500,
					"paid": true,
					"paid_list": [{
						user: user,
						price: 300
					}, {
						user: friend,
						price: 200
					}],
					"date": new Date().setDate(new Date().getDate() - 30)
				}, {
					"description": "Facture d'aujourd'hui",
					"price": 100,
					"paid": false,
					"paid_list": [{
						user: user,
						price: 0
					}, {
						user: friend,
						price: 0
					}],
					"date": new Date().setDate(new Date().getDate())
				}, {
					"description": "Facture à payer dans un mois",
					"price": 300,
					"paid": false,
					"paid_list": [{
						user: user,
						price: 0
					}, {
						user: friend,
						price: 0
					}],
					"date": new Date().setDate(new Date().getDate() + 30)
				}],
				users: [friend]
			}).save(function(err){
					console.log('Group 1 created');
					new Group({
					name: "Groupe 2",
					owner: user._id,
					bills: [{
						"description": "Facture du group 2",
						"price": 300,
						"paid": false,
						"paid_list": [{
							user: user,
							price: 0
						}, {
							user: friend,
							price: 0
						}],
						"date": new Date().setDate(new Date().getDate() + 30)
					}],
					users: [friend]
				}).save(function(err){
					console.log('Group 2 created');
					process.exit();
				});
			});
		});

		});

	});
	
})
