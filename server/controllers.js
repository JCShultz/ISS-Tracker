//create route handlers here:

const axios = require("axios");
const models = require("../db/models.js");

//api for location:
exports.getLocations = (req,res) => {
  axios.get('http://api.open-notify.org/iss-now.json')
  .then((body) => {
    //console.log(body.data)
    res.send(body.data).status(200).end();
  })
  .catch((err) => {
    //console.log('There was an error in getting locations: ', err);
    res.sendStatus(404);
  })
};

//api call for astronauts:
exports.getAstronauts = (req,res) => {
  axios.get('http://api.open-notify.org/astros.json')
  .then((body) => {
    console.log('in server: ', body.data.people)
    //pass info into function to save name in db
    models.findAstronautAndUpdate(body.data.people)
    res.send(body.data).status(200).end();
  })
  .catch((err) => {
    console.log('There was an error getting astronauts: ', err);
    res.sendStatus(404);
  })
};

//gets all astronauts from the db:
exports.getAllAstronauts = (req,res) => {
  models.retrieveAllAstronauts()
  .then((body) => {
    console.log('in server: ', body)
    res.send(body).status(200).end();
  })
  .catch((err) => {
    console.log('There was an error getting astronauts: ', err);
    res.sendStatus(404);
  })
};
