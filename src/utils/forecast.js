const request = require("postman-request");
const forecast = ({ latitude, longitude, location }, callback) => {
  // const url =
  //   "http://api.weatherstack.com/current?access_key=76ae79214fa480455fe8415963676fb4&query=" +
  //   latitude +
  //   "," +
  //   longitude;
  const url =
    "http://api.weatherstack.com/current?access_key=76ae79214fa480455fe8415963676fb4&query=" +
    location;
  request({ url, json: true }, (error, response) => {
    //const data = JSON.parse(response.body);
    if (error) {
      //console.log("Unable to connect to weather service!");
      callback("Unable to connect to weather service!");
    } else if (response.body.error) {
      console.log("unable to find location");
      callback("unable to find location");
    } else {
      const data = response.body;
      //console.log(data.current.weather_descriptions[0],". It is currently ",data.current.temperature," degrees out. It feels like ",data.current.feelslike," degrees out.");
      const finalMessage =
        data.current.weather_descriptions[0] +
        ". It is currently " +
        data.current.temperature +
        " degrees out. It feels like " +
        data.current.feelslike +
        " degrees out. The humidity is " +
        data.current.humidity +
        "%.";
      const forecast = data.current.temperature;
      const finalData = { forecast, finalMessage };
      callback(undefined, finalData);
    }
  });
};

module.exports = forecast;
