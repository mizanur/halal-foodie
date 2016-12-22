/**
 * Initialize Google Maps
 */
var map;

var $map = $('#map');

$map.height($(document).height());

function initMap() {
    map = new google.maps.Map($map[0], {
        center: {
            lat: 43.6547527,
            lng: -79.4141869
        },
        zoom: 12
    });

    ko.applyBindings(new ViewModel());
}

function GMapErrorHandler(){
  $('#list').hide();
  $('#map').text("Oops! Hi there, this is embarassing. Looks like the Google Map didn't load! Try again , soonish? If this continues to happen, send me an email (miz@crated.ink) ").addClass('error')
}