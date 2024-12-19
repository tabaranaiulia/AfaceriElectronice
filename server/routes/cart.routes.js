const express = require("express");
const bcrypt = require("bcrypt");
const Product = require("../database/models/Product");
const Category = require("../database/models/Category");
const Cart = require("../database/models/Cart");

const router = express.Router();

router.post("/addItemToCart", async (req, res) => {
  const productId = parseInt(req.query.productId, 10);
  console.log(req.body);
  console.log(req.userId);
  console.log(productId);

  let cartItems = await Cart.findAll({
    where: {
      UserId: req.userId,
    },
  });

  let item = cartItems.find((item) => item.productId === productId);
  if (item) {
    item.quantity += 1;
    await item.save();
    return res
      .status(200)
      .json({ success: true, message: "Item quantity updated", data: item });
  }

  const newItem = await Cart.create({
    userId: req.userId,
    productId: productId,
    quantity: 1,
  });
  console.log(newItem);
  return res
    .status(201)
    .json({ success: true, message: "Item added to cart", data: newItem });
});

router.get("/getCartItems", async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: {
        UserId: req.userId,
      },
      include: [
        {
          model: Product,
        },
      ],
    });

    return res.status(200).json({ success: true, data: cartItems });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve cart items",
      error: error.message,
    });
  }
});

router.delete("/removeItemFromCart", async (req, res) => {
  const productId = parseInt(req.query.productId, 10);

  try {
    const item = await Cart.findOne({
      where: {
        UserId: req.userId,
        productId: productId,
      },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    await item.destroy();
    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove item from cart",
      error: error.message,
    });
  }
});

router.delete("/clearCart", async (req, res) => {
  try {
    await Cart.destroy({
      where: {
        UserId: req.userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "All items removed from cart",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to clear cart",
      error: error.message,
    });
  }
});

module.exports = router;
