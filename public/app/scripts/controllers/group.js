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
           var groupCurrent;
          for (var i = 0; i < allGroups.length; i++) {
            if(allGroups[i]._id==id){
              groupCurrent=allGroups[i];
            }
          };
          //console.dir(response.data[0].expenses);
          $scope.name=groupCurrent.name;
          $scope.hash=id;
          $scope.friends=response.data[0].friends;
          $scope.friends.push({"id":-1,"email":"MOI"});
         
          console.dir(groupCurrent);
          $scope.bills=groupCurrent.bills; //response.data[0].expenses;
          $scope.price=[];
          $scope.setDesc= function(bill) {
          $scope.desc=bill.desc;
          $scope.total=bill.price;
          //}
          $scope.splitBill= function(){
            console.dir($scope.price);
            var tot=0;
            var rpmt={};
            rpmt.desc=[];
            for (var i = 0; i < $scope.price.length; i++) {
              if (!isNaN(parseInt($scope.price[i]))) {
              tot+=parseInt($scope.price[i]);
              rpmt.desc.push({"friend":$scope.friends[i],
                              "cash":$scope.price[i]});

              };

            };
            if(tot==$scope.total){

            rpmt.expenses=bill;
            Authentication.newRepayment(rpmt)
            .success(function(data){
            toastr.success('newRepayment created!', 'Splitwise');
            })
            .error(function(data){
            toastr.error(data, ' add repayment  failed');
        });
              toastr.success('Good !', 'Splitwise');
           }
            else{
              toastr.error('total not OK');
            }
          }
        }
          $scope.newBill=function(){
            $scope.groupbill.groupid=groupCurrent._id;
            Authentication.newBill($scope.groupbill)
            .success(function(data){
             var temp= $scope.groupbill;
             temp.groupname=$scope.name;
             var now = new Date(Date.now());
            var dd = now.getDate();
            var mm = now.getMonth()+1; //January is 0!

            var yyyy = now.getFullYear();
            if(dd<10){
              dd='0'+dd
            }
            if(mm<10){
               mm='0'+mm
             }
             var today = dd+'/'+mm+'/'+yyyy;
             temp.date=today;
             $scope.bills.push(temp);
            // $location.path(url);
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
            { title: "Upcoming Bills", content:"main.tab2"},
            { title: "Trends", content:"main.tab3"},
            { title: "Whiteboards", content:"main.tab3"},
            { title: "Settings", content:"main.tab3"}
        ];
    }else{
      $location.path('/');
    }
  });
