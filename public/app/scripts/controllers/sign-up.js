'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:SignUpCtrl
 * @description
 * # SignUpCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('SignUpCtrl', function ($scope, GooglePlus, Authentication, $location) {
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
        if(Authentication.isConnected()){
          $location.path('/');
        }else{
          $scope.register=function(){
            Authentication.register($scope.user)
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
