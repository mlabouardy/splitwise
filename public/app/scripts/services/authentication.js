'use strict';

/**
 * @ngdoc service
 * @name publicApp.Authentication
 * @description
 * # Authentication
 * Service in the publicApp.
 */
angular.module('publicApp')
  .service('Authentication', function () {
     var connected=true;

     return{
     	isConnected:function(){
     		return connected;
     	},
     	logout:function(){
     		connected=false;
     	},
     	login:function(){
     		connected=true;
     	}
     }
  });
