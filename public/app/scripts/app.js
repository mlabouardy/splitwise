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
    'googleplus'
  ])
  .config(function ($routeProvider, GooglePlusProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/sign-up', {
        templateUrl: 'views/sign-up.html',
        controller: 'SignUpCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/friend_invite', {
        templateUrl: 'views/friend_invite.html',
        controller: 'FriendInviteCtrl',
        controllerAs: 'friendInvite'
      })
      .otherwise({
        redirectTo: '/'
      });

      GooglePlusProvider.init({
           clientId: '681024083865-sdgb14jp2bcb34et0s6qfaveu9fsbq0n.apps.googleusercontent.com',
           apiKey: 'ZWQeuK1dPqgjhJ9GaZs9KI93'
      });
  });