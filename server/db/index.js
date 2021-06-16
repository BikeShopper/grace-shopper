//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/user");
const Bike = require("./models/bike");
const UserCart = require("./models/userCart");

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Bike,
    UserCart,
  },
};

User.hasOne(Bike);
Bike.belongsTo(User);
User.hasOne(UserCart);
UserCart.belongsTo(User);
