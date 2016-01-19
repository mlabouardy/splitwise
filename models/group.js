var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var validator = require('validator');

var billSchema=require('./bill.js').schema;

var groupSchema = mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    owner:mongoose.Schema.Types.ObjectId,
    bills:[billSchema],
    users:[mongoose.Schema.Types.ObjectId]
});


groupSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Group', groupSchema);
