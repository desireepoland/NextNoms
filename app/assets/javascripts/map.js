var map;
function initMap() {
  var pos;
  var map = new google.maps.Map(document.getElementById('map'), {
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
      // var infoWindow = new google.maps.InfoWindow({map: map});
      // infoWindow.setPosition(pos);
      // infoWindow.setContent('You are here.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  // search - Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // search - Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    // search- Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // search- For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {

      //search- Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_orange.png',
        title: place.name,
        position: place.geometry.location
      })
      markers.push(marker);

      //search- on click of marker display place info
      google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        place.formatted_address + '<br> <a href="#" class="add-nom">Add To My NextNoms</a></div>');
        infowindow.open(map, this);
        // Add restaurant to current_user's restaurants on click of add-nom link
        $(".add-nom").on("click", function(){
          $.post("/restaurants", {place_id: place.place_id})
          .done(function(data) {
            document.location.reload(true);
          })
          .fail(function(){
            console.log("POST FAIL");
          });
        });
      });

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  // Set up for display of user restaurants
  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

  // For each restaurant, display a marker and listing
  var displayRestaurant = function(iconImage, index, element){
    var placeId = $(element).data('place-id');
    var request = {
      placeId: placeId
    }
    var self = $(element);
    service.getDetails(request, function(place, status){
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // List each restaurant's name
        self.text(place.name);
        $("#"+placeId).find('div').prepend(place.name +"<br>");

        // Add a marker on map for each restaurant
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          icon: iconImage
        });

        //on click of marker display place info
        google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          place.formatted_address + '</div>');
          infowindow.open(map, this);
          map.setCenter(marker.getPosition());
          $('.selected').removeClass('selected');
          document.getElementById(placeId).className += "selected";
        });

        //remove highlighting from row when infowindow is closed
        google.maps.event.addListener(infowindow, 'closeclick', function () {
          $('.selected').removeClass('selected');
        });
      }
    });
  };

  var activeColor = 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red.png';
  var triedColor = 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png';

  $(".restaurant").each($.proxy(displayRestaurant, null, activeColor));
  $(".tried_restaurant").each($.proxy(displayRestaurant, null, triedColor));
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
