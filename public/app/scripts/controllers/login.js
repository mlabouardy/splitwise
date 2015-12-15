'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('LoginCtrl', function (Authentication, $location) {
    Authentication.login();
    $location.path('/');
  });
