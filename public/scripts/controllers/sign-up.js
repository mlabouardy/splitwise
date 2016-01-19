'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:SignUpCtrl
 * @description
 * # SignUpCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('SignUpCtrl', function ($scope, GooglePlus, REST, $location) {
    /*$scope.login = function () {
          GooglePlus.login().then(function (authResult) {
              console.log(authResult);
  
              GooglePlus.getUser().then(function (user) {
                  console.log(user);
              });
          }, function (err) {
              console.log(err);
          });
        };*/
        if(REST.isConnected()){
          $location.path('/');
        }else{
          $scope.register=function(){
            REST.register($scope.user)
              .success(function(data){
                $location.path('/login');
              })
              .error(function(data){
                var msg="";
                for(var i=0;i<data.length;i++)
                  msg+=data[i]+"\n";
                toastr.error(msg, 'Registration failed');
                $scope.user={};
              });
          }
        }
  });
