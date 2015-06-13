describe('homepage Add value', function() {

    it('should open a website', function() {
        browser.get('http://localhost:3000');
        expect(browser.getTitle()).toEqual("MyApp WebSite");
    });
    it("should add a number",function(){
        browser.get('http://localhost:3000');
        var value=element(by.binding('hits')).getText();
        //增加点击操作
        element(by.id('hitme')).click();

        var newValue=element(by.binding('hits')).getText();

        expect(newValue).toEqual(value);
    });

});