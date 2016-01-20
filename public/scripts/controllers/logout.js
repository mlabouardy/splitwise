'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('LogoutCtrl', function ($scope, REST, $location) {
    REST.logout()
    	.success(function(data){
    			$location.path('/');
    		});	
  });
