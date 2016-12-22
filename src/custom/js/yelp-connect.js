/**
 * Thank you Mark Nguyen
 * src: https://discussions.udacity.com/t/im-having-trouble-getting-started-using-apis/13597/2
 */
var yelpConnect = function(yelpBusinessId) {

    /**
     * Generates a random number and returns it as a string for OAuthentication
     * @return {string}
     */
    function nonce_generate() {
        return (Math.floor(Math.random() * 1e12).toString());
    }

    var yelp_url = 'https://api.yelp.com/v2/business/' + yelpBusinessId.yelp_id;
    console.log(yelp_url);
    const YELP_API_KEY = "iHOJjk8TAFaVl7b9pELLZA";
    const YELP_API_KEY_SECRET = "f8429e-TVrSUoi2LeX6xPFxwpls";
    const YELP_API_TOKEN = "yV9YxFZmEH2XTrB7jDEuC1fCSkGij_xu";
    const YELP_API_TOKEN_SECRET = "bQUfqovIbwT-HzNa_fGbGTOfz_A";

    var oauth_param = {
        oauth_consumer_key: YELP_API_KEY,
        oauth_token: YELP_API_TOKEN,
        oauth_nonce: nonce_generate(),
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version: '1.0',
        callback: 'cb' // This is crucial to include for jsonp implementation in AJAX or else the oauth-signature will be wrong.
    };

    var encoded_signature = oauthSignature.generate('GET', yelp_url, oauth_param, YELP_API_KEY_SECRET, YELP_API_TOKEN_SECRET);
    oauth_param.oauth_signature = encoded_signature;

    // End OAuth signature generation


    // Content
    var populateContent = function(image, error) {
        var content;
        if (!error) {
            return content = '<div class="info_tip">' +
                '<h2>' + yelpBusinessId.name + '</h2>' +
                '<ul>' +
                '<li>' +
                'Yelp Reviews: ' +
                '<img class="reviews" src="' + image + '" id="' + yelpBusinessId.yelp_id + '">' +
                '<span id="' + yelpBusinessId.yelp_id + '-error"></span>' +
                '</li>' +
                '<li>' +
                '<span class="glyphicon glyphicon-phone"></span> ' +
                yelpBusinessId.phone +
                '</li>' +
                '<li>' +
                ' <span class="glyphicon glyphicon-map-marker"></span> ' +
                yelpBusinessId.address +
                '</li>' +
                '<li>' +
                '<span class="glyphicon glyphicon-globe"></span> ' +
                yelpBusinessId.url +
                '</li>' +
                '<li>' + yelpBusinessId.twitter_id + '</li>' +
                '</ul>' +
                '</div>'
        } else {
            return content = '<div class="info_tip">' +
                '<h2>' + yelpBusinessId.name + '</h2>' +
                '<ul>' +
                '<li>' +
                'Yelp Reviews: ' +
                '<span id="' + yelpBusinessId.yelp_id + '-error" class="error"> Could not find reviews!</span>' +
                '</li>' +
                '<li>' +
                '<span class="glyphicon glyphicon-phone"></span> ' +
                yelpBusinessId.phone +
                '</li>' +
                '<li>' +
                ' <span class="glyphicon glyphicon-map-marker"></span> ' +
                yelpBusinessId.address +
                '</li>' +
                '<li>' +
                '<span class="glyphicon glyphicon-globe"></span> ' +
                yelpBusinessId.url +
                '</li>' +
                '<li>' + yelpBusinessId.twitter_id + '</li>' +
                '</ul>' +
                '</div>'
        }


    }




    // Set Ajax request parameters
    var requestConfig = {
        url: yelp_url,
        data: oauth_param,
        method: 'GET',
        cache: true, // Prevent jQuery from adding on a cache-buster parameter "_=23489489749837", thus invalidating the oauth-signature
        dataType: 'jsonp',
        success: function(response) {
            // Store data on success
            var rating_img_url_small = response.rating_okimg_url_small;

            if (typeof(rating_img_url_small) !== 'undefined') {
                yelpBusinessId.info_tip().setContent(populateContent(rating_img_url_small, false))
            } else {
                yelpBusinessId.info_tip().setContent(populateContent(rating_img_url_small, true))
            }
        },
        error: function(response) {
            yelpBusinessId.info_tip().setContent(populateContent(rating_img_url_small, true))

        }
    };

    // Send Ajax request
    $.ajax(requestConfig);

};