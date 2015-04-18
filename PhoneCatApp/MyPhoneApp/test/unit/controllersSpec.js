describe('PhoneListCtrl',function(){
	beforeEach(module('MyPhoneApp'));
	it('Should create "Phone" model with 3 phones',inject(function($controller){
		var scope={};
		ctrl=new $controller('PhoneListCtrl',{$scope:scope});
		expect(scope.phones.length).toBe(3);
	}));
});


