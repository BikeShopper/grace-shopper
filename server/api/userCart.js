const router = require("express").Router();
const User = require("../db/models/user");
const CartItems = require("../db/models/cartItems");
const Bike = require("../db/models/bike");

//GET /api/userCart/:id
// Retrieve all cart Items for user: userId, check for CartId
router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    let userCartId = await user.getCarts();
    userCartId = userCartId[0].id;
    const cartItems = await CartItems.findAll({
      where: {
        cartId: userCartId,
      },
    });
    const bikeIds = cartItems.map((bike) => bike.bikeId);
    const bikes = await Bike.findAll({
      where: {
        id: bikeIds,
      },
    });
    res.json([userCartId, bikes]);
  } catch (error) {
    next(error);
  }
});

// POST /api/userCart
router.post("/", async (req, res, next) => {
  try {
    const cartItem = await CartItems.create(req.body);
    res.json(cartItem);
  } catch (error) {
    next(error);
  }
});

// PUT /api/userCart/:userId
router.put("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { bikeId, quantity } = req.body;
    const user = await User.findByPk(userId);
    let userCartId = await user.getCarts();
    userCartId = userCartId[0].id;

    const updateBikeQuantity = await CartItems.update(
      {
        quantity,
      },
      {
        where: {
          bikeId,
          cartId: userCartId,
        },
      }
    );
    res.json(updateBikeQuantity);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/userCart/:userId
router.delete("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { bikeId } = req.body;
    const user = await User.findByPk(userId);
    let cartId = await user.getCarts();
    cartId = cartId[0].id;

    const deleteCartItem = await CartItems.destroy({
      where: {
        bikeId,
        cartId,
      },
    });

    res.json(deleteCartItem);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
