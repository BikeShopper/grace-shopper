const router = require("express").Router();
// const User = require("../db/models/user");

//GET /api/userCart
router.get("/", async (req, res, next) => {
  try {
    const cartIds = req.query.cartIds.split(",");
    console.log("bug", cartIds[1]);
    res.json(cartIds);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})

module.exports = router;
