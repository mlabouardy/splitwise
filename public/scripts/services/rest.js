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

    return {
      isConnected: function() {
        return $http.get(API_URL + '/isConnected');
      },
      logout: function() {
        return $http.get(API_URL + '/api/logout');
      },
      login: function(data) {
        return $http.post(API_URL + '/login', data);
      },
      register: function(data) {
        return $http.post(API_URL + '/register', data);
      },
      newBill: function(data) {
        return $http.post(API_URL + '/api/addBill', data);
      },
      getBillList: function(groupId) {
        return $http.get(API_URL + '/api/getBillList/' + groupId);
      },
      deleteBill: function(groupId,billId) {
        return $http.delete(API_URL + '/api/deleteBill/' + groupId + '/' + billId);
      },
      getUsersDetails: function(groupId,billId) {
        return $http.get(API_URL + '/api/getUsersDetails/' + groupId + '/' + billId);
      },
      updateCurrentBill: function(data) {
        return $http.post(API_URL + '/api/updateCurrentBill', data);
      },
      getProfile:function(){
        return $http.get(API_URL+'/api/profile');
      },
      updateProfile:function(data){
        return $http.put(API_URL+'/api/profile',data);
      },
      newGroup: function(data) {
        return $http.post(API_URL + '/api/addGroup', data);
      },
      newFriend: function(data) {
        return $http.post(API_URL + '/api/addFriend', data);
      },
      getGroups: function() {
        return $http.get(API_URL + '/api/groups');
      },
      friends: function() {
        return $http.get(API_URL + '/api/friends');
      },
      deleteFriend: function(id) {
        return $http.delete(API_URL + '/api/friends/delete/' + id);
      },
      group: function(id) {
        return $http.get(API_URL + '/api/group/' + id);
      },
      deleteGroup: function(id) {
        return $http.delete(API_URL + '/api/groups/delete/' + id);
      },
      renameGroup: function(data) {
        return $http.post(API_URL + '/api/group/update', data);
      },
      deleteUserFromGroup: function(data) {
        return $http.post(API_URL + '/api/groups/users/delete', data);
      }
    }
  });