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
    const bikeIds = cartItems.map((bike) => {
      return {bikeId: bike.bikeId, bikeQty: bike.quantity}
    });

    res.json(bikeIds);
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
    
    const newBike = await CartItems.create(newCartItem);
    const cartItem = {bikeId: newBike.bikeId, bikeQty: newBike.quantity};

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

// GET /api/userCart/bikeQty/:userId
router.get("/bikeQty/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    let cartId = await Cart.findOne({
      where: {
        userId,
        fulfilled: false,
      },
    });
    const bikeQty = await CartItems.findAll({
      where: {
        cartId: cartId.id,
      },
    });
    res.json(bikeQty);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
