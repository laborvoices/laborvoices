var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdSidenav', '$http', function($scope, $mdSidenav, $http){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  console.log("help");
  $http.get('data.json').success(function(data, status, headers, config) {
      console.log(data);
      console.log(data.factories);
      $scope.items = data.factories;
  }).error(function(data, status, headers, config) {
      console.log("No data found..");
  });
}]);

app.filter('searchFor', function(){
    return function(arr, query){
        if(!query){
            return arr;
        }
        var result = [];
        query = query.toLowerCase();
        angular.forEach(arr, function(item){
            if(item.name.toLowerCase().indexOf(query) !== -1){
            result.push(item);
        }
        });
        return result;
    };
});

var map;
function initMap() {
  console.log("Initializing map");
  map = new google.maps.Map(document.getElementById('content'), {
    center: {lat: 23.7, lng: 90.35},
    zoom: 8
  });
}