const Sequelize = require("sequelize");
const db = require("../db");

const cart = db.define("cart", {
  fulfilled: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = cart;
