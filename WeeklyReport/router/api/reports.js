var express=require('express');
var router=express.Router();

router.route('/reports')
	.get(function(req,res){
	res.send({message:"Todo: return all reports"});
	})
	.post(function(req,res){
		res.send({message:"Todo:create new post"});
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