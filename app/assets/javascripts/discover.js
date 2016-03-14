var dMap;
var service;
var infoWindow;

function initDiscoverMap() {
  var pos;
  dMap = new google.maps.Map(document.getElementById('discover-map'), {
    center: pos,
    zoom: 13
  });

  //HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      dMap.setCenter(pos);

      var request = {
        location: pos,
        radius: '2500',
        type: 'restaurant'
      };

      infoWindow = new google.maps.InfoWindow();
      service = new google.maps.places.PlacesService(dMap);
      service.nearbySearch(request, callback);
    }, function() {
      handleLocationError(true, infoWindow, dMap.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, dMap.getCenter());
  }
}

// get the results of discover search, and do stuff with them
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      var htmlStr = '<div class="d-restaurant"><br>'+ place.name;
      htmlStr += '<br></div>';

      // Add above info onto page
      $(".discover-results").append(htmlStr);

      // Add image to beginning of div
      var img = document.createElement("img");
      if(place.photos !== undefined){
        img.src = place.photos[0].getUrl({ 'maxWidth': 150, 'maxHeight': 150 });
      } else {
        img.src = "https://dl.dropboxusercontent.com/u/63083085/NextNoms/noimageavailable.png";
      }
      $(".discover-results div:last-child").prepend(img);

      // Add a marker on map for each restaurant
      addMarker(place);
    }
  }
}

function addMarker(place) {
  var marker = new google.maps.Marker({
    map: dMap,
    position: place.geometry.location,
    title: place.name,
    icon: {
      url: "https://dl.dropboxusercontent.com/u/63083085/NextNoms/yellowmarker.png",
      scaledSize: new google.maps.Size(32, 43), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(16, 43) // anchor
    }
  });

  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' +
      place.vicinity + '</div>');
      infoWindow.open(dMap, this);
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
