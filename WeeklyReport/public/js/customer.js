
var app=angular.module('MyApp', ["ngRoute","ngAnimate","LocalStorageModule"]).run(function($rootScope,$http){
	

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

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('MyApp')
    .setStorageType('sessionStorage')
    .setNotify(true, true)
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



app.controller('mainController', function($rootScope,$location,$http,$scope,localStorageService){
	$scope.username=localStorageService.get('username');
	$('.ui.checkbox').checkbox();
	if($scope.username){
		// 获取主页数据
	}
	else{
		$location.path("/");
	}
	$scope.profile={
		"username":$scope.username,
		"photos":"steve.jpg",
		"group":"",
		"slogen":""
	};

	$scope.logout=function(){
		localStorageService.set('username','');
		$http.get('/auth/logout');
		$location.path("/");
	};
	$scope.showEditProfile=function(){
		$('.ui.modal').modal('show');
	};

	$scope.submitProfile=function(){
		console.log($scope.profile);
		$http.put('/api/user/profile');
	}




	
});


app.directive('uniqueEmail',function($http,$rootScope){
	return {
		require:'ngModel',
		scope:true,
		link:function(scope,elem,attrs,ngModelCtrl){
			var original;
			var user_query={username:"",password:""};
			ngModelCtrl.$parsers.push(function(viewValue){
				if(viewValue&&viewValue!==original){
					user_query.username=viewValue;
					user_query.password="random123";
					//console.log(ngModelCtrl);
					$http.post('/auth/query',user_query).success(function(data){
						
						if(data.state=="Failuer"){
								
								elem.removeClass('fineToRegist');
								elem.addClass('warningRegist');
								

						}else{
									$rootScope.currentUser=user_query.username;
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




app.controller('registerController', function($location,$scope,$http,$rootScope,$log,localStorageService){
	
	$scope.viweClass="registerClass";
	$scope.user={username:"",password:""};
	$scope.error_message="";
	$scope.showWarning=1;
	$scope.register=function(){
		if($scope.user.password!=$scope.repassword){
			$scope.showWarning=0;
			$scope.error_message="两次输入密码不一致";
		}else{
			$scope.user.username=$rootScope.currentUser;

			console.log($scope.user);
			
			$http.post('/auth/signup',$scope.user).success(function(data){
				if(data.user){
				$rootScope.authenticate=true;
				$rootScope.user=data.user.username;
				localStorageService.set('username',data.user.username);
				$location.path('/profile');
				}
				

			}).error(function(data){
				$rootScope.authenticate=false;
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




app.controller('indexController', function($scope,$rootScope,$http,$location,localStorageService){
	if(localStorageService.get('username'))
	{
		$location.path('/profile');
	}

	$scope.viweClass="indexClass";
	$scope.user={username:"",password:""};
	$scope.error_message="";
	$scope.showWarning=1;
	$scope.login=function(){
		$http.post('/auth/login',$scope.user).success(function(data){
			if(data.user){
			$rootScope.authenticate=true;
			$rootScope.user=data.user.username;
			localStorageService.set('username',data.user.username);
			$location.path('/profile');
			}else{
				$rootScope.authenticate=true;
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
  		  console.log(code);
  		  var f=new Function(code);
  		  f();
  		  //console.log(f);
          
        }
      }
    };
  });
