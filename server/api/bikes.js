const router = require('express').Router();
const Bike = require('../db/models/bike');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');

// GET /api/bikes
router.get('/', async (req, res, next) => {
  try {
    const bikes = await Bike.findAll();
    res.json(bikes);
  } catch (error) {
    next(error);
  }
});

// GET /api/bikes/:bikeId
router.get('/:id', async (req, res, next) => {
  try {
    const bike = await Bike.findByPk(req.params.id);
    res.send(bike);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/bikes/:bikeId
router.delete('/:bikeId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const bike = await Bike.findByPk(req.params.bikeId);
    await bike.destroy();
    res.send(bike);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
