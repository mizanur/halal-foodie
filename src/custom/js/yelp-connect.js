
$.ajax({
  type: "POST",
  url: 'https://api.yelp.com/oauth2/token',
  beforeSend: function (request)
  {
      request.setRequestHeader("grant_type", 'client_credentials');
      request.setRequestHeader("client_id", 'EWezCoN6GWxdbLOh_Cp9_w');
      request.setRequestHeader("client_secret", 'Qzp6cK4ym6LKWkalSBmtzZPbK3WaNTbLQGQaeOO6r1eZVzUPyIW11vFJsR4OMMvt');      
  },  
  success: function(data, status, response){
    console.log(data);
    console.log(status);
    console.log(response);

  }

})


