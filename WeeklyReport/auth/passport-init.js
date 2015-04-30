var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

//temporary data store
var mogoose=require('mongoose');
var User=require('../model/Users');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(user, done) {
		console.log('serializing user:',user._id);
		//return the unique id for the user
		done(null, user._id);
	});

	//Desieralize user will call with the unique id provided by serializeuser
	passport.deserializeUser(function(id, done) {
		console.log("DeserializeUser:"+id);

		User.findById(id,function(err,user){
			if(err){
				return done(err,false);
			}
			if(!user){
				return done("用户名未找到",false);
			}
			return done(null,user);
		});
		

	});

passport.use('login', new LocalStrategy({
			passReqToCallback : true
		},
		function(req, username, password, done) { 
			User.findOne({username:username},function(err,user){
				if(err){
					return done("Error",false);
				}
				if(!user){
					return done("用户名未找到",false);
				}
				if(!isValidPassword(user,password)){
					return done('密码无效，请重试',false);
				}else{
					
					return done(null,user);
				}
			});
			
		}
	));






passport.use('signup', new LocalStrategy({
			passReqToCallback : true // allows us to pass back the entire request to the callback
		},
		function(req, username, password, done) {
			console.log(req.body);
			User.findOne({'username':username},function(err,doc){
				if(err){
					return done('Db error'+err,false);
				}
				if(doc){
					return done('用户名已被占用',false);
				}else{	var user=new User({
							username:username,
							password:createHash(password),
							realname:req.body.realname
						});

						user.save(function(err,user){
							if(err){
								return done(err,false);

							}
							console.log('注册成功');
							return done(null,user);
						});

				}
			});

		
	}));
	
	var isValidPassword = function(user, password){
		
		return bCrypt.compareSync(password, user.password);
	};
	// Generates hash using bCrypt
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

};