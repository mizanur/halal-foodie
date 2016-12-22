/**
 * Constructor function to instantiate a food joint
 */
var BusinessConstructor = function(data){
  var self = this;

  this.name = ko.observable(data.name);
  this.phone = ko.observable(data.phone);
  this.address = ko.observable(data.address);
  this.url = ko.observable(data.url);
  this.twitter_id = ko.observable(data.twitter_id);
  this.yelp_id = ko.observable(data.yelp_id);
  this.longitude = ko.observable(data.location.longitude);
  this.latitude = ko.observable(data.location.latitude);
  this.show = ko.observable(true);

  var business_location = {
    lat:this.latitude(),
    lng:this.longitude()
  }

  console.log(business_location)
  
  var marker_config = {
    map:map,
    title: self.name(),
    position:business_location,
    animation: google.maps.Animation.DROP
  }

  this.location_pin = ko.observable(
    new google.maps.Marker(marker_config)
  )


  // Initialize the map info_tip that will display the Yelp data
  this.info_tip = ko.observable(
    new google.maps.InfoWindow({
      content:
      '<div class="info_tip">' +
        '<h2>' + self.name() + '</h2>' +
        '<ul>' +
          '<li>' +
            'Yelp Reviews: ' +
            '<img class="reviews" src=" " id="' + self.yelp_id() + '">' +
            '<span id="' + self.yelp_id() + '-error"></span>' +
          '</li>' +
          '<li>' +
            '<span class="glyphicon glyphicon-phone"></span> ' +
              self.phone() +
          '</li>' +
          '<li>' +
            ' <span class="glyphicon glyphicon-map-marker"></span> ' +
            self.address() +
          '</li>' +
          '<li>' +
            '<span class="glyphicon glyphicon-globe"></span> ' +
            self.url() +
          '</li>' +
          '<li>' + self.twitter_id() + '</li>' +
        '</ul>' +
      '</div>'

    })
  );
}



var view_model = function() {
  var self = this;

  this.list_of_restaurants = ko.observableArray([]);
  this.selected_restaurant = ko.observable();

  /*
   * list_of_restaurants contains collection of objects of restaurants
   * click event handler on the pin
   */

  restaurant_data.restaurant_list.forEach(function(element){
    
    var restaurant = new BusinessConstructor(element);
    self.list_of_restaurants.push(restaurant);

    restaurant.location_pin()
    
    restaurant.location_pin().addListener('click', function() {
      self.show_restaurant_info(restaurant);
    });
  });

  this.show_restaurant_info = function(restaurant){
    if (self.selected_restaurant()){
      self.selected_restaurant().info_tip().close();
    }
    self.selected_restaurant(restaurant);
    get_restaurant_info(restaurant);
  };

  /*
   * method invoked upon list click
   */
   
  this.show_popup_tip = function(restaurant){
    self.show_restaurant_info(restaurant);
  };

  this.text_filter = ko.observable("");
  
 /*
  * usefule: http://knockoutjs.com/documentation/rateLimit-observable.html
  */
  this.text_filter.extend({
    rateLimit: {
      timeout: 500,
      method: "notifyWhenChangesStop"
    }
  });

  /*
   * method invoked upon list click
   */
  this.filter = function(){
    self.list_of_restaurants().forEach(function (element) {
      var search_name = element.name().toLowerCase();
      var ft = self.text_filter().toLowerCase();

      if ( search_name.search(ft) !== -1 ){
        element.location_pin().setVisible(true);
        element.show(true);
      } else {
        element.show(false);
        element.info_tip().close();
        element.location_pin().setVisible(false);        
      }
    });
  };
  // call filter each time text_filter is changed
  this.text_filter.subscribe(self.filter);
};

/*
 * animate pin bounce
 * make ajax call to retrieve reviews
 */

var get_restaurant_info = function(restaurant){
  
  restaurant.location_pin().setAnimation(google.maps.Animation.BOUNCE);
  
  //stop bouncing
  window.setTimeout(function() {
    restaurant.location_pin().setAnimation(null);
  }, 1000);

  restaurant.info_tip().open(map, restaurant.location_pin());

  yelp_connect(restaurant);
};














