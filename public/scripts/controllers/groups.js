'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('GroupsCtrl', function ($scope, REST,$location) {
  		if(REST.isConnected()){

        var refresh=function(){
          REST.getGroups()
          .success(function(groups){
            $scope.groups=groups;
          })
          .error(function(){

          });
        }

        refresh();
        

        $scope.delete=function(id){
          REST.deleteGroup(id)
            .success(function(){
              refresh();
            })
            .error(function(){

            });
        }
	    }else{
	      $location.path('/');
	    }
  });
