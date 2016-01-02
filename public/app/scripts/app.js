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
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'googleplus'
  ])
  .config(function ($routeProvider, GooglePlusProvider) {
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
      .when('/friend_invite', {
        templateUrl: 'views/friend_invite.html',
        controller: 'FriendInviteCtrl'
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

      GooglePlusProvider.init({
           clientId: '681024083865-sdgb14jp2bcb34et0s6qfaveu9fsbq0n.apps.googleusercontent.com',
           apiKey: 'ZWQeuK1dPqgjhJ9GaZs9KI93'
      });
  });