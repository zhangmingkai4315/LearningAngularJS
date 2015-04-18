//载入基本的模块
var express=require('express');
var fs=require('fs');
var http=require('http');
var app=express();


app.set('port',process.env.PORT|3000);

app.use(express.static('public'));

app.get('/',function(req,res){
	res.sendfile('./app/index.html');
});

//定义函数的启动入口，如果为集群启动则导出函数！
function startServer(){
	var server=http.Server(app).listen(app.get('port'),function(){
		console.log('Asset Management is ready and listening on port:'+app.get('port'));
		console.log('Running under Env:'+app.get('env'));
	});
}
if(require.main==module){
	startServer();
}else{
	module.exports=startServer();
}
