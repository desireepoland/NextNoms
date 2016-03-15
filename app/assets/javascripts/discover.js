var dMap;
var service;
var infoWindow;

function initDiscoverMap() {
  var pos;
  dMap = new google.maps.Map(document.getElementById('discover-map'), {
    center: pos,
    zoom: 15
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
        types: ['restaurant'],
        rankBy: google.maps.places.RankBy.DISTANCE
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

    // make an array of the place_ids to exclude
    var excludePlaceIds = $('.exclude-r').map(function(i,r){ return $(r).data('place-id'); });
    // remove results that have a placeId in the excludesPlaceIds array
    var filteredResults = $.grep(results, function(r){
      //inArray returns index if it finds it, and returns -1 if it can not find it
      //grep will return the true into the filteredResults array
      return $.inArray(r.place_id, excludePlaceIds) === -1;
    });

    if(filteredResults.length > 0){
      // for each result, add restaurant info into a div
      for (var i = 0; i < filteredResults.length; i++) {
        var place = filteredResults[i];
        var htmlStr = '<div class="card"><div class="card-image"></div><div class="card-header">'+ place.name + '</div><div class="card-copy"><p>';
        htmlStr += '<i class="fa fa-map-marker"></i>&emsp;' + place.vicinity + '<br>';
        if(place.rating !== undefined){
          htmlStr += '<i class="fa fa-star"></i>&emsp;Average Rating: ' + place.rating + '<br>';
        }
        if(place.price_level === 0){
          htmlStr += '<i class="fa fa-money"></i>&emsp;Price Range: Free<br>';
        }else if(place.price_level === 1){
          htmlStr += '<i class="fa fa-money"></i>&emsp;Price Range: $<br>';
        }else if(place.price_level === 2){
          htmlStr += '<i class="fa fa-money"></i>&emsp;Price Range: $$<br>';
        }else if(place.price_level === 3){
          htmlStr += '<i class="fa fa-money"></i>&emsp;Price Range: $$$<br>';
        }else if(place.price_level === 1){
          htmlStr += '<i class="fa fa-money"></i>&emsp;Price Range: $$$$<br>';
        } else {
          htmlStr += '';
        }
        if(place.opening_hours !== undefined){
          htmlStr += '<i class="fa fa-clock-o"></i>&emsp;' + (place.opening_hours.open_now ? '<span class="open">Open Now</span><br>' : '<span class="closed">Currently Closed</span><br>');
        }
        htmlStr += '<br><a href="#" class="add-dnom" data-place-id="'+place.place_id+'"><i class="fa fa-plus"></i> Add To My NextNoms</a>'
        htmlStr += '</p></div>';

        // Add above info onto page
        $(".discover-results").append(htmlStr);

        // Add image to beginning of div
        var img = document.createElement("img");
        if(place.photos !== undefined){
          img.src = place.photos[0].getUrl({ 'maxWidth': 375, 'maxHeight': 375 });
        } else {
          img.src = "https://dl.dropboxusercontent.com/u/63083085/NextNoms/noimageavailable.png";
        }
        $(".discover-results div:last-child .card-image").prepend(img);
        // Add a marker on map for each restaurant
        addMarker(place);
      }
    } else {
      var htmlStr = '<div>All Discover results at your current location have already been added to your NextNoms list.</div>'
      $(".discover-results").append(htmlStr);
    }


    // Add restaurant to current_user's restaurants on click of add-nom link
    $(".add-dnom").on("click", function(e){
      e.preventDefault();
      var self = this;
      $.post("/restaurants", {place_id: $(self).data("place-id")})
      .done(function(data) {
        $(self).parent().css({ display: "none" });
      })
      .fail(function(){
        console.log("POST FAIL");
      });
    });
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
