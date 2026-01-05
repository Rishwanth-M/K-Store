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

    const cartItem = await Cart.findOneAndUpdate(
      { user: userId, product: productId, size },
      { $inc: { quantity } },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    if (!cartItem.name) {
      Object.assign(cartItem, {
        name: product.name,
        price: product.price,
        images: product.images || [],
        category: product.category,
        productType: product.productType,
      });
      await cartItem.save();
    }

    return res.status(201).json({ success: true, cartItem });
  } catch (error) {
    console.error("❌ Cart Add Error:", error.message);
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
