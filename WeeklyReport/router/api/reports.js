var express=require('express');
var router=express.Router();
var mongoose=require("mongoose");
var weekReport=require('../../model/weeklyReport');
var Users=require("../../model/Users");
var lib=require("../../lib/lib");
router.use(function(req,res,next){

	if(req.method==="GET"){
		return next();
	}

	//认证用户权限
	if(req.query.token) {
		//会话token
		Users.findOne({'_id': req.query.token}, function (err, docs) {
			if (err) {

				res.status(404).send("NotFound");
			} else {
				req.realname=docs.realname;
				return next();
			}
		});
	}
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

//router.route('/reports/:id')
//	.get(function(req,res){
//	res.send({message:"Todo: return a reports with id:"+req.params.id});
//	})
//	.post(function(req,res){
//		res.send({message:"Todo:create new post with id:"+req.params.id});
//	})
//	.put(function(req,res){
//	res.send({message:"Todo: modify a report with id:"+req.params.id});
//	})
//	.delete(function(req,res){
//		res.send({message:"Todo:delete post with id:"+req.params.id});
//	});

router.post("/reports/new",function(req,res) {
    if(req.body){

		//{
		// realname:String,
		//	fillTime:{type:Date,default:Date.now()},
		//weekNumber:{type:Number,default:0},
		//currentWR:[{projectName:String,finished:Number,time:{type:Number,default:0}}],
		//	nextWR:[{projectName:String,finished:Number,time:{type:Number,default:0}}],
		//	remark:{type:String,default:""},
		//posts:[{
		//	realname:String,
		//	post:String,
		//	postDate:{type:Date,default:Date.now()}
		//}]
		// }
		var weeknumber=lib.getYearWeek(new Date());
		var newReport=new weekReport({
			realname:req.realname,
			weekNumber:weeknumber,
			currentWR:req.body.CurrentWeekReport.reports,
			nextWR:req.body.NextWeekReport.reports
		});
		weekReport.findOne({realname:req.realname,weekNumber:weeknumber},function(err,doc){
			if(doc){
				console.log("启动更新");
				doc.set("currentWR",req.body.CurrentWeekReport.reports);
				doc.set("nextWR",req.body.NextWeekReport.reports);
				doc.save(function (err) {
					if(err){
						res.status(500).send("Error");
					}
					else{
						res.status(200).send("Success");
					}
				});

			}else{
				console.log("启动添加");
				newReport.save(function(err){
					if(err){
						res.status(500).send("Error");
					}
					else{
						res.status(200).send("Success");
					}
				});
			}
		});


	}

});


router.get("/currentWeek/report/:id",function(req,res){
	console.log(req);
	console.log(lib.getYearWeek(new Date()));
	weekReport.findOne({"username":req.param.id,"weekNumber":lib.getYearWeek(new Date())},function(err,doc) {
		if(doc){
			res.status(200).send(doc);
		}else{
			res.status(401).send("Not found");
		}
	});
});

module.exports=router;