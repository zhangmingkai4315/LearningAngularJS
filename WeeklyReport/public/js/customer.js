


var app=angular.module('MyApp', ["ngRoute","ngAnimate"]).config(function($routeProvider) {
	$routeProvider
		.when('/',{
			templateUrl:'tpls/index.html',
			controller:'indexController'
		})
		.when('/login',
			{templateUrl:'tpls/users/login.html',
			controller: 'loginController'
		})
		.when('/users/show/:id',{
			templateUrl:'tpls/users/show.html',
			controller: 'showController'
		})
	    .otherwise({redirectTo:'/'});
});
app.controller('mainController', function($scope){
	
});
app.controller('showController', function($scope){
	$scope.viweClass="showClass";
});

app.controller('indexController', function($scope){
	$scope.viweClass="indexClass";
});

app.controller('loginController', function($scope){
	$scope.viweClass="loginClass";
});

