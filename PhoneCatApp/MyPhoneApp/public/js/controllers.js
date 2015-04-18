var MyPhoneApp=angular.module('MyPhoneApp', []);
MyPhoneApp.controller('PhoneListCtrl', function($scope){
	$scope.phones=[{
		'name':'Nexus S',
		'snippet':'Fast Just Got Faster With Nexus S',
		'age':2011
	},{
		'name':'Motorola Xoom',
		'snippet':'The next,next generation tablet',
		'age':2014
	},{
		'name':'Moto Phone',
		'snippet':'The best phone forever',
		'age':2012
	}
	];
});