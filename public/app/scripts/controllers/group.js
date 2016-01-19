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
          $scope.name=groupCurrent.name;
          $scope.hash=id;
          $scope.friends=response.data[0].friends;
          $scope.friends.push({"id":-1,"email":response.data[0].email});
          $scope.paid=false;


          
          $scope.bills=groupCurrent.bills; 
          $scope.price=[];
          $scope.setDesc= function(bill) {
          $scope.desc=bill.desc; 
          $scope.total=bill.price;
          $scope.paid=bill.paid;

          Authentication.getBill(bill.desc)
          .then(function successCallback(response){
            if(response.data[0]!=undefined){
            var repayments = response.data[0].details;
            for (var i in repayments) {
              console.dir(repayments[i]);
              for (var j = 0; j < $scope.friends.length; j++) {
                if(repayments[i].friend.email == $scope.friends[j].email){
                  $scope.friends[j].cash = repayments[i].cash;
                }
              }

            }
            }
            else{
              for (var j = 0; j < $scope.friends.length; j++) {
                
                 $scope.friends[j].cash = 0;
                
              }

            }
          
          });

          $scope.splitBill= function(){
            var tot=0;
            var rpmt={};
            rpmt.details=[];
            rpmt.expenses={};
            console.log("price");
            console.dir($scope.price)
            for (var i = 0; i < $scope.price.length; i++) {
              if (!isNaN(parseInt($scope.price[i]))) {
              tot+=parseInt($scope.price[i]);

              $scope.friends[i].cash=$scope.price[i];
              rpmt.details.push({"friend":$scope.friends[i],
                              "cash":$scope.price[i]});

              }
              else{

                $scope.price[i]=$scope.friends[i].cash;
                if (!isNaN(parseInt($scope.friends[i].cash))){
                  tot+=parseInt($scope.friends[i].cash);
                }  
                  rpmt.details.push({"friend":$scope.friends[i],
                              "cash":$scope.friends[i].cash});

              }

            }
            console.log("tot"+ tot);
            //console.dir(tot);
            if(tot<=$scope.total){
              console.log("ok")
            rpmt.expenses.group_name=groupCurrent.name;
            rpmt.expenses.bill_desc=bill.desc;
            rpmt.expenses.bill_price=bill.price;
            rpmt.expenses.bill_paid=false;
            
            if (tot==$scope.total) {
              rpmt.expenses.bill_paid=true;
            }
            console.dir(rpmt);
            Authentication.newRepayment(rpmt)
            .success(function(data){
            toastr.info('Send bill to your friends', 'Splitwise');
            })
            .error(function(data){
            toastr.error(data, ' add repayment  failed');
        });
              toastr.success('Good !', 'Splitwise');
           }
            else{
              console.dir(tot);
              console.dir($scope.price);
              toastr.error(tot,'You pay too much');
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
            toastr.success('Bill successfuly created!', 'Splitwise');
            })
            .error(function(data){
            toastr.error(data, 'Add Bill failed');
        });
      }

    });




      $scope.tabs = [
            { title: "Balances", content:"main.tab1"},
            { title: "Upcoming Bills", content:"main.tab2"},
            { title: "Trends", content:"main.tab3"},
            { title: "Whiteboards", content:"main.tab3"},
            { title: "Settings", content:"main.tab3"}
        ];
    }
    else{
      $location.path('/');
    }
  });
