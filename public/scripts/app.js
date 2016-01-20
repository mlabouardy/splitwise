'use strict';

/**
 * @ngdoc overview
 * @name publicApp
 * @description
 * # publicApp
 *
 * Main module of the application.
 */
angular
  .module('publicApp', [
    'ngRoute',
    'ui.bootstrap',
    'googleplus'
  ])
  .config(function($routeProvider, GooglePlusProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/sign-up', {
        templateUrl: 'views/sign-up.html',
        controller: 'SignUpCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/groups', {
        templateUrl: 'views/groups.html',
        controller: 'GroupsCtrl'
      })
      .when('/friends', {
        templateUrl: 'views/friends.html',
        controller: 'FriendsCtrl'
      })
      .when('/group/:id', {
        templateUrl: 'views/group.html',
        controller: 'GroupDetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  }).run(function($rootScope, REST, $location) {
    $rootScope.$on('$routeChangeStart', function(next, current) {
      REST.isConnected().success(function() {
        $rootScope.isConnected = true;
      }).error(function() {
        $rootScope.isConnected = false;
      });

      $rootScope.isActive = function(path) {
            return $location.path() == path;
        }
    });
  });