const router = require("express").Router();

const authorization = require("../middlewares/authorization");
const Favourite = require("../models/favourite.model");
const Product = require("../models/product.model");

/* ================= ADD TO FAVOURITES ================= */
router.post("/", authorization, async (req, res) => {
  try {
    const userId = req.user._id; // ✅ FIXED
    const { productId, size } = req.body;

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

    const favourite = await Favourite.create({
      user: userId,
      product: product._id,
      size,

      name: product.name,
      price: product.price,
      images: product.images || [],
      category: product.category,
      productType: product.productType,
    });

    return res.status(201).json({
      success: true,
      favourite,
    });
  } catch (error) {
    // ✅ DUPLICATE (USER + PRODUCT + SIZE)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Already in favourites",
      });
    }

    console.error("❌ Favourite Add Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add favourite",
    });
  }
});

/* ================= GET USER FAVOURITES ================= */
router.get("/", authorization, async (req, res) => {
  try {
    const userId = req.user._id; // ✅ FIXED

    const favourites = await Favourite.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      favourites,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch favourites",
    });
  }
});

/* ================= DELETE FAVOURITE ================= */
router.delete("/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // ✅ FIXED

    const deleted = await Favourite.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Favourite not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Removed from favourites",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete favourite",
    });
  }
});

module.exports = router;
