'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:GroupDetailCtrl
 * @description
 * # GroupDetailCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('GroupDetailCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.tabs = [
        { title: "Balances", content:"main.tab1"},
        { title: "Upcoming Bills", content:"main.tab2" },
        { title: "Trends", content:"main.tab3"},
        { title: "Whiteboards", content:"main.tab3"},
        { title: "Settings", content:"main.tab3"}
    ];
 
  });
