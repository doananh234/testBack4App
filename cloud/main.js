// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.afterSave('Place', function(request, response) {
  const address = request.object.get('address');
  getGeoCode(address).then(function(geoCode) {
    request.object.set('geoCode', geoCode);
    request.object.save(null);
    response.success();
  });
});

Parse.Cloud.define('hello', function(request, response) {
  getGeoCode('da nang').then(function(httpResponse) {
    response.success(httpResponse);
  });
});

function get(url) {
  return new Promise(function(resolve, reject) {
    Parse.Cloud.httpRequest({
      url: url
    }).then(
      function(httpResponse) {
        resolve(httpResponse.data);
      },
      function(httpResponse) {
        reject(httpResponse);
      }
    );
  });
}

function getGeoCode(address) {
  const url =
    'https://maps.googleapis.com/maps/api/geocode/json?address=' +
    address +
    '&key=AIzaSyB7CHUBsexTJWKPVXIP2dIRd0J9J-voqjM';

  return new Promise(function(resolve, reject) {
    get(url)
      .then(function(data) {
        resolve(data);
      })
      .catch(function(error) {
        reject(data);
      });
  });
}
