const Sequelize = require("sequelize");
const db = require("../db");

const cartItems = db.define("cartItems", {
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.INTEGER,
  },
});

module.exports = cartItems;
