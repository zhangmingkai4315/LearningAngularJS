
var app=angular.module('MyApp', ["ngRoute","ngAnimate","LocalStorageModule"]);
app.config(function($httpProvider){
	var interceptor=function($q,$rootScope,Auth,ACCESS_LEVELS){
		return{
			'request':function(req){
				req.params=req.params||{};
				console.log('DEBUG');
				console.log(Auth.getToken());
				if(Auth.isAuthorized(ACCESS_LEVELS.publicAuth)){
					req.params.token=Auth.getToken();
				}
				console.log(req.params);
				return req;
			},
			'requestError':function(reqErr) {
				return reqErr;
			},
			"response":function(resp){
				if(resp.config.url=='/auth/login'){
					Auth.setToken(resp.data.token);
				}
				return resp;
			},
			'responseError':function(rejection){
				switch (rejection.status){
					case 401:
						if(rejection.config.url!=='/api/login'){
							$rootScope.$broadcast('auth:login Required');
						}
						break;
					case 403:
						$rootScope.$broadcast('auth:Forbidden');
						break;
					case 404:
						$rootScope.$broadcast('Page:NotFound');
						break;
					case 500:
						$rootScope.$broadcast("Server:Error");
						break;
					//case 304:
					//	console.log("re 304");
					//	break;


				}
				return $q.reject(rejection);
			}
		}
	}
	$httpProvider.interceptors.push(interceptor);
});


app.constant('ACCESS_LEVELS',{
	publicAuth:1,
	userAuth:2
});

//app.run(function($rootScope,$http){
//
//
//	$rootScope.logout=function(){
//		$http.get('/auth/logout');
//		$rootScope.authenticate=false;
//		$rootScope.currentUser="";
//	}
//
//});

app.config(function($routeProvider,ACCESS_LEVELS) {
	$routeProvider
		.when('/',{
			templateUrl:'tpls/index.html',
			controller: 'indexController',
			access_level:ACCESS_LEVELS.publicAuth
		})
		.when('/register',{
			templateUrl:'tpls/register.html',
			controller:'registerController',
			access_level:ACCESS_LEVELS.publicAuth
		})
		.when('/showList', {
			templateUrl:'tpls/showList.html',
			controller: 'showListController',
			access_level:ACCESS_LEVELS.publicAuth
		})
		.when('/showUsers',
			{templateUrl:'tpls/showUsers.html',
			controller: 'showUsersController'
		})
		.when('/users/show/:id',{
			templateUrl:'tpls/users/show.html',
			controller: 'showController',
			access_level:ACCESS_LEVELS.publicAuth
		})
		.when('/profile',{
			templateUrl:'tpls/users/profile.html',
			controller: 'mainController',
			access_level:ACCESS_LEVELS.userAuth
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


app.factory('Auth',function(localStorageService,ACCESS_LEVELS){
	var _user=localStorageService.get('user');
	var setUser=function(user){
		if(!user.role||user.role<0){
			user.role=ACCESS_LEVELS.publicAuth;
		}
		_user=user;
		console.log("SetUser!")
		localStorageService.set('user',_user);
	};
	return{
		isAuthorized:function(lvl){
			if(_user)
				return _user.role>=lvl;
			else
			 	return false;
		},
		setToken:function(token){
			if(token){
				_user.token=token;
			}
		},
		setUser:setUser,
		isLoggedIn:function(){
			return _user?true:false;
		},
		getUser:function(){
			return _user;
		},
		getId:function(){
			return _user?_user._id:null;
		},
		getToken:function(){
			return _user?_user.token:'';
		},
		logout:function(){
			localStorageService.set('user',"");
			_user=null;
		}
	}
});
app.run(function($rootScope,$location,Auth){
	$rootScope.$on('$rootChangeStart',function(evt,next,curr){
		if(!Auth.isAuthorized(next.$$route.access_level)){
			console.log("Debug_rootChangeStart")
			if(Auth.isLoggedIn()){
				$location.path(next);
			}else{
				$location.path('/')
			}
		}
	})
})
app.factory('photosService',function($http){
	var photosList=[];
	return {
		getPhotoList:function(){
			$http.get('/user/photosList').success(function(data){
				photosList=data;
			}).error(function(error){
				console.log("Error");
			});
		}
	}
});
app.controller('mainController', function($rootScope,$location,$q,$http,$scope,localStorageService){
	$scope.username=localStorageService.get('user');
	$('.ui.checkbox').checkbox();
	$scope.profile={
		"username":"",
		"photos":"",
		"group":"",
		"slogen":"",
		"realname":''
	};
	if($scope.username.username){
		// 获取主页数据
		$http.get('/user/profile').success(function(data){
			console.log(data);
			$scope.profile.username=data.username;
			$scope.profile.photos=data.photoUrl;
			$scope.profile.group=data.group;
			$scope.profile.slogen=data.slogen;
			$scope.profile.realname=data.realname;
		});
	}
	else{
		$location.path("/");
	}
	$scope.photosList=['/image/photos/lucy.jpg','/image/photos/steve.jpg'];
	$scope.changePhotos=function(){
		$scope.profile.photos=$scope.photosList[0];
	}

	$scope.logout=function(){
		localStorageService.set('user','');
		$http.get('/auth/logout');
		$location.path("/");
	};
	$scope.showEditProfile=function(){
		$('.ui.modal').modal('show');
	};

	$scope.submitProfile=function(){
		console.log($scope.profile);
		$http.put('/user/profile',$scope.profile).success(function(data){
			console.log(data);
		}).error(function(err){
			console.log(err);
		});
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
				localStorageService.set('user',data.user);
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




app.controller('indexController', function($scope,$rootScope,$http,$location,Auth,localStorageService){
	if(localStorageService.get('user'))
	{
		$location.path('/profile');
	}

	$scope.viweClass="indexClass";
	$scope.user={username:"",password:""};
	$scope.error_message="";
	$scope.showWarning=1;
	$scope.login=function(){
		$http.post('/auth/login',$scope.user).success(function(data){
			console.log(data);
			if(data.user){
				Auth.setUser(data.user);
			    console.log(data.user);
				$location.path('/profile');
			}
			//if(data.user){
			//$rootScope.authenticate=true;
			//$rootScope.user=data.user.username;
			//localStorageService.set('username',data.user.username);
			//$location.path('/profile');
			//}else{
			//	$rootScope.authenticate=false;
			//	$scope.error_message=data;
			//}

		}).error(function(data){
			$scope.showWarning=0;
			$scope.error_message=data;
		});
	}
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
