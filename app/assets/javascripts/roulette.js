var rMap;
function initRouletteMap() {
  var pos;
  var rMap = new google.maps.Map(document.getElementById('r-map'), {
    zoom: 13
  });

  var placeId = $('#r-choice').data('place-id');
  var request = {
    placeId: placeId
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
            rMap.setCenter(place.geometry.location);

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent(place.name);
                infowindow.open(rMap, this);
            });
        }
    });

}
