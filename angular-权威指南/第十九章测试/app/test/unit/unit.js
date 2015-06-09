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
