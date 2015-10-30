// mock json data
var data = {
  "factories": [ 
    { "name": "Friends Stylewear Ltd.",
      "loc": {
        "address": " Plot # 411, Majukhan, Harbaid, Pubail, Gazipu Sadar, Majukhan Pubail, Bangladesh",
        "coordinates": {
          "lat": 23.937509,
          "lng": 90.468480
        }
      },
      "phone": "9816611", 
      "website": "http://friendsstylewear.com/",
      "numWorkers": null,
      "isTier1OrTier2": false,
      "isTier3": true,
      "ratings": {
        "childAbuse": false,
        "cleanliness": 3.2,
        "fireSafety": true,
        "freedomOfAssociation": 1,
        "monthlyWage": 3000,
        "workerRecommendation": -0.1
      }
    },  
    { "name": "FGS Denim Wear Ltd",
      "loc": {
        "address": "FGS Denim Wear Limited, Kathgora Bazar, Zirabo, Ashulia, Dhaka, Bangladesh",
        "coordinates": {
          "lat": 23.912051,
          "lng": 90.298047
        }
      },
      "phone": "088-02-8921450", 
      "website": "http://www.fashionglobe-bd.com/denim.php",
      "numWorkers": 950,
      "isTier1OrTier2": true,
      "isTier3": false,
      "ratings": {
        "childAbuse": true,
        "cleanliness": 3.5,
        "fireSafety": true,
        "freedomOfAssociation": 3,
        "monthlyWage": 3542,
        "workerRecommendation": 0.5
      }
    },
    { "name": "CONTINENTAL GARMENTS IND. (PVT.) LTD.",
      "loc": {
        "address": "PLOT 8, WARD 2, BLOCK B, DEWAN IDRIS ROAD, BORA RANGAMATIA, DHAKA, BANGLADESH",
        "coordinates": {
          "lat": 23.911678,
          "lng": 90.305042
        }
      },
      "phone": "7709124", 
      "website": "http://www.fashionglobe-bd.com/denim.php",
      "numWorkers": 2100,
      "isTier1OrTier2": true,
      "isTier3": false,
      "ratings": {
        "childAbuse": false,
        "cleanliness": 3.0,
        "fireSafety": false,
        "freedomOfAssociation": 2,
        "monthlyWage": 4000,
        "workerRecommendation": 0.5
      }
    }
  ]
}

var map;
function initMap() {
  console.log("Initializing map");
  map = new google.maps.Map(document.getElementById('content'), {
    center: {lat: 23.7, lng: 90.35},
    zoom: 8
  });

  // add markers of all the factories to our map (TODO: add markers for only the factories in view)
  //console.log("Initializing markers on map");
  data.factories.forEach(function(factory) {
    var marker = new google.maps.Marker({
      position: factory.loc.coordinates,
      map: map,
      title: factory.name
    });
  });
}

var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

}]);