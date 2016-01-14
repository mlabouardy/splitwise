var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var validator = require('validator');

var billSchema = mongoose.Schema({
    desc:{
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
    }
});

var groupSchema = mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    bills:[billSchema]
});

var userSchema = mongoose.Schema({
      email:{
         type:String,
         required:true,
         unique:true,
         validate: [ validator.isEmail, 'Invalid email' ]
      },
      password:{
         type:String,
         required:true,
         minlength:6
      },
      firstName:{
         type:String,
         required:true
      },
      lastName:{
         type:String,
         required:true
      },
      groups:[groupSchema],
      friends:[mongoose.Schema.Types.Mixed]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
