var MyPhoneApp=angular.module('MyPhoneApp', []);
MyPhoneApp.controller('PhoneListCtrl', function($scope){
	$scope.phones=[{
		'name':'Nexus S',
		'snippet':'Fast Just Got Faster With Nexus S'
	},{
		'name':'Motorola Xoom',
		'snippet':'The next,next generation tablet'
	},{
		'name':'Moto Phone',
		'snippet':'The best phone forever'
	}
	];
});