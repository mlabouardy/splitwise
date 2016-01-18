'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('GroupsCtrl', function ($scope, Authentication,$location) {
  		if(Authentication.isConnected()){
  			Authentication.getUser()
  			.then(function successCallback(response) {
    			$scope.groups=response.data[0].groups;
          $scope.bills=[];
           for (var i = 0; i < $scope.groups.length; i++) {
            var bill = $scope.groups[i].bills;
            for (var j = 0; j < bill.length; j++) {
              bill[j].groupname=$scope.groups[i].name;

              $scope.bills.push(bill[j]);
            };
          };
          //$scope.bills=response.data[0].expenses;
          var url=$location.url().split("/");
          var id=url[1].split("#");
          if(Array.isArray(id)){
            id=id[1];
            var temp= $scope.bills;
            var res=temp.filter(function(i) {
            return i != temp[id];
            });
            if (undefined != id) {
              $scope.bills =res;
              Authentication.updateBill({"expenses":$scope.bills})
              .success(function(data){
                toastr.success('Bill successfuly removed!', 'Splitwise');
              })
              .error(function(data){
              toastr.error(data, 'remove Bill failed');
              });
            }
          }

  			});
	    }else{
	      $location.path('/');
	    }
  });
