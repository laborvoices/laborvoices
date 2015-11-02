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

    marker.addListener('click', function() {
      map.panTo(marker.getPosition());
      displayFactoryInfo(factory);
      // TODO: blur out the irrelevant parts of the map?
    });
  });
}

function displayFactoryPictures(pictureDiv, factory) {

}

function getScore(factory) {
  return 5.0;
}

function getSafety(factory) {
  return "UNKNOWN";
}

function displayFactoryInfo(factory) {
  console.log(factory);
  var ratings = factory.ratings;
  var infobox = document.getElementById("sidebar-display");

  infobox.style.display = "block";
  document.getElementById("factory-name").innerHTML = factory.name;
  document.getElementById("factory-score").innerHTML = getScore(factory);
  displayFactoryPictures(document.getElementById("factory-pictures"), factory)
  document.getElementById("factory-size").innerHTML = 
    factory.numWorkers ? factory.numWorkers : "UNKNOWN";
  document.getElementById("factory-satisfaction").innerHTML = 
    ratings.workerRecommendation ? ratings.workerRecommendation : "UNKNOWN";
  document.getElementById("factory-wages").innerHTML =
    ratings.monthlyWage ? ratings.monthlyWage : "UNKNOWN";
  document.getElementById("factory-safety").innerHTML =
    getSafety(factory);
}

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

