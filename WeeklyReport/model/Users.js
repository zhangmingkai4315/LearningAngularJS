var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
	username:String,
	password:String,
	realname:String,
	group:{type:String,default:""},
	photoUrl:{type:String,default:'./image/photos/steve.jpg'},
	created_at:{type:Date,default:Date.now()},
	slogen:{type:String,default:""}
});

var User=mongoose.model("User",userSchema);
module.exports=User;