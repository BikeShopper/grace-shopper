//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const Bike = require('./models/bike');

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Bike,
  },
};

// User.hasOne(Bike);
// Bike.hasMany(User);
