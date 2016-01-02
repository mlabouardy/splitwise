'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('ProfileCtrl', function ($scope,Authentication, $location) {
  	if(Authentication.isConnected()){
  		$scope.name="";
  		Authentication.getUser()
        .then(function successCallback(response) {
        	$scope.user=response.data[0];
          	$scope.name=response.data[0].firstName;
         });
	   //$(":file").filestyle({input: false,size: "sm", buttonText: "Choose picture",badge:false});
	   $scope.update=function(){
            Authentication.profile($scope.user)
              .success(function(data){
                //$location.path('/login');
                toastr.success('update profile', 'Splitwise');
              })
              .error(function(data){
                var msg="";
                for(var i=0;i<data.length;i++)
                  msg+=data[i]+"\n";
                toastr.error(msg, 'Registration failed');
                $scope.user={};
              });
          }
	}else{
	   $location.path('/');
	}
  });
