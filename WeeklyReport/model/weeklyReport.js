
var mongoose=require("mongoose")

var weeklyReportSchema=mongoose.Schema({
	name:String,
	fillTime:{type:Date,default:Date.now},
	thisWeekWork:[{body:String,finished:Number}],
	nextWeekPlan:[{body:String,planned:Number}],
	remark:String
});

var WeeklyReport=mongoose.model('weeklyReport',weeklyReportSchema);
module.exports=WeeklyReport;

if(require.main == module){
	var opts={
	server:{
		socketOptions:{
			keepAlive:1
		}
	}
};

mongoose.connect('mongodb://localhost/weeklyReport',opts);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Connect to mongodb success");
});

new weeklyReport({
	name:"Stevie",
	thisWeekWork:[
	{
		body:"值班",finished:100
	},
	{
		body:"编写Mean框架程序",
		finished:50
	}
	],
	nextWeekPlan:[{
		body:"值班",finished:100
	},{
		body:"编写Mean框架程序",finished:60
	}
	],
	remark:"本周一切顺利！",
}).save(function(err){
	if(err) console.log('save fails');
	console.log("save success");
})


}