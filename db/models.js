//create models here that interact with the db
const db = require('./db.js');


//TODO:


//write a function that creates new entries to the db for astronauts names

let findAstronautAndUpdate = (arrayOfNames) => {
  //find match and update or create new in db
  //console.log('in model: ', arrayOfNames);
  arrayOfNames.forEach((astro) => {
    if (astro.craft === 'ISS') {
      db.AstronautItem.findOneAndUpdate(
        {
          name: astro.name,
        },
        {
          upsert: true,
        }
      );
    }
  })
};

let retrieveAllAstronauts = () => {
  return db.AstronautItem.find()
};

module.exports = {
  findAstronautAndUpdate,
  retrieveAllAstronauts
}
