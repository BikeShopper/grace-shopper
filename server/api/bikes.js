const router = require('express').Router();
const Bike = require('../db/models/bike');

// GET /api/bikes
router.get('/', async (req, res, next) => {
  try {
    console.log('in API');
    const bikes = await Bike.findAll();
    console.log('BIKes', bikes);
    res.json(bikes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
