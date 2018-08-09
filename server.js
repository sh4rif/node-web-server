const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}: ${req.path}: ${req.url}`;
  try {
    fs.appendFileSync("server.log", log + "\n");
    console.log(log);
  } catch (error) {
    console.log(error);
  }
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

var data = {
  pageTitle: "",
  welcomeMessage: "Welcome to my website"
};

app.get("/", (req, res) => {
  data.pageTitle = "Home Page";
  res.render("home.hbs", data);
});

app.get("/about", (req, res) => {
  data.pageTitle = "About Page";
  res.render("about.hbs", data);
});

app.get("/projects", (req, res) => {
  data.pageTitle = "Projects Page";
  data.welcomeMessage = "Portfolio page here";
  res.render("projects.hbs", data);
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to handle request."
  });
});

app.listen(port, () => {
  console.log("Server is ready on port: " + port);
});
