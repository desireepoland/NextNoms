var rMap;
function initRouletteMap() {
  var pos;
  var rMap = new google.maps.Map(document.getElementById('r-map'), {
    center: pos,
    zoom: 13
  });

  //HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      rMap.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, rMap.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, rMap.getCenter());
  }

  // set place_id to the current roulette restaurant's place_id
  var request = {
        placeId: $('#r-choice').data('place-id')
    };

  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(rMap);

  service.getDetails(request, function (place, status) {

        if (status == google.maps.places.PlacesServiceStatus.OK) {

            var marker = new google.maps.Marker({
                map: rMap,
                position: place.geometry.location
            });

            infowindow.setContent(place.name);
            infowindow.open(rMap, marker);
        }
    });

}

//geolocation error handling
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
