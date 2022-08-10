//create express server and routes here:

const express = require("express");
const path = require("path");
const control = require("./controllers.js");
const axios = require("axios");
const app = express();

//body parser:
app.use(express.json());

//server static:
app.use(express.static("public"));
//app.use(express.static(path.join(__dirname, "../public")));

//handle get req for location data:
app.get('/location', control.getLocations)

//handle get req for astronauts data:
app.get('/astronauts', control.getAstronauts)


app.listen(3000);
console.log("listening at: 3000")