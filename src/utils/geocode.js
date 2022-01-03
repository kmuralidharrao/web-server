const request = require("postman-request");

const geocode = (address, callback) => {
  //encodeURIComponent(address); when we try to address variable in actual api url call
  const url = "https://run.mocky.io/v3/a63150ab-bc1e-4d17-be49-3c159ccb89e8";
  request({ url, json: true }, (error, response) => {
    if (error) {
      //console.log("Unable to connect to geocoding service!");
      callback("Unable to connect to geocoding service!");
    } else {
      const { latitude, longitude } = response.body;
      console.log("latitude: ", latitude, " longitude: ", longitude);
      callback(undefined, {
        latitude,
        longitude,
        location: address,
      });
    }
  });
};

module.exports = geocode;
