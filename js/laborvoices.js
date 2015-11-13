// mock json data
// var data = {
//   "factories": [
//   { "name": "Friends Stylewear Ltd.",
//   "loc": {
//     "address": " Plot # 411, Majukhan, Harbaid, Pubail, Gazipu Sadar, Majukhan Pubail, Bangladesh",
//     "coordinates": {
//       "lat": 23.937509,
//       "lng": 90.468480
//     }
//   },
//   "phone": "9816611",
//   "website": "http://friendsstylewear.com/",
//   "numWorkers": null,
//   "isTier1OrTier2": false,
//   "isTier3": true,
//   "ratings": {
//     "childAbuse": false,
//     "cleanliness": 3.2,
//     "fireSafety": true,
//     "freedomOfAssociation": 1,
//     "monthlyWage": 3000,
//     "workerRecommendation": -0.1
//   }
// },
// { "name": "FGS Denim Wear Ltd",
// "loc": {
//   "address": "FGS Denim Wear Limited, Kathgora Bazar, Zirabo, Ashulia, Dhaka, Bangladesh",
//   "coordinates": {
//     "lat": 23.912051,
//     "lng": 90.298047
//   }
// },
// "phone": "088-02-8921450",
// "website": "http://www.fashionglobe-bd.com/denim.php",
// "numWorkers": 950,
// "isTier1OrTier2": true,
// "isTier3": false,
// "ratings": {
//   "childAbuse": true,
//   "cleanliness": 3.5,
//   "fireSafety": true,
//   "freedomOfAssociation": 3,
//   "monthlyWage": 3542,
//   "workerRecommendation": 0.5
// }
// },
// { "name": "CONTINENTAL GARMENTS IND. (PVT.) LTD.",
// "loc": {
//   "address": "PLOT 8, WARD 2, BLOCK B, DEWAN IDRIS ROAD, BORA RANGAMATIA, DHAKA, BANGLADESH",
//   "coordinates": {
//     "lat": 23.911678,
//     "lng": 90.305042
//   }
// },
// "phone": "7709124",
// "website": "http://www.fashionglobe-bd.com/denim.php",
// "numWorkers": 2100,
// "isTier1OrTier2": true,
// "isTier3": false,
// "ratings": {
//   "childAbuse": false,
//   "cleanliness": 3.0,
//   "fireSafety": false,
//   "freedomOfAssociation": 2,
//   "monthlyWage": 4000,
//   "workerRecommendation": 0.5
// }
// }
// ]
// }

var map;
var markerMap = {};
function initMap() {
  console.log("Initializing map");
  map = new google.maps.Map(document.getElementById('content'), {
    center: {lat: 23.7, lng: 90.35},
    zoom: 8
  });
}

function initializeMarkers(data) {
  console.log(data);
  data.groups.forEach(function(group) {
    var marker = new google.maps.Marker({
      position: {lat: group.lat, lng: group.long},
      map: map,
      title: group.name
    })

    var contentString = '<div>Testing</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    })

    marker.addListener('click', function() {
      map.panTo(marker.getPosition());
      //displayFactoryInfo(group);
      infowindow.open(map, marker);
      // TODO: blur out the irrelevant parts of the map?
    })
    markerMap[group.name] = marker;
  })
  resizeMap();
}

function resizeMap() {
  var bounds = new google.maps.LatLngBounds();
  for (var group in markerMap) {
    if (markerMap[group].getVisible())
      bounds.extend(markerMap[group].getPosition());
  }

  google.maps.event.addListenerOnce(map, 'zoom_changed', function(event) {
    map.setZoom(map.getZoom() - 1);

    if (this.getZoom() > 15) {
      this.setZoom(15);
    }
  });
  map.fitBounds(bounds);
}


// Worker Recommendation Slider
var recSlider = document.getElementById('slider-rec');

noUiSlider.create(recSlider, {
  start: [ 1, 8 ],
  connect: true,
  range: {
    'min': [  0 ],
    'max': [ 10 ]
  }
});

var recMin = document.getElementById('slider-rec-min'),
recMax = document.getElementById('slider-rec-max');

recSlider.noUiSlider.on('update', function ( values, handle ) {
  if ( handle ) {
    recMax.innerHTML = values[handle];
  } else {
    recMin.innerHTML = values[handle];
  }
});

// Wages Slider
var wagesSlider = document.getElementById('slider-wages');

noUiSlider.create(wagesSlider, {
  start: [ 3, 9 ],
  connect: true,
  range: {
    'min': [  0 ],
    'max': [ 10 ]
  }
});

var wagesMin = document.getElementById('slider-wages-min'),
wagesMax = document.getElementById('slider-wages-max');

wagesSlider.noUiSlider.on('update', function ( values, handle ) {
  if ( handle ) {
    wagesMax.innerHTML = values[handle];
  } else {
    wagesMin.innerHTML = values[handle];
  }
});

// Child Labor Slider
var laborSlider = document.getElementById('slider-labor');

noUiSlider.create(laborSlider, {
  start: [ 0, 7 ],
  connect: true,
  range: {
    'min': [  0 ],
    'max': [ 10 ]
  }
});

var laborMin = document.getElementById('slider-labor-min'),
laborMax = document.getElementById('slider-labor-max');

laborSlider.noUiSlider.on('update', function ( values, handle ) {
  if ( handle ) {
    laborMax.innerHTML = values[handle];
  } else {
    laborMin.innerHTML = values[handle];
  }
});


function displayFactoryPictures(pictureDiv, factory) {

}

// default overall score for each factory is 5.0 for now
function getScore(factory) {
  return 5.0;
}

var scoresEnum = Object.freeze({WORKER_REC: 0, WAGES: 1, CHILD_LABOR: 2, FIRE_SAFETY: 3});

function displayFactoryInfo(group) {
  console.log(group);
  var scores = group.scores;
  var infobox = document.getElementById("sidebar-display");

  infobox.style.display = "block";
  document.getElementById("group-name").innerHTML = group.name;
  document.getElementById("group-score").innerHTML = getScore(group);
  displayFactoryPictures(document.getElementById("group-pictures"), group)
  document.getElementById("group-size").innerHTML =
    group.total_workers ? group.total_workers : "UNKNOWN";
  document.getElementById("group-recommendation").innerHTML =
    scores[scoresEnum.WORKER_REC]["score"][0]["value"] ? scores[scoresEnum.WORKER_REC]["score"][0]["value"] : "UNKNOWN";
  document.getElementById("group-wages").innerHTML =
    scores[scoresEnum.WAGES]["score"][0]["value"] ? scores[scoresEnum.WAGES]["score"][0]["value"] : "UNKNOWN";
  document.getElementById("group-fire-safety").innerHTML =
    scores[scoresEnum.FIRE_SAFETY]["score"][0]["value"] ? scores[scoresEnum.FIRE_SAFETY]["score"][0]["value"] : "UNKNOWN";
}

var jsonData;
var staticData = {"groups":[{"id":1,"name":"Factory A","conversations_count":14,"users_count":10,"total_workers":30,"lat":17.9468568801104,"long":99.0197359730027,"scores":[{"category":"Worker Recommendation","score":[{"id":1,"value":3.0,"category_id":1,"group_id":1,"created_at":"2015-10-30T17:47:29.445Z","updated_at":"2015-10-30T17:47:29.732Z"}]},{"category":"Wages","score":[{"id":2,"value":1.0,"category_id":2,"group_id":1,"created_at":"2015-10-30T17:47:29.458Z","updated_at":"2015-10-30T17:47:29.741Z"}]},{"category":"Child Labor","score":[{"id":3,"value":2.0,"category_id":3,"group_id":1,"created_at":"2015-10-30T17:47:29.469Z","updated_at":"2015-10-30T17:47:29.745Z"}]},{"category":"Fire Safety","score":[{"id":4,"value":1.0,"category_id":4,"group_id":1,"created_at":"2015-10-30T17:47:29.480Z","updated_at":"2015-10-30T17:47:29.755Z"}]}],"created_at":"2015-10-30T17:47:29.727Z","updated_at":"2015-10-30T17:47:29.727Z"},{"id":2,"name":"Factory B","conversations_count":130,"users_count":100,"total_workers":150,"lat":18.8729892480271,"long":85.5507705400325,"scores":[{"category":"Worker Recommendation","score":[{"id":5,"value":4.0,"category_id":1,"group_id":2,"created_at":"2015-10-30T17:47:29.491Z","updated_at":"2015-10-30T17:47:29.773Z"}]},{"category":"Wages","score":[{"id":6,"value":1.0,"category_id":2,"group_id":2,"created_at":"2015-10-30T17:47:29.503Z","updated_at":"2015-10-30T17:47:29.777Z"}]},{"category":"Child Labor","score":[{"id":7,"value":3.0,"category_id":3,"group_id":2,"created_at":"2015-10-30T17:47:29.518Z","updated_at":"2015-10-30T17:47:29.780Z"}]},{"category":"Fire Safety","score":[{"id":8,"value":3.0,"category_id":4,"group_id":2,"created_at":"2015-10-30T17:47:29.530Z","updated_at":"2015-10-30T17:47:29.784Z"}]}],"created_at":"2015-10-30T17:47:29.770Z","updated_at":"2015-10-30T17:47:29.770Z"},{"id":3,"name":"Factory C","conversations_count":93,"users_count":45,"total_workers":120,"lat":17.987452634461,"long":84.6677053764018,"scores":[{"category":"Worker Recommendation","score":[{"id":9,"value":3.0,"category_id":1,"group_id":3,"created_at":"2015-10-30T17:47:29.544Z","updated_at":"2015-10-30T17:47:29.816Z"}]},{"category":"Wages","score":[{"id":10,"value":4.0,"category_id":2,"group_id":3,"created_at":"2015-10-30T17:47:29.558Z","updated_at":"2015-10-30T17:47:29.827Z"}]},{"category":"Child Labor","score":[{"id":11,"value":5.0,"category_id":3,"group_id":3,"created_at":"2015-10-30T17:47:29.568Z","updated_at":"2015-10-30T17:47:29.833Z"}]},{"category":"Fire Safety","score":[{"id":12,"value":1.0,"category_id":4,"group_id":3,"created_at":"2015-10-30T17:47:29.581Z","updated_at":"2015-10-30T17:47:29.837Z"}]}],"created_at":"2015-10-30T17:47:29.806Z","updated_at":"2015-10-30T17:47:29.806Z"},{"id":4,"name":"Factory D","conversations_count":229,"users_count":203,"total_workers":400,"lat":26.8906529352525,"long":84.8116942126579,"scores":[{"category":"Worker Recommendation","score":[{"id":13,"value":1.0,"category_id":1,"group_id":4,"created_at":"2015-10-30T17:47:29.599Z","updated_at":"2015-10-30T17:47:29.850Z"}]},{"category":"Wages","score":[{"id":14,"value":4.0,"category_id":2,"group_id":4,"created_at":"2015-10-30T17:47:29.615Z","updated_at":"2015-10-30T17:47:29.854Z"}]},{"category":"Child Labor","score":[{"id":15,"value":2.0,"category_id":3,"group_id":4,"created_at":"2015-10-30T17:47:29.631Z","updated_at":"2015-10-30T17:47:29.859Z"}]},{"category":"Fire Safety","score":[{"id":16,"value":5.0,"category_id":4,"group_id":4,"created_at":"2015-10-30T17:47:29.639Z","updated_at":"2015-10-30T17:47:29.864Z"}]}],"created_at":"2015-10-30T17:47:29.847Z","updated_at":"2015-10-30T17:47:29.847Z"},{"id":5,"name":"Factory E","conversations_count":23,"users_count":18,"total_workers":50,"lat":25.1265204544061,"long":86.2992781625552,"scores":[{"category":"Worker Recommendation","score":[{"id":17,"value":1.0,"category_id":1,"group_id":5,"created_at":"2015-10-30T17:47:29.659Z","updated_at":"2015-10-30T17:47:29.889Z"}]},{"category":"Wages","score":[{"id":18,"value":4.0,"category_id":2,"group_id":5,"created_at":"2015-10-30T17:47:29.667Z","updated_at":"2015-10-30T17:47:29.911Z"}]},{"category":"Child Labor","score":[{"id":19,"value":5.0,"category_id":3,"group_id":5,"created_at":"2015-10-30T17:47:29.673Z","updated_at":"2015-10-30T17:47:29.921Z"}]},{"category":"Fire Safety","score":[{"id":20,"value":3.0,"category_id":4,"group_id":5,"created_at":"2015-10-30T17:47:29.681Z","updated_at":"2015-10-30T17:47:29.925Z"}]}],"created_at":"2015-10-30T17:47:29.882Z","updated_at":"2015-10-30T17:47:29.882Z"}]};

var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdSidenav', '$http', function($scope, $mdSidenav, $http){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  // API call
  var jqxhr = $.getJSON("http://lv-api.herokuapp.com/groups", function() {
    console.log("request successfully sent");
  })
  .done(function(json) {
    console.log("response succesfully received");
    jsonData = json;
    $scope.items = jsonData.groups;
    initializeMarkers(jsonData);
  })
  .fail(function() {
    console.log("json request failed, using static data");
    jsonData = staticData;
    initializeMarkers(jsonData);
  })
  .always(function() {
  });
}]);

app.filter('searchFor', function(){
  return function(arr, query) {
    var visibilityChanged = false;  // does not redraw map unless needed
    if (!query) {
      for (var key in markerMap) {
        marker = markerMap[key];
        if (!marker.getVisible()) { 
          marker.setVisible(true);
          visibilityChanged = true;
        }
      }
    } else {
      query = query.toLowerCase();
      angular.forEach(arr, function(item){
        if (item.name.toLowerCase().indexOf(query) !== -1) {
          marker = markerMap[item.name];
          if (!marker.getVisible()) { 
            marker.setVisible(true);
            visibilityChanged = true;
          }
        } else {
          marker = markerMap[item.name];
          if (marker.getVisible()) { 
            marker.setVisible(false);
            visibilityChanged = true;
          }        
        }
      });
    }

    if (visibilityChanged)
      resizeMap();
  };
});

