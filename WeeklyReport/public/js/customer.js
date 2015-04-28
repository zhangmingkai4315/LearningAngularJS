
var app=angular.module('MyApp', ["ngRoute","ngAnimate"]).run(function($rootScope,$http){
	

	$rootScope.logout=function(){
		$http.get('/auth/logout');
		$rootScope.authenticate=false;
		$rootScope.currentUser="";
	}
	
});

app.config(function($routeProvider) {
	$routeProvider
		.when('/',{
			templateUrl:'tpls/index.html',
			controller: 'indexController'
		})
		.when('/register',{
			templateUrl:'tpls/register.html',
			controller:'registerController'
		})
		.when('/showList',
			{templateUrl:'tpls/showList.html',
			controller: 'showListController'
		})
		.when('/showUsers',
			{templateUrl:'tpls/showUsers.html',
			controller: 'showUsersController'
		})
		.when('/users/show/:id',{
			templateUrl:'tpls/users/show.html',
			controller: 'showController'
		})
		.when('/profile',{
			templateUrl:'tpls/users/profile.html',
			controller: 'mainController'
		})
		.otherwise({redirectTo:'/'});
		;
});


app.factory('reportService', ['$http', function($http){
	var reportService={};
	reportService.getAll=function(){
		return $http.get('/api/12/reports');
	}
	reportService.getAllUsers=function(){
		return $http.get('/api/users');
	}
	return reportService;
}])



app.controller('mainController', function($scope){
	
});


app.directive('uniqueEmail',function($http){
	return {
		require:'ngModel',
		link:function(scope,elem,attrs,ngModelCtrl){
			var original;
			var user={username:"",password:""};
			ngModelCtrl.$parsers.push(function(viewValue){
				if(viewValue&&viewValue!==original){
					user.username=viewValue;
					user.password="random123";
					$http.post('/auth/query',user).success(function(data){
						
						if(data.state=="Failuer"){
							
								elem.removeClass('fineToRegist');
								elem.addClass('warningRegist');
						

						}else{
								
									elem.removeClass('warningRegist');
									elem.addClass('fineToRegist');
								
						}
					}).error(function(data){
						console.log("No feedback");
					});
				}
			})
		}
	}
});




app.controller('registerController', function($location,$scope,$http,$rootScope,$log){
	$scope.viweClass="registerClass";
	$scope.user={username:"",password:""};
	$scope.error_message="";
	$scope.showWarning=1;
	$scope.register=function(){
		if($scope.user.password!=$scope.repassword){
			$scope.showWarning=0;
			$scope.error_message="两次输入密码不一致";
		}else{
			$http.post('/auth/signup',$scope.user).success(function(data){
				if(data.user){
				$rootScope.authenticate=true;
				$rootScope.user=data.user.username;
				$location.path('/profile');
				}
				

			}).error(function(data){
				$scope.showWarning=0;
				$scope.error_message=data;
			});
		}
	}
	
});
app.controller('showListController', function($scope,reportService,$log){
	$scope.viweClass="showListClass";
	$scope.dateTime=new Date().toLocaleDateString();
	reportService.getAll().success(function(data){
		$scope.reports=data;
		$log.info(data);
	});

});

app.controller('showUsersController', function($scope,reportService,$log){
	$scope.viweClass="showUsersClass";
	$scope.dateTime=new Date().toLocaleDateString();
	reportService.getAllUser().success(function(data){
		$scope.reports=data;
		$log.info(data);
	});

});




app.controller('indexController', function($scope,$rootScope,$http,$location){
	$scope.viweClass="indexClass";
	$scope.user={username:"",password:""};
	$scope.error_message="";
	$scope.showWarning=1;
	$scope.login=function(){
		$http.post('/auth/login',$scope.user).success(function(data){
			if(data.user){
			$rootScope.authenticate=true;
			$rootScope.user=data.user.username;
			$location.path('/profile');
			}else{
				$scope.error_message=data;
				alert(data);
			}

		}).error(function(data){
			$scope.showWarning=0;
			$scope.error_message=data;
		});
	}
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
