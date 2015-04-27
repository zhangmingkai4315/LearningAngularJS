var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
	username:String,
	password:String,
	realname:String,
	photoUrl:{type:String,default:'./image/photos/steve.jpg'},
	created_at:{type:Date,default:Date.now()}
});

var User=mongoose.model("User",userSchema);
module.exports=User;