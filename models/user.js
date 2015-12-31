var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var validator = require('validator');

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
      groups:{
         type:[mongoose.Schema.Types.Mixed],
         require:false
      },
      friends:{
         type:[mongoose.Schema.Types.Mixed],
         require:false
      }

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);