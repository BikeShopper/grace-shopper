const Sequelize = require("sequelize");
const db = require("../db");

const cart = db.define("cart", {
  fullfilled: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = cart;
