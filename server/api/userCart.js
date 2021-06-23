const router = require("express").Router();
const User = require("../db/models/user");
const CartItems = require("../db/models/cartItems");
const Bike = require("../db/models/bike");
const Cart = require("../db/models/cart");

//GET /api/userCart/:id
// Retrieve all cart Items for user: userId, check for CartId
router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find/Create cartId
    let userCartId = await Cart.findOrCreate({
      where: {
        userId,
        fulfilled: false,
      },
    });
    userCartId = userCartId[0].id;

    // Find all cartId items
    const cartItems = await CartItems.findAll({
      where: {
        cartId: userCartId,
      },
    });

    // Retrieve bike info
    const bikeIds = cartItems.map((bike) => bike.bikeId);
    const bikes = await Bike.findAll({
      where: {
        id: bikeIds,
      },
    });
    res.json(bikes);
  } catch (error) {
    next(error);
  }
});

// POST /api/userCart
router.post("/", async (req, res, next) => {
  try {
    const { bikeId, quantity, price, userId } = req.body;

    let cartId = await Cart.findOrCreate({
      where: {
        userId,
        fulfilled: false,
      },
    });
    cartId = cartId[0].id;

    const newCartItem = {
      bikeId,
      quantity,
      cartId,
      price,
    };
    const cartItem = await CartItems.create(newCartItem);
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

    let cartId = await Cart.findAll({
      where: {
        userId,
        fulfilled: false,
      },
    });
    cartId = cartId[0].id;

    const updateBikeQuantity = await CartItems.update(
      {
        quantity,
      },
      {
        where: {
          bikeId,
          cartId,
        },
        returning: true,
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

    let cartId = await Cart.findAll({
      where: {
        userId,
        fulfilled: false,
      },
    });
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

// PUT /api/userCart/checkout/:userId
router.put("/checkout/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    let cartId = await Cart.findAll({
      where: {
        userId,
        fulfilled: false,
      },
    });
    cartId = cartId[0].id;

    const updateFulfilled = await Cart.update(
      {
        fulfilled: true,
      },
      {
        where: {
          id: cartId,
        },
      }
    );
    res.json(updateFulfilled);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
