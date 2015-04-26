var express = require('express');
var app = express();
var mongoose=require('mongoose');
var reportsRoute=require('./router/api/reports');

var passport=require('passport');
var session=require('express-session');

var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');

app.use(session({
	secret:'super secret'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());


app.use(passport.initialize());
app.use(passport.session());




app.use('/static', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));
//定义api的路由处理函数
app.use('/api',reportsRoute);

app.get('/', function(req, res){
  res.sendFile(__dirname+'/public/index.html');
});



app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});