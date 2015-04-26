


var app=angular.module('MyApp', ["ngRoute","ngAnimate"]).config(function($routeProvider) {
	$routeProvider
		.when('/',{
			templateUrl:'tpls/index.html',
			controller: 'indexController'
		})
		.when('/showList',
			{templateUrl:'tpls/showList.html',
			controller: 'showListController'
		})
		.when('/users/show/:id',{
			templateUrl:'tpls/users/show.html',
			controller: 'showController'
		})
		.otherwise({redirectTo:'/'});
		;
});
app.controller('mainController', function($scope){
	
});
app.controller('showListController', function($scope){
	$scope.viweClass="showListClass";
	$scope.dateTime=new Date().toLocaleDateString();
});

app.controller('indexController', function($scope){
	$scope.viweClass="indexClass";
});

app.controller('loginController', function($scope){
	$scope.viweClass="loginClass";
});

app.directive('script', function() {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, elem, attr) {
        if (attr.type === 'text/javascript-lazy') {
          var code = elem.text();
          var f = new Function(code);
          f();
        }
      }
    };
  });
