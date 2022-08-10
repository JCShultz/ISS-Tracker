//create db schema model and connections here:

//imports:
const mongoose = require("mongoose");

//connection to mongodb
mongoose.connect('mongodb://localhost:27017/astronauts')
  .then(() => (
    console.log('DB connection established')
  ))
  .catch((err) => (
    console.log('DB not connected: ', err)
  ));

//schema definition
const astronautSchema = new mongoose.Schema({
  name: String
});

//model- constructor compiled from schema
const AstronautItem = mongoose.model('AstronautItem', astronautSchema);

//exports:
module.exports = {
  AstronautItem,
}
