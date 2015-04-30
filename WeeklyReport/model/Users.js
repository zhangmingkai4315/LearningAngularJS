var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
	username:String,
	password:String,
	realname:String,
	group:{type:String,default:"尚未选择"},
	photoUrl:{type:String,default:'./image/photos/steve.jpg'},
	created_at:{type:Date,default:Date.now()},
	slogen:{type:String,default:"我的工作我做主！"}
});

var User=mongoose.model("User",userSchema);
module.exports=User;