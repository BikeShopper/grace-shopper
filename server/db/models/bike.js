const Sequelize = require("sequelize");
const db = require("../db");

const Bike = db.define("bike", {
  model: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
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
    validate: {
      notEmpty: true
    }
  },
});

module.exports = Bike;
