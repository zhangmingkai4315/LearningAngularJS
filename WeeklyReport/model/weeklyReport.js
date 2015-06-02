
var mongoose=require("mongoose")

var weeklyReportSchema=mongoose.Schema({
	realname:String,
	fillTime:{type:Date,default:Date.now()},
	weekNumber:{type:Number,default:0},
	currentWR:[{projectName:String,finished:Number,timeCost:{type:Number,default:0}}],
	nextWR:[{projectName:String,finished:Number,timeCost:{type:Number,default:0}}],
	remark:{type:String,default:""},
	posts:[{
		realname:String,
		post:String,
		postDate:{type:Date,default:Date.now()}
	}]
});

var weeklyReport=mongoose.model('weeklyReport',weeklyReportSchema);
module.exports=weeklyReport;

//if(require.main == module){

//mongoose.connect("mongodb://127.0.0.1/weekReports",function(err){
//	if(err){
//		console.log("Connect db failuer");
//	}else{
//		console.log("Connect db success");
//	}
//});
//
//
//var newReport=new weeklyReport({
//
//	username:"Stevie",
//	weekNumber:12,
//	thisWeekWork:[
//	{
//		body:"值班",finished:100
//	},
//	{
//		body:"编写Mean框架程序",
//		finished:50
//	}
//	],
//	nextWeekPlan:[{
//		body:"值班",planned:100
//	},{
//		body:"编写Mean框架程序",planned:60
//	}
//	],
//	remark:"本周一切顺利！",
//	posts:[{
//		username:"郭川",
//		post:"Cool job!"
//	}]
//});
//newReport.save(function(err){
//	if(err)
//	 console.log(err)
//	else
//	console.log("save success");
//});
//
//}