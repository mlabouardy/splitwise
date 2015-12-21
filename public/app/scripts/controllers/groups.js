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
	      $scope.groups=[
			    	{id:1, name:"Group 1"},
			    	{id:2, name:"Group 2"},
			    	{id:3, name:"Group 3"},
			    	{id:4, name:"Group 4"}
			    ];
	    }else{
	      $location.path('/');
	    }
  });
