/**
 * Thank you Mark Nguyen
 * src: https://discussions.udacity.com/t/im-having-trouble-getting-started-using-apis/13597/2
 */
var yelp_connect = function(yelpBusinessId) {

  /**
   * Generates a random number and returns it as a string for OAuthentication
   * @return {string}
   */
  function nonce_generate() {
    return (Math.floor(Math.random() * 1e12).toString());
  }

  var yelp_url = 'https://api.yelp.com/v2/business/'+yelpBusinessId.yelp_id();
  const YELP_API_KEY = "iHOJjk8TAFaVl7b9pELLZA";
  const YELP_API_KEY_SECRET = "f8429e-TVrSUoi2LeX6xPFxwpls";
  const YELP_API_TOKEN = "yV9YxFZmEH2XTrB7jDEuC1fCSkGij_xu";
  const YELP_API_TOKEN_SECRET = "bQUfqovIbwT-HzNa_fGbGTOfz_A";

  var oauth_param = {
    oauth_consumer_key: YELP_API_KEY,
    oauth_token: YELP_API_TOKEN,
    oauth_nonce: nonce_generate(),
    oauth_timestamp: Math.floor(Date.now()/1000),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version : '1.0',
    callback: 'cb' // This is crucial to include for jsonp implementation in AJAX or else the oauth-signature will be wrong.
  };

  var encoded_signature = oauthSignature.generate('GET', yelp_url, oauth_param, YELP_API_KEY_SECRET, YELP_API_TOKEN_SECRET);
  oauth_param.oauth_signature = encoded_signature;

  // End OAuth signature generation

  // Set Ajax request parameters
  var request_config = {
    url: yelp_url,
    data: oauth_param,
    cache: true, // Prevent jQuery from adding on a cache-buster parameter "_=23489489749837", thus invalidating the oauth-signature
    dataType: 'jsonp',
    success: function(response) {
      // Store data on success
      var rating_img_url_small = response.rating_img_url_small
      $('#' + yelpBusinessId.yelp_id()).attr('src', response.rating_img_url_small);
    },
    error: function(response) {
      // Error
      console.log(response)
      $('#' + yelpBusinessId.yelp_id() + '-error').text('Unable to load reviews.').addClass("error");
    }
  };

  // Send Ajax request
  $.ajax(request_config);
};
