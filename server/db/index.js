//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/user");
const Bike = require("./models/bike");
const Cart = require("./models/cart");
const CartItems = require("./models/cartItems");

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Bike,
    Cart,
    CartItems,
  },
};

User.hasMany(Cart);
Cart.belongsTo(User);
Bike.belongsToMany(Cart, {
  through: CartItems,
});
Cart.belongsToMany(Bike, {
  through: CartItems,
});
