'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:GroupDetailCtrl
 * @description
 * # GroupDetailCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('GroupDetailCtrl', function ($location,$scope, Authentication) {
    if(Authentication.isConnected()){
      var url = $location.url();
      var allGroups;
      //console.dir(url);
      Authentication.getUser()
        .then(function successCallback(response) {
          allGroups=response.data[0].groups;
          var temp=url.split("/");
          var id=temp[2].split("#");
          if(Array.isArray(id)){
            id=id[0];
          }
          var groupCurrent = allGroups[id];
          console.dir(response.data[0].expenses);
          $scope.name=groupCurrent.name;
          $scope.hash=id;
          $scope.bills=response.data[0].expenses;

          $scope.newBill=function(){
            $scope.groupbill.groupid=groupCurrent.id;
            Authentication.newBill($scope.groupbill)
            .success(function(data){
             $scope.bills.push($scope.groupbill); 
            toastr.success('Bill successfuly created!', 'Splitwise');
            })
            .error(function(data){
            toastr.error(data, 'Add Bill failed');
        });
            //console.dir($scope.bills);
      }

        });
        
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
