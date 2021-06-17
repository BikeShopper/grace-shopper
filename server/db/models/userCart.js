const Sequelize = require("sequelize");
const db = require("../db");

const userCart = db.define("userCart", {
  cartItems: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = userCart;
