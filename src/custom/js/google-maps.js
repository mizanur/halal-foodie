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

    ko.applyBindings(new view_model());
}

