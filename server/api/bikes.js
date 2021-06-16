const router = require("express").Router();
const Bike = require("../db/models/bike");

// GET /api/bikes
router.get("/", async (req, res, next) => {
  try {
    const bikes = await Bike.findAll();
    res.json(bikes);
  } catch (error) {
    next(error);
  }
});

// GET /api/bikes/:bikeId
router.get("/:id", async (req, res, next) => {
  try {
    const bike = await Bike.findByPk(req.params.id);
    res.send(bike);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
