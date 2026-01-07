const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

/* ================= ADD / REDUCE CART ================= */
router.post("/", authorization, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, size, operation = "add" } = req.body;

    console.log("🟢 CART BODY:", req.body); // debug log

    if (!productId || !size) {
      return res.status(400).json({
        success: false,
        message: "productId and size are required",
      });
    }

    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cartItem = await Cart.findOne({
      user: userId,
      product: productId,
      size,
    });

    /* ---------- ADD ---------- */
    if (operation === "add") {
      if (cartItem) {
        cartItem.quantity += 1;
        await cartItem.save();
      } else {
        cartItem = await Cart.create({
          user: userId,
          product: productId,
          size,
          quantity: 1,
          name: product.name,
          price: product.price,
          images: product.images || [],
          category: product.category,
          productType: product.productType,
        });
      }
    }

    /* ---------- REDUCE ---------- */
    if (operation === "reduce") {
      console.log("🔴 REDUCE LOGIC HIT");

      if (!cartItem) {
        return res.status(404).json({
          success: false,
          message: "Item not in cart",
        });
      }

      cartItem.quantity -= 1;

      if (cartItem.quantity <= 0) {
        await Cart.deleteOne({ _id: cartItem._id });
        return res.status(200).json({
          success: true,
          message: "Item removed from cart",
        });
      }

      await cartItem.save();
    }

    return res.status(200).json({
      success: true,
      cartItem,
    });
  } catch (error) {
    console.error("❌ Cart Error:", error.message);
    return res.status(500).json({ success: false });
  }
});

/* ================= GET USER CART ================= */
router.get("/", authorization, async (req, res) => {
  const cartItems = await Cart.find({ user: req.user._id }).lean();
  res.status(200).json({ success: true, cartItems });
});

/* ================= REMOVE FROM CART ================= */
router.delete("/:id", authorization, async (req, res) => {
  await Cart.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    message: "Removed from cart",
  });
});

module.exports = router;
