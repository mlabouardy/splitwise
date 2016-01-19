var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var validator = require('validator');

var billSchema = mongoose.Schema({
    description:{
      type:String,
      required:true,
    },
    date:{
      type: Date,
      default: Date.now,
      required:true
    },
    price:{
      type:Number,
      required:true
    },
    paid:{
      type:Boolean,
      default:false
    },
    paid_list: [{
        user: mongoose.Schema.Types.ObjectId,
        price: Number
    }]
});

module.exports = mongoose.model('Bill', billSchema);