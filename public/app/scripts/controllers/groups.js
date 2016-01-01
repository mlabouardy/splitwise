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
  			//$scope.groups=[];
  		Authentication.groups()
  		.then(function successCallback(response) {
    		console.dir(response.data[0].groups);
    		console.dir(response.data);
    		//var scoopGroup={id:0,name:""};
    		//var groupArray=response.data[0].groups;
  			$scope.groups=response.data[0].groups;
  			console.dir($scope.groups);
  		});
	      //$scope.groups=[
			//    	{id:1, name:"Group 1"},
			  //  	{id:2, name:"Group 2"},
			    //	{id:3, name:"Group 3"},
			    //	{id:4, name:"Group 4"}
			    //];
	    }else{
	      $location.path('/');
	    }
  });
