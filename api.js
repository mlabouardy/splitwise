var User = require('./models/user.js');
var Group = require('./models/group.js');
var Bill = require('./models/bill.js');
var mongoose = require('mongoose');
var express = require('express');
var md5 = require('md5');
var app = express();

module.exports = function(app) {

	app.use('/api', function(req, res, next) {
		isConnected(req,function(connected){
			if(connected)
				next();
			else
				res.status(404).send();
		});
	});

	app.get('/api/profile', function(req, res) {
		var email = req.session.user.email;
		console.log("=== Get Profile ===");
		console.log("Profile: " + email);

		User.findOne({
			email: email
		}, 'firstName lastName email', function(err, user) {
			if (err)
				throw err;
			res.send(user);
		});
	});

	app.put('/api/profile', function(req, res) {
		console.log("=== Update Profile ===");
		console.log(req.session.user.email);
		console.log(req.body);
		User.findOne({
			email: req.session.user.email
		}, function(err, user) {
			user.email = req.body.email;
			user.firstName = req.body.firstName;
			user.lastName = req.body.lastName;
			user.password = md5(req.body.password);
			user.save(function() {
				res.status(200).send();
			});
			req.session.user = user
		});
	});

	app.get('/api/groups', function(req, res) {
		var email = req.session.user.email;
		console.log("=== Get groups ===");
		console.log("Session: " + email);

		User.findOne({
			email: email
		}, function(err, user) {
			Group.find({
				$or: [{
					owner: user._id
				}, {
					users: user._id
				}]
			}, function(err, groups) {
				if (err)
					throw err;
				res.send(groups);
			});
		});
	});

	//########################################################################################################################

	app.post('/api/addBill', function(req, res) {
		console.log("=== Add bill ===");

		Group.findById(req.body.groupId, function(err, group) {

			if (err) {
				res.status(400).send();
			} else {

				var paid_list = [];

				paid_list.push({
					user: group.owner,
					price: 0
				});

				group.users.forEach(function(_user) {
					paid_list.push({
						user: _user,
						price: 0
					});
				});

				group.bills.push({
					"description": req.body.description,
					"price": req.body.price,
					"paid": false,
					"paid_list": paid_list,
					"date": req.body.date
				});

				group.save(function(err) {
					if (err) {
						res.status(400).send();
					} else {
						res.status(200).send();
					}
				});
			}

		});

	});

	app.get('/api/getBillList/:groupId', function(req, res) {

		console.log("=== Get all bill ===");

		Group.findById(req.params.groupId, function(err, group) {
			if (err) {
				res.status(400).send();
			} else {
				res.status(200).send(group.bills);
			}

		});
	});

	app.delete('/api/deleteBill/:groupId/:billId', function(req, res) {

		console.log("=== remove bill ===");

		Group.findById(req.params.groupId, function(err, group) {

			if (err) {
				res.status(400).send();
			} else {

				group.bills.id(req.params.billId).remove();

				group.save(function(err) {
					if (err) {
						res.status(400).send();
					} else {
						res.status(200).send();
					}
				});

			}

		});
	});


	var getUsersDetailsByEmail = function(email, callback) {
		User.findOne({
			email: email
		}, function(err, user) {
			if (!err) callback(user);
		});
	}

	var getUsersDetailsByID = function(id, callback) {
		User.findById(id, function(err, user) {
			if (!err) callback(user);
		});
	}

	app.get('/api/getUsersDetails/:groupId/:billId', function(req, res) {

		Group.findById(req.params.groupId, function(err, group) {

			if (err) {

				res.status(400).send();

			} else {

				var result = [];



				group.bills.forEach(function(bill) {

					if (bill._id.equals(req.params.billId)) {

						bill.paid_list.forEach(function(paid_list) {

							getUsersDetailsByEmail(req.session.user.email, function(user) {

								if (paid_list.user.equals(user._id)) {

									result.push({
										"_id": user._id,
										"lastName": user.lastName,
										"firstName": user.firstName,
										"email": user.email,
										"price": paid_list.price,
										"readonly": false
									});

									if (bill.paid_list.length == result.length) {
										res.status(200).send(result);
									}

								} else {

									getUsersDetailsByID(paid_list.user, function(user) {

										result.push({
											"_id": user._id,
											"lastName": user.lastName,
											"firstName": user.firstName,
											"email": user.email,
											"price": paid_list.price,
											"readonly": true
										});

										if (bill.paid_list.length == result.length) {
											res.status(200).send(result);
										}

									});

								}

							});

						});
					}

				});

			}
		});
	});


	app.post('/api/updateCurrentBill', function(req, res) {

		var groupId = req.body.groupId;
		var billId = req.body.billId;
		var friends = req.body.friends;

		Group.findById(groupId, function(err, group) {

			if (err) {

				res.status(400).send();

			} else {

				group.bills.forEach(function(bill) {

					if (bill._id.equals(billId)) {

						var maxPrice = bill.price;

						bill.paid_list.forEach(function(paid_list) {

							friends.forEach(function(friend) {
								if (paid_list.user.equals(friend._id)) {
									paid_list.price = friend.price;
									maxPrice -= friend.price;
								}
							});

						});

						if (maxPrice < 0) {
							res.status(400).send("Price error !");
						} else {
							if (maxPrice === 0) {
								bill.paid = true;
							}
							group.save();
							res.status(200).send("Saved !");
						}
					}

				});


			}
		});

	});

	//########################################################################################################################


	app.delete('/api/friends/delete/:id', function(req, res) {
		var email = req.session.user.email;
		var friendId = req.params.id;
		console.log("=== Delete Friend ===");
		console.log("Current session: " + email);
		console.log("Friend Id: " + friendId);

		User.findOne({
			email: email
		}, function(err, user) {
			var index = user.friends.indexOf(friendId);
			if (index > -1) {
				user.friends.splice(index, 1);
				user.save();
			} else {
				res.status(400).send();
			}

			User.findOne({
				_id: friendId
			}, function(err, friend) {
				var index = friend.friends.indexOf(user._id);
				if (index > -1) {
					friend.friends.splice(index, 1);
					friend.save();
					res.status(200).send();
				} else {
					res.status(400).send();
				}
			});


		});
	});


	app.delete('/api/groups/delete/:id', function(req, res) {
		var email = req.session.user.email;
		var groupID = req.params.id;
		console.log("=== Delete Group ===");
		console.log("Current session: " + email);
		console.log("Group Id: " + groupID);

		Group.remove({
			_id: groupID
		}, function(err) {
			if (err)
				throw err;
			res.status(200).send();
		});
	});

	app.post('/api/groups/users/delete', function(req, res) {
		var email = req.session.user.email;
		var groupID = req.body.id_group;
		var userID = req.body.id_user;
		console.log("=== Remove user from group ===");
		console.log("Current session: " + email);
		console.log("Group Id: " + groupID);

		Group.findById(groupID, function(err, group) {
			var index = group.users.indexOf(userID);
			if (index > -1) {
				group.users.splice(index, 1);
				group.save();
				res.status(200).send();
			} else {
				res.status(400).send();
			}
		});
	});

	app.post('/api/group/update', function(req, res) {
		var email = req.session.user.email;
		var groupID = req.body.id;
		var name = req.body.name;
		console.log("=== Update Group ===");
		console.log("Current session: " + email);
		console.log("Group Id: " + groupID);

		Group.findById(groupID, function(err, group) {
			console.log(group);
			group.name = name;
			group.save();
			res.status(200).send();
		});
	});

	app.get('/api/group/:id', function(req, res) {
		var email = req.session.user.email;
		var groupID = req.params.id;
		console.log("=== Group Information ===");
		console.log("Current session: " + email);
		console.log("Group Id: " + groupID);

		Group.findOne({
			_id: groupID
		}, function(err, group) {
			if (group.users.length > 0) {
				User.find({
					_id: {
						$in: [group.users, group.owner]
					}
				}, 'firstName lastName email', function(err, data) {
					if (err)
						throw err;
					console.log(data);
					var tmp = {
						_id: group._id,
						bills: group.bills,
						owner: group.owner,
						name: group.name,
						users: data
					};
					res.send(tmp);
				});
			} else {
				User.findOne({
					_id: group.owner
				}, function(err, user) {
					var users = [];
					users.push(user);
					var tmp = {
						_id: group._id,
						bills: group.bills,
						owner: group.owner,
						name: group.name,
						users: users
					};
					res.send(tmp);
				});

			}

		});
	});

	app.post('/api/addFriend', function(req, res) {
		var email = req.session.user.email;
		var groupID = req.body.group;
		var friendEmail = req.body.friend;
		console.log("=== New Friend ===");
		console.log("Current session: " + email);
		console.log("Friend email: " + friendEmail);
		User.findOne({
			email: friendEmail
		}, function(err, friend) {
			if (err) throw err;
			if (friend == null) {
				res.send('{"success":false}');
			} else {
				User.findOne({
					email: email
				}, function(err, user) {
					user.friends.push(friend._id);
					user.save();

					friend.friends.push(user._id);
					friend.save();

					Group.findOne({
						_id: groupID
					}, function(err, group) {
						group.users.push(friend._id);
						group.save();
						res.send('{"success":true}');
					});
				});
			}
		});

	});

	app.get('/api/friends', function(req, res) {
		var email = req.session.user.email;
		console.log("=== List of Friends ===");
		console.log("Session: " + email);

		User.findOne({
			email: email
		}, 'friends', function(err, friends) {
			User.find({
				_id: {
					$in: friends.friends
				}
			}, 'firstName lastName email', function(err, data) {
				if (err)
					throw err;
				res.send(data);
			});
		});

	});

	app.post('/api/addGroup', function(req, res) {

		console.log("=== New Group ===");
		console.log("groupname: " + req.body.name);
		//console.dir(req.body)
		User.findOne({
			email: req.session.user.email
		}, function(err, user) {
			if (err) throw err;
			var data = {
				name: req.body.name,
				owner: user._id,
				bills: [],
				users: []
			};
			var group = new Group(data);
			group.save(function(err) {
				if (err)
					throw err;
				res.send('{"success":true}');
			});
		});

	});

	app.post('/api/removeGroup', function(req, res) {
		console.log("=== addGroup ===");
		console.log("groupname: " + req.body.name);
		//console.dir(req.body)
		User.findOne({
			email: req.session.user.email
		}, function(err, user) {
			if (err) throw err;
			var id = user.groups.length
			user.groups.push({
				"id": id,
				"name": req.body.name,
				"bills": [mongoose.Schema.Types.Mixed]
			});
			user.save();
			res.send('{"success":true}');
		});

	});


	app.post('/register', function(req, res) {
		var user = new User()

		user.email = req.body.email
		user.password = md5(req.body.password)
		user.firstName = req.body.firstName
		user.lastName = req.body.lastName

		user.save(function(err) {
			if (err) {
				var errorMessages = []
				for (field in err.errors) {
					errorMessages.push(err.errors[field].message)
				}
				res.status(401).send(errorMessages)
			} else {
				res.status(200).send()
			}
		})
	})


	app.post('/login', function(req, res) {
		console.log("==== login ===")
		User.findOne({
			email: req.body.email
		}, function(err, user) {

			if (!user) {
				res.status(401).send("Invalid email or password")
			} else {
				if (md5(req.body.password) === user.password) {
					req.session.user = user
					res.status(200).send()
				} else {
					res.status(401).send("Invalid email or password")
				}
			}

		})

	})

	var isConnected = function(req, callback) {

		if (req != null){
			if (req.session && req.session.user) {
				User.findOne({
					email: req.session.user.email
				}, function(err, user) {
					if (!user) {
						req.session.reset()
						callback(false)
					} else {
						callback(true)
					}
				})
			} else {
				callback(false)
			}
		}

	}

	app.get('/isConnected', function(req, res) {

		isConnected(req, function(connected) {
			if (connected == false) {
				res.status(401).send()
			} else {
				res.status(200).send();
			}
		});

	});

	app.get('/api/logout', function(req, res) {
		req.session.destroy()
		res.status(200).send()
	})

}