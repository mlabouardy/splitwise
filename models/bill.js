var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var validator = require('validator');

var paymentSchema = mongoose.Schema({
      autor_email:{
         type:String,
         required:true,
         unique:false
      },
      group_name:{
         type:String,
         required:true,
         unique:false
      },
      bill_desc:{
         type:String,
         required:true,
         sparse:true,
         unique:true
      },
      bill_price:{
         type:String,
         required:true,
         unique:false
      },
      details:[mongoose.Schema.Types.Mixed]
});

paymentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Bill', paymentSchema);