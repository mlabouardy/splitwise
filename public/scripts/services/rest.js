'use strict';

/**
 * @ngdoc service
 * @name publicApp.Authentication
 * @description
 * # Authentication
 * Service in the publicApp.
 */
angular.module('publicApp')
  .service('REST', function($http) {

    var connected = false;
    var session = "";

    return {
      isConnected: function() {
        return connected;
      },
      logout: function() {
        connected = false;
        return $http.get(API_URL + '/logout');
      },
      login: function(data) {
        session = data.session;
        return $http.post(API_URL + '/login', data);
      },
      register: function(data) {
        return $http.post(API_URL + '/register', data);
      },
      newBill: function(data) {
        data.session = session;
        return $http.post(API_URL + '/addBill', data);
      },
      getBillList: function(groupId) {
        return $http.get(API_URL + '/getBillList/' + session + '/' + groupId);
      },
      deleteBill: function(groupId,billId) {
        return $http.delete(API_URL + '/deleteBill/' + session + '/' + groupId + '/' + billId);
      },
      getUsersDetails: function(groupId,billId) {
        return $http.get(API_URL + '/getUsersDetails/' + session + '/' + groupId + '/' + billId);
      },
      updateCurrentBill: function(data) {
        data.session = session;
        return $http.post(API_URL + '/updateCurrentBill', data);
      },
      getProfile:function(){
        return $http.get(API_URL+'/profile/'+session);
      },
      updateProfile:function(data){
        return $http.put(API_URL+'/profile',data);
      },
      newGroup: function(data) {
        data.session = session;
        return $http.post(API_URL + '/addGroup', data);
      },
      newFriend: function(data) {
        data.session = session;
        return $http.post(API_URL + '/addFriend', data);
      },
      getGroups: function() {
        return $http.get(API_URL + '/groups/' + session);
      },
      friends: function() {
        return $http.get(API_URL + '/friends/' + session);
      },
      deleteFriend: function(id) {
        return $http.delete(API_URL + '/friends/delete/' + session + '/' + id);
      },
      group: function(id) {
        return $http.get(API_URL + '/group/' + session + '/' + id);
      },
      deleteGroup: function(id) {
        return $http.delete(API_URL + '/groups/delete/' + session + '/' + id);
      },
      renameGroup: function(data) {
        data.session = session;
        return $http.post(API_URL + '/group/update', data);
      },
      deleteUserFromGroup: function(data) {
        data.session = session;
        return $http.post(API_URL + '/groups/users/delete', data);
      },
      ok: function() {
        connected = true;
      }
    }
  });