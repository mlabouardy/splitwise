

angular.module('publicApp')
  .controller('MenuCtrl', function ($scope, $location, REST) {
    $scope.isActive=function(path){
    	return $location.path()==path;
    }

    $scope.isConnected=function(){
        return REST.isConnected();
    }
  });
