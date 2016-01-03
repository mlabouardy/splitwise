'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('GroupsCtrl', function ($scope, Authentication,$location) {
  		if(Authentication.isConnected()){
  			Authentication.getUser()
  			.then(function successCallback(response) {
    			$scope.groups=response.data[0].groups;
          $scope.bills=response.data[0].expenses;
          var url=$location.url().split("/");
          console.dir(url);
          var id=url[1].split("#");
          if(Array.isArray(id)){
            id=id[1];
            console.dir(id);
            var temp= $scope.bills;
            var res=temp.filter(function(i) {
            return i != temp[id];
            });
            if (typeof id != undefined ) {$scope.bills =res;};
            }
          
  			});
	    }else{
	      $location.path('/');
	    }
  });
