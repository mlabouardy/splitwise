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
     var session="";

     return{
     	isConnected:function(){
     		return connected; 
     	},
     	logout:function(){
            connected=false;
     		return $http.get(API_URL+'/logout'); 
     	},
     	login:function(data){
           session=data.session;
           return $http.post(API_URL+'/login',data); 
     	},
        register:function(data){
            return $http.post(API_URL+'/register',data);
        },
        newBill:function(data){
            data.session=session;
            return $http.post(API_URL+'/addBill',data); 
        },
        newRepayment:function(data){
            data.session=session;
            return $http.post(API_URL+'/addRepayment',data); 
        },
        newGroup:function(data){
            data.session=session;
            return $http.post(API_URL+'/addGroup',data); 
        },
        newFriend:function(data){
            data.session=session;
            return $http.post(API_URL+'/addFriend',data); 
        },
        getUser:function(){
            return $http.get(API_URL+'/user/:'+session);  
        },
        profile:function(data){
            data.session=session;
            return $http.post(API_URL+'/profile',data);
        },
        updateBill:function(data){
            data.session=session;
            return $http.post(API_URL+'/updateExpenses',data);
        },
        ok:function(){
            connected=true;
        }
     }
  });
