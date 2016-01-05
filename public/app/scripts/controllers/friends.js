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
          var expenses=[];
          console.dir(response.data[0].repayments);
          for(var i in response.data[0].repayments){
            expenses.push(response.data[0].repayments[i].expenses);
            //console.dir(response.data[0].repayments[i]);
            console.dir(i);
          }
          $scope.repayments=expenses;
          expenses=[];
        });
	    }else{
	      $location.path('/');
	    }
  });
