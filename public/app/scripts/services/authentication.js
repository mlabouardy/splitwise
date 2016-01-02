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
                  return $http.post(API_URL+'/addGroup',data); 
        },
        newFriend:function(data){
                  return $http.post(API_URL+'/addFriend',data); 
        },
        groups:function(){
            return $http.get(API_URL+'/groups'); 
        },
        profile:function(data){
            return $http.post(API_URL+'/profile',data);
        },
        ok:function(){
            connected=true;
        }
     }
  });
