'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('ProfileCtrl', function (Authentication, $location) {
  	if(Authentication.isConnected()){
	   $(":file").filestyle({input: false,size: "sm", buttonText: "Choose picture",badge:false});
	}else{
	   $location.path('/');
	}
  });
