'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('GroupsCtrl', function ($scope, Authentication) {
  		if(Authentication.isConnected()){
  			Authentication.getUser()
  			.then(function successCallback(response) {
    			$scope.groups=response.data[0].groups;
  			});
	    }else{
	      $location.path('/');
	    }
  });
