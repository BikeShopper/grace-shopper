const Sequelize = require("sequelize");
const db = require("../db");

const Bike = db.define("bike", {
  model: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Bike;
