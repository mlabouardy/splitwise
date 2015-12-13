

angular.module('publicApp')
  .controller('MenuCtrl', function ($scope, $location) {
    $scope.isActive=function(path){
    	return $location.path()==path;
    }
  });
