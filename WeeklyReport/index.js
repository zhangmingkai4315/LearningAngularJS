var express = require('express');
var app = express();
var mongoose=require('mongoose');
var flash = require('connect-flash');


mongoose.connect("mongodb://127.0.0.1/weekReports");
var Users=require('./model/Users');
var WeeklyReports=require('./model/weeklyReport');

var reportsRoute=require('./router/api/reports');

var passport=require('passport');
var session=require('express-session');

var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var authenticate=require('./router/authentication')(passport);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('keyboard cat'));
app.use(session({
	secret:'super secret',
	cookie: { maxAge: 60000 }
}));

app.use(flash());



app.use(passport.initialize());
app.use(passport.session());

var initPassword=require("./auth/passport-init");
initPassword(passport);


app.use('/static', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));
//定义api的路由处理函数
app.use('/api',reportsRoute);
app.use('/auth',authenticate);
app.get('/', function(req, res){
  res.sendFile(__dirname+'/public/index.html');
});





var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});