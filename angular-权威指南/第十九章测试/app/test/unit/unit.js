describe("A spec suite",function(){
    it("contains a passing spec",function(){
        expect(true).toBe(true);
    });
});



describe("A spec suite-2",function(){
    it("contains a passing spec",function(){
        var vlaue=10;
        expect(vlaue).toEqual(10);
    });
});


describe("A spec suite-3",function(){
    it("contains a passing spec",function(){
        var value="<h3>Header element: welcome</h3>";
        expect(value).toMatch(/welcome/);
        expect(value).toMatch('welcome');
        expect(value).not.toMatch('goodbey');
    });
});


describe("A spect suite-4",function(){
    it("contains a passing spec",function(){
        var value=10;
        undefined_value=undefined;
        expect(undefined_value).toBeUndefined();
        expect(value).not.toBeUndefined();
    });
});


describe("A spect suite-5",function(){
    it("contains a passing spec",function(){
        var value=null;
        expect(value).toBeNull();
    });
});

describe("A spect suite-5",function(){
    it("contains a passing spec",function(){
        var value=true;
        expect(value).toBeTruthy();
        //expect(value).toBeFalsy();
    });
});


describe("A spect suite-6",function(){
    it("contains a passing spec",function(){
        var value=[1,2,3,4];
        expect(value).toContain(4);
    });
});


describe("A spect suite-7",function(){
    it("contains a passing spec",function(){
        var value=100;
        expect(value).toBeLessThan(400);
        expect(value).toBeGreaterThan(40);
    });
});

describe("A spect suite-8",function(){
    it("contains a passing spec",function(){
        var value=100.002;
        expect(value).toBeCloseTo(100,2);
    });
});

//"use strict"
//describe("A spect suite-10",function(){
//    it("contains a passing spec",function(){
//
//        expect(function(){
//            return a+10;
//        }).toThrow();
//    });
//});


//describe("A spect suite-10-diy",function(){
//    this.addMatchers({
//        toBelessThanOrEqual:function(expected){
//            return this.actual<=expected;
//        }
//    });
//    //...可以直接使用自定义的测试代码
//    it("contains a passing spec",function() {
//        var value = 10;
//        expect(value).toBelessThanOrEqual(10);
//        expect(value).toBelessThanOrEqual(12);
//
//    });
//});



//定义测试之前的初始化

describe("A spect suite-10",function(){
    var message;
    beforeEach(function(){
        message="hello";
    })
    //...可以直接使用自定义的测试代码
    it("contains a passing spec",function() {
        var value = "world";
        expect(message+value).toMatch("owo");
    });
    afterEach(function() {
        message = null;
    });
});



describe('Routes tests',function(){
    beforeEach(module('MyApp'));
    var location,route,rootScope;
    beforeEach(inject(function(_$location_,_$route_,_$rootScope_){
        location=_$location_;
        rootScope=_$rootScope_;
        route=_$route_;

    }));
    describe("index router",function(){
        beforeEach(inject(
            function($httpBackend) {
                $httpBackend.expectGET('views/main.html')
                    .respond(200, 'main HTML');
        }));
        it('should load the index page on successful load of /',function(){
            location.path('/');
            rootScope.$digest();
            expect(route.current.controller).toBe('HomeController');
            it("should redirect to the index path on non-existent route",function(){
                location.path('/defindjkdffff');
                rootScope.$digest();
                expect(route.current.controller).toBe("HomeController");
            });
     });
    });
});


describe('PasswordController',function(){
    beforeEach(module('app'));
    var $controller;
    beforeEach(inject(function(_$controller_){
       $controller=_$controller_;
    }));

    describe("$scope.grade",function(){
        var $scope,controller;
        beforeEach(function(){
            $scope = {};
            controller = $controller('PasswordController', { $scope: $scope });
        });
        it('sets the strength to strong if the length is >8',function(){

            $scope.password = 'longerthaneightchars';
            $scope.grade();
            expect($scope.strength).toEqual('strong');
        });
        it('sets the strength to "weak" if the password length <3 chars', function() {

            $scope.password = 'a';
            $scope.grade();
            expect($scope.strength).toEqual('weak');
        });
    });

//对于Filter的测试
    describe('length filter', function() {

        beforeEach(inject(function(_$filter_){
            $filter= _$filter_;
        }));

        it('returns 0 when given null', function() {
            var length = $filter('length');
            expect(length(null)).toEqual(0);
        });

        it('returns the correct value when given a string of chars', function() {
            var length = $filter('length');
            expect(length('abc')).toEqual(3);
        });
    });


    describe("Directive test",function(){
        var $compile,$rootScope;
        beforeEach(inject(function(_$compile_,_$rootScope_){
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));
        it('Replaces the element with the appropriate content', function() {
            // Compile a piece of HTML containing the directive
            var element = $compile("<a-great-eye></a-great-eye>")($rootScope);
            $rootScope.$digest();
            expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
        });
    })




});

