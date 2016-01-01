'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('DashboardCtrl', function ($scope, Authentication) {
	if(Authentication.isConnected()){
    	$scope.newGroup=function(){
    		Authentication.newGroup({name:$scope.groupname})
    		.success(function(data){
 				toastr.success('Group successfuly created!', 'Splitwise');
 			})
 			.error(function(data){
 				toastr.error(data, 'Add group failed');
 				$scope.user={};
 			});
	    }
      //toastr.success('Group successfuly created!', 'Splitwise');
    }else{
    	$location.path('/');
    }
  });
