'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the publicApp
 */
 angular.module('publicApp')
 .controller('LoginCtrl', function (REST, $location, $scope) {
 	if(REST.isConnected()){
 		$location.path('/');
 	}else{

 		$scope.login=function(){
 			var info=$scope.user;
 			info.session=$scope.user.email;
 			REST.login(info)
 			.success(function(data){
 				REST.ok();
 				$location.path('/profile');
 				$location.path('/dashboard');
 			})
 			.error(function(data){
 				toastr.error(data, 'Authentication failed');
 				$scope.user={};
 			});
 		}
 	}
 	
 });
