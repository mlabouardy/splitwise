'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:FriendInviteCtrl
 * @description
 * # FriendInviteCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('FriendInviteCtrl', function (Authentication, $scope) {
    if(Authentication.isConnected()){
    	$scope.tabs = [
            { title: "Balances", content:"main.tab1"},
            { title: "Upcoming Bills", content:"main.tab2" },
            { title: "Trends", content:"main.tab3"},
            { title: "Whiteboards", content:"main.tab3"},
            { title: "Settings", content:"main.tab3"}
        ];
    }else{
    	$location.path('/');
    }
  });
