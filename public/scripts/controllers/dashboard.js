'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
    .controller('DashboardCtrl', function($scope, REST) {

        if (REST.isConnected()) {
            $scope.groups = [];

            toastr.success('Welcome to Splitwise!', 'Splitwise');

            var getGroups=function(){
                REST.getGroups()
                .success(function(groups) {
                    $scope.groups = groups;
                });
            }
            
            getGroups();

            $scope.newGroup = function() {
                REST.newGroup({
                    name: $scope.groupname
                })
                    .success(function(data) {
                        getGroups();
                        toastr.success('Group successfuly created!', 'Splitwise');
                    })
                    .error(function(data) {
                        toastr.error(data, 'Add group failed');
                        $scope.user = {};
                    });
            }

            $scope.send = function() {
                var data = {
                    friend: $scope.email,
                    group: $scope.group
                };
                REST.newFriend(data)
                    .success(function(data) {
                        if (data.success)
                            toastr.success('Friend successfuly added!', 'Splitwise');
                        else {
                            toastr.error('User doesnt exist!', 'Splitwise');
                        }
                    })
                    .error(function(data) {
                        toastr.error(data, 'Add friend failed');
                    });
            }

            $scope.refresh = function() {
                getGroups();
            }

        } else {
            $location.path('/');
        }
    });