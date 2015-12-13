'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:SignUpCtrl
 * @description
 * # SignUpCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('SignUpCtrl', function ($scope, GooglePlus) {
    $scope.login = function () {
          GooglePlus.login().then(function (authResult) {
              console.log(authResult);
  
              GooglePlus.getUser().then(function (user) {
                  console.log(user);
              });
          }, function (err) {
              console.log(err);
          });
        };
  });
