const router = require("express").Router();

const authorization = require("../middlewares/authorization");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

/* ================= ADD TO CART ================= */
router.post("/", authorization, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, size, quantity = 1 } = req.body;

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

    /* If already exists → increase quantity */
    const existing = await Cart.findOne({
      user: userId,
      product: productId,
      size,
    });

    if (existing) {
      existing.quantity += quantity;
      await existing.save();

      return res.status(200).json({
        success: true,
        cart: existing,
        updated: true,
      });
    }

    const cartItem = await Cart.create({
      user: userId,
      product: product._id,
      size,
      quantity,

      name: product.name,
      price: product.price,
      images: product.images || [],
      category: product.category,
      productType: product.productType,
    });

    return res.status(201).json({
      success: true,
      cart: cartItem,
    });
  } catch (error) {
    console.error("❌ Cart Add Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add to cart",
    });
  }
});

/* ================= GET USER CART ================= */
router.get("/", authorization, async (req, res) => {
  try {
    const userId = req.user._id;

    const cartItems = await Cart.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
    });
  }
});

/* ================= UPDATE QUANTITY ================= */
router.patch("/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user._id;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const updated = await Cart.findOneAndUpdate(
      { _id: id, user: userId },
      { quantity },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      cart: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update cart item",
    });
  }
});

/* ================= REMOVE FROM CART ================= */
router.delete("/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const deleted = await Cart.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Removed from cart",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove from cart",
    });
  }
});

module.exports = router;
