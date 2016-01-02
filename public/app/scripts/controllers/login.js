'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the publicApp
 */
 angular.module('publicApp')
 .controller('LoginCtrl', function (Authentication, $location, $scope) {
 	if(Authentication.isConnected()){
 		$location.path('/');
 	}else{

 		$scope.login=function(){
 			var info=$scope.user;
 			info.session=$scope.user.email;
 			console.dir(info);
 			Authentication.login(info)
 			.success(function(data){
 				Authentication.ok();
 				$location.path('/dashboard');
 			})
 			.error(function(data){
 				toastr.error(data, 'Authentication failed');
 				$scope.user={};
 			});
 		}
 	}
 	
 });
