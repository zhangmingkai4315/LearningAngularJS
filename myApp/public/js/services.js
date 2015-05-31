var services=angular.module("myApp.services",[]);
services.factory('HitService',function($q,$http){
   var service={
       count:function(){
           var d=$q.defer();
           $http.get('/hits').success(function(data){
               d.resolve(data.hits);
           }).error(function (error) {
               d.reject(error);
           });
           return d.promise;
       },
       registerHit:function(){
           var d=$q.defer();
           $http.post('/hit',{}).success(function(data){
               d.resolve(data.hits);
           }).error(function(error){
               d.reject(error);
           });
           return d.promise;
       }
   }


    return service;
});