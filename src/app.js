const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

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
  res.send({ location: "Mangalore", forecast: 52 });
});

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

app.listen(3000, () => {
  console.log("Sever is up in port 3000");
});
