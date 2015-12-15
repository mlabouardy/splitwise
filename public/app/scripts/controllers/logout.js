'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('LogoutCtrl', function (Authentication, $location) {
    if(Authentication.isConnected()){
    	Authentication.logout();
    }
    $location.path('/');
  });
