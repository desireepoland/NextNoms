var rMap;
function initRouletteMap() {
  var pos;
  var rMap = new google.maps.Map(document.getElementById('r-map'), {
    zoom: 13
  });

  // set request to place id
  var placeId = $('#r-choice').data('place-id');
  var request = {
    placeId: placeId
  };

  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(rMap);

  service.getDetails(request, function (place, status) {

        if (status == google.maps.places.PlacesServiceStatus.OK) {

          if($('#r-choice').data('tried')){
            var iconImage = "https://dl.dropboxusercontent.com/u/63083085/NextNoms/purpmarker.png";
          } else {
            var iconImage = "https://dl.dropboxusercontent.com/u/63083085/NextNoms/redmarker.png";
          }

          var icon = {
              url: iconImage,
              scaledSize: new google.maps.Size(32, 43), // scaled size
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(16, 43) // anchor
          };

            var marker = new google.maps.Marker({
                map: rMap,
                position: place.geometry.location,
                icon: icon
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
