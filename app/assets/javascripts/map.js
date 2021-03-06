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
      if(!place.permanently_closed){

        //create search marker
        var icon = markerHash("https://dl.dropboxusercontent.com/u/63083085/NextNoms/yellowmarker.png");

        //search- Create a marker for each place.
        var marker = new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        })
        markers.push(marker);

        //search- on click of marker display place info
        google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          place.formatted_address + '<br> <a href="#" class="add-nom"><i class="fa fa-plus"></i> Add To My NextNoms</a></div>');
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

        // Build inner div with restaurant info
        var htmlStr = '';

        if(place.permanently_closed){
          htmlStr += 'This location has been permanently closed.';
        } else {
          htmlStr += '<i class="fa fa-map-marker"></i>&emsp;' + place.formatted_address + '<br>';

          if(place.website !== undefined){
            htmlStr += '<i class="fa fa-globe"></i>&emsp;<a href="' + place.website + '" target="_blank">'+ place.website +'</a><br>';
          }

          if(place.formatted_phone_number !== undefined){
            htmlStr += '<i class="fa fa-phone"></i>&emsp;' + place.formatted_phone_number + '<br>';
          }

          if(place.rating !== undefined){
            htmlStr += '<i class="fa fa-star"></i>&emsp;Average Rating: ' + place.rating + '<br>';
          }

          htmlStr = addPriceLevel(place, htmlStr);

          if(place.opening_hours !== undefined){
            htmlStr += '<i class="fa fa-clock-o"></i>&emsp;' + (place.opening_hours.open_now ? '<span class="open">Open Now</span><br>' : '<span class="closed">Currently Closed</span><br>');

            for (var i=0; i < place.opening_hours.weekday_text.length; i++) {
              htmlStr += '<span class="day">' + place.opening_hours.weekday_text[i] + '</span><br>';
            }
          }
        }

        // Add above info into restaurant's expander div
        $("#"+placeId).find('div').prepend(htmlStr + '<br>');

        var icon = markerHash(iconImage);

        // Add a marker on map for each restaurant
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          icon: icon
        });

        // Event listener for clicking on the list and centering the map
        $("#"+placeId).on('click', function(){
          $('.selected').removeClass('selected');
          if(!$("#"+placeId).find('.expander-trigger').hasClass('expander-hidden')){
            $('.expander-trigger').addClass('expander-hidden');
            $("#"+place.place_id).find('.expander-trigger').removeClass('expander-hidden');
            selectPlace(marker, place, map, infowindow);
          } else {
            infowindow.close(map, marker);
          }
        });

        //on click of marker display place info
        google.maps.event.addListener(marker, 'click', function () {
          $('.expander-trigger').addClass('expander-hidden');
          $("#"+place.place_id).find('.expander-trigger').removeClass('expander-hidden');
          selectPlace(this, place, map, infowindow);
        });

        //close expander from list item when infowindow closed
        google.maps.event.addListener(infowindow, 'closeclick', function () {
          $("#"+placeId).find('.expander-trigger').addClass('expander-hidden');
        });
      }
    });
  };

  var activeColor = "https://dl.dropboxusercontent.com/u/63083085/NextNoms/redmarker2.png";
  var triedColor = "https://dl.dropboxusercontent.com/u/63083085/NextNoms/purpmarker2.png";

  $(".restaurant").each($.proxy(displayRestaurant, null, activeColor));
  $(".tried_restaurant").each($.proxy(displayRestaurant, null, triedColor));
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
