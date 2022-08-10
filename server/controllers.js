//create route handlers here:
const axios = require("axios");


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

exports.getAstronauts = (req,res) => {
  axios.get('http://api.open-notify.org/astros.json')
  .then((body) => {
    //console.log('in server: ', body.data)
    res.send(body.data).status(200).end();
  })
  .catch((err) => {
    console.log('There was an error getting astronauts: ', err);
    res.sendStatus(404);
  })
};
