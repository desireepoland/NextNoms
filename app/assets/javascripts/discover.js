var dMap;
var service;

function initDiscoverMap() {
  var pos;
  var dMap = new google.maps.Map(document.getElementById('discover-map'), {
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

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(results[i]);
    }
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
