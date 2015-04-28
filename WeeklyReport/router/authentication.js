var express=require("express");
var router=express.Router();
var mogoose=require('mongoose');
var User=require('../model/Users');
module.exports=function(passport){
	router.get('/success',function(req,res){
		res.send({state:'Success',user:req.user?req.user:null});
	});
	router.get('/failure',function(req,res){
		res.send({state:'Failuer',user:null,message:"Invalid username or password"});
	});

	router.post('/login',passport.authenticate('login',{
		successRedirect:'/auth/success',
		failureRedirect:'/auth/failure'
	}));

	router.post('/signup',passport.authenticate('signup',{
		successRedirect:'/auth/success',
		failureRedirect:'/auth/failure'
	}));

	router.post('/query',function(req,res){
		User.findOne({username:req.body.username},function(err,user){
				if(err){
					res.send({state:'Server Failuer'})
				}
				console.log(user);
				if(!user){
					res.send({state:'Success'});
				}else{
					res.send({state:"Failuer"});
				}

			});
	});

	router.get('/logout',function(req,res){
		req.logout();
		res.redirect('/');

	});

	return router;

}