'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('FriendsCtrl', function ($scope, Authentication) {
  		if(Authentication.isConnected()){
  			Authentication.getUser()
  			.then(function successCallback(response) {
    			$scope.friends=response.data[0].friends;
  			});
	    }else{
	      $location.path('/');
	    }
  });
