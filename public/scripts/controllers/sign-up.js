'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:SignUpCtrl
 * @description
 * # SignUpCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('SignUpCtrl', function($scope, GooglePlus, REST, $location) {


    REST.isConnected()
      .success(function(data) {
        $location.path('/');

      }).error(function(data) {

        $scope.register = function() {
          REST.register($scope.user)
            .success(function(data) {
              $location.path('/login');
            })
            .error(function(data) {
              var msg = "";
              for (var i = 0; i < data.length; i++)
                msg += data[i] + "\n";
              toastr.error(msg, 'Registration failed');
              $scope.user = {};
            });
        }

      });


  });