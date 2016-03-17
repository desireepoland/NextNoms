function selectPlace(marker, place, map, infowindow){
  map.setCenter(place.geometry.location);
  infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
  place.formatted_address + '<br><a href="https://www.google.com/maps/dir/Current+Location/'
  + place.geometry.location.lat().toString()+',' + place.geometry.location.lng().toString()
  + '" target="_blank">Get Directions</a></div>');
  infowindow.open(map, marker);
}

function addPriceLevel(place, htmlStr){
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
  return htmlStr;
}
