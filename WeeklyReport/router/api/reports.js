var express=require('express');
var router=express.Router();
var mongoose=require("mongoose");
var weekReport=require('../../model/weeklyReport');

router.use(function(req,res,next){
	if(req.method==="GET"){
		return next();
	}
	if(!req.isAuthenticated()){
	  return res.redirect('/#login');
	}
	return next();
});

router.route('/:id/reports')
	.get(function(req,res){
	weekReport.find({weekNumber:req.params.id},function(err,docs){
			if(err){
				return res.send({error:"No docs in database"});
			}
			return res.json(docs);
		});
	});

router.route('/reports/username/:name')
		.get(function(req,res){
			weekReport.find({username:req.params.name},function(err,docs){
			if(err){
				return res.send(500,{error:"No docs in database"});
			}
			return res.json(docs);
		});
	});

router.route('/reports/:id')
	.get(function(req,res){
	res.send({message:"Todo: return a reports with id:"+req.params.id});
	})
	.post(function(req,res){
		res.send({message:"Todo:create new post with id:"+req.params.id});
	})
	.put(function(req,res){
	res.send({message:"Todo: modify a report with id:"+req.params.id});
	})
	.delete(function(req,res){
		res.send({message:"Todo:delete post with id:"+req.params.id});
	});


module.exports=router;