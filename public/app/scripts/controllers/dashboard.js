'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('DashboardCtrl', function ($scope) {
    	$scope.newGroup=function(){
    		toastr.success('Group successfuly created!', 'Splitwise');
    	}
  });
