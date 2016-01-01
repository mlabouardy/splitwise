'use strict';

/**
 * @ngdoc service
 * @name publicApp.Authentication
 * @description
 * # Authentication
 * Service in the publicApp.
 */
angular.module('publicApp')
  .service('Authentication', function ($http) {

     var connected=false;

     return{
     	isConnected:function(){
     		return connected; 
     	},
     	logout:function(){
            connected=false;
     		return $http.get(API_URL+'/logout'); 
     	},
     	login:function(data){
           return $http.post(API_URL+'/login',data); 
     	},
        register:function(data){
            return $http.post(API_URL+'/register',data);
        },
        newGroup:function(data){
            console.log("Auth...newGroup :"+data);
            var req=$http.post(API_URL+'/addGroup',data,{headers:{'Access-Control-Allow-Origin':"*",
                'Accept': "application/json, text/plain, */*",
                'Access-Control-Allow-Headers':"Origin, X-Requested-With, Content-Type, Accept",
                'Content-Type': "application/json;charset=utf-8"}});
             //console.dir($http.post(API_URL+'/login',data)); 
            //console.dir(req.$$state);
            //console.dir(req);
           return $http.post(API_URL+'/addGroup',data); 
        },
        groups:function(){
            return $http.get(API_URL+'/groups'); 
        },
        ok:function(){
            connected=true;
        }
     }
  });
