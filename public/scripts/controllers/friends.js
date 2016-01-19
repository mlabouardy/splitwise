'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('FriendsCtrl', function ($scope, REST) {
  		if(REST.isConnected()){

        var friends=function(){
          REST.friends()
            .success(function(friends){
              $scope.friends=friends;
            })
            .error(function(){

            });
        }

        friends();
  			

        $scope.delete=function(id){
          REST.deleteFriend(id)
            .success(function(){
              friends();
            })
            .error(function(){
              toastr.error('Something went wrong', 'Splitewise');
            });
        }
	    }else{
	      $location.path('/');
	    }
  });
