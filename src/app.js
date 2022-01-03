const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
//Define paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "K Muralidhar Rao",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "K Muralidhar Rao",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Hope this page was helpful",
    title: "Help Page",
    name: "K Muralidhar Rao",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide the address in query string",
    });
  }
  //res.send({ location: "Mangalore", forecast: 52 , address:req.query.address});

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error: "Error while fetching geocode for the address provided",
      });
    }
    //console.log(data);
    forecast(data, (error, forecastData) => {
      if (error) {
        return res.send({
          error: "Error while fetching forecast for the address provided",
        });
      }
      //console.log(data.location);
      console.log(forecastData);
      res.send({
        location: data.location,
        forecast: forecastData.finalMessage,
        address: req.query.address,
        // message: forecastData.finalMessage,
      });
    });
  });
});

// app.get("/products", (req, res) => {
//   console.log(req.query);
//   res.send({ products: []});
// });

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404 Error",
    description: "Help article not found, Please go for main help page.",
    name: "K Muralidhar Rao",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "404 Error",
    description: "Page not found.",
    name: "K Muralidhar Rao",
  });
});

app.listen(port, () => {
  console.log("Sever is up in port ", port);
});
