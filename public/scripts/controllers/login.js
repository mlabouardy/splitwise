'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
	.controller('LoginCtrl', function(REST, $location, $scope) {

		REST.isConnected()
			.success(function(data) {
				$location.path('/');
			})
			.error(function(data) {

				$scope.login = function() {
					REST.login($scope.user)
						.success(function(data) {
							$location.path('/dashboard');
						})
						.error(function(data) {
							toastr.error(data, 'Authentication failed');
							$scope.user = {};
						});
				}
				
			});


	});