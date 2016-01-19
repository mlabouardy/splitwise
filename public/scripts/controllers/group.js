'use strict';

/**
* @ngdoc function
* @name publicApp.controller:GroupDetailCtrl
* @description
* # GroupDetailCtrl
* Controller of the publicApp
*/
angular.module('publicApp')
.controller('GroupDetailCtrl', function($location, $scope, REST, $routeParams) {
  if (REST.isConnected()) {
    
    var id = $routeParams.id;
    
    var draw=function(){
      var ctx = document.getElementById("myChart").getContext("2d");
      var myNewChart = new Chart(ctx).Pie($scope.whiteboards);
    }
    
    function getDate(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      if(dd<10)
        dd='0'+dd
      if(mm<10)
        mm='0'+mm
      var data={
            year:yyyy,
            month:mm,
            day:dd
        };
      return data;
    }

    function convertDate(d){
        d=new Date(d);
        var mm=d.getMonth()+1;
        var dd=d.getDate();
        var yyyy=d.getFullYear();
        if(dd<10)
            dd='0'+dd
        if(mm<10)
            mm='0'+mm
        var data={
            year:yyyy,
            month:mm,
            day:dd
        };
        return data;
    }

    function compare(d){
        var datenow=getDate();
        var datebill=convertDate(d);
        var upcoming=false;
        if(datenow.year<datebill.year)
            upcoming=true;
        else{
            if(datenow.year==datebill.year){
                if(datenow.month<datebill.month)
                    upcoming=true;
                else if(datenow.month==datebill.month){
                    if(datenow.day<datebill.day)
                        upcoming=true;
                }
            }
        }
        return upcoming;
    }
    
    REST.group(id)
    .success(function(group) {
      $scope.group = group;
    })
    .error(function(group) {
      
    });
    
    $scope.rename = function() {
      var data = {
        name: $scope.name,
        id: id
      };
      REST.renameGroup(data)
      .success(function() {
        $scope.group.name = $scope.name;
        toastr.success('Group successfuly renamed !','Splitwise');
      })
      .error(function() {
        toastr.error('Something went wrong','Splitwise');
      });
    }
    
    $scope.delete = function(id) {
      var data = {
        id_user: id,
        id_group: $routeParams.id
      };
      REST.deleteUserFromGroup(data)
      .success(function() {
        
      })
      .error(function() {
        
      });
      
    }
    
    var refreshCurrentBill = function() {
      $scope.currentBill = {
        date: new Date(),
        description: '',
        price: '',
        groupId: id
      };
    }
    
    $scope.refreshSettleUp = function(){
      $scope.settleup = {
        bill : '',
        friends : '',
        show : false
      };
    }
    
    $scope.friendList = function(bill) {
      REST.getUsersDetails(id,bill._id)
      .success(function(result) {
        $scope.settleup = {
          bill : bill,
          friends : result,
          show : true
        }
      })
      .error(function(result) {
      });
    }
    
    $scope.updateCurrentBill = function(){
      var data = {
        groupId : id,
        billId : $scope.settleup.bill._id,
        friends : $scope.settleup.friends
      }
      REST.updateCurrentBill(data)
      .success(function(msg) {
        refreshBillList();
        toastr.success(msg);
      })
      .error(function(err) {
        refreshBillList();
        toastr.error(err);
      });
    }
    
    var refreshBillList = function() {
      REST.getBillList(id).success(function(data) {
        $scope.bills = data;
        $scope.whiteboards=[
          {
            value: 0,
            label: 'Unpaid bills',
            color: '#C9302C'
          },
          {
            value: 0,
            label: 'Paid bills',
            color: '#5BC5A7'
          }];
          $scope.upComingBills=[];
          for(var i=0;i<$scope.bills.length;i++){
            var bill=$scope.bills[i];
            if(bill.paid)
                $scope.whiteboards[1].value++;
            else
                $scope.whiteboards[0].value++;
            if(compare(bill.date))
                $scope.upComingBills.push(bill);
          }
          console.log($scope.upComingBills);
          draw();
        }).error(function() {
          
        });
      }

      
      refreshCurrentBill();
      refreshBillList();
      
      $scope.newBill = function() {
        
        REST.newBill($scope.currentBill).success(function() {
          refreshCurrentBill();
          refreshBillList();
        }).error(function() {
          
        });
      }
      
      $scope.deleteBill = function(billId) {
        REST.deleteBill(id, billId).success(function() {
          refreshBillList();
        }).error(function() {});
      }
      
    } else {
      $location.path('/');
    }
  });
