browser().reload();
browser().window().href();
browser().window().hash();
browser().window().path();
browser().window().search();
browser().location().url();

expect(browser().location().path()).toBe('/');

element("input", "input elements").count();
element("button", "submit button").click();

element("a","all links").query(function(elements,done){
    angular.forEach(elements,function(ele){
        expect(ele.attr('ng-click')).toBeDefined();
    });
});

element("button","submit button").val();
element("button","submit button").val("Enter");

element("div","signup box").height();
element("div","signup box").height('200px');

element("div", "signup box").width('300px')

element(".logo", "our logo").position()
element(".logo", "our logo").position("absolute")
element("#signup_form", "signup form").scrollLeft();
element("#signup_form", "signup form").scrollLeft(0);

element("div", "signup box").css('border-color')
element("div", "signup box").attr('width')

//都是可以同时设置和获取的对象


//对于angular的测试 可以使用如下的方式进行
//<input type="text" ng-model="name"/>

it("Should update the name",function(){
    using('.form').input('name').enter('Ari');
    expect(using('.form').binging('name')).toBe("Ari");
});
//<input type="radio" ng-model="color" value="red" />
//<input type="radio" ng-model="color" value="blue" />
//<input type="radio" ng-model="color" value="yellow" />

input('color').select('red');
input('color').val();  //red

//<select ng-model="color"
//ng-options="c.name for c in colors">
//<option value="">Pick your favorite color"</option>
//</select>

select('color').option('red');
select('color').options('red','blue');

//<table id="phonebook">
//<tr ng-repeat="person in people">
//<td>{{ person.name }}</td>
//<td>{{ person.email }}</td>
//</tr>
//</table>

repeater('#phonebook tr').column('person.name')
repeater('#phonebook tr').count()




