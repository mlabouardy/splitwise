'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
    .controller('ProfileCtrl', function($scope, REST, $location) {

        REST.isConnected()
            .success(function(data) {

                var getInfo = function() {
                    REST.getProfile()
                        .success(function(profile) {
                            $scope.profile = profile;
                        });
                }

                getInfo();

                $scope.notify = function() {
                    toastr.warning('Not implemented due to time', 'Splitwise');
                };

                $scope.upload = function() {
                    toastr.warning('Not implemented due to time', 'Splitwise');
                };

                $scope.update = function() {
                    REST.updateProfile($scope.profile)
                        .success(function() {
                            getInfo();
                            toastr.success('Profile updated !', 'Splitwise');
                        })
                        .error(function() {
                            toastr.error('Cannot update profile', 'Splitwise');
                        });
                }
                
            }).error(function(data) {
                $location.path('/');
            });

    });