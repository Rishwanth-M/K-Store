const router = require("express").Router();

const authorization = require("../middlewares/authorization");
const checkDuplicateFavourite = require("../middlewares/checkDuplicateFavourite");

const Favourite = require("../models/favourite.model");
const Product = require("../models/product.model");

/* ================= ADD TO FAVOURITES ================= */
router.post("/", authorization, checkDuplicateFavourite, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId is required",
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

      // snapshot
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
    return res.status(500).json({
      success: false,
      message: "Failed to add favourite",
    });
  }
});

/* ================= GET USER FAVOURITES ================= */
router.get("/", authorization, async (req, res) => {
  try {
    const favourites = await Favourite.find({
      user: req.user._id,
    }).lean();

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

/* ================= DELETE FAVOURITE (OWNERSHIP SAFE) ================= */
router.delete("/:id", authorization, async (req, res) => {
  try {
    const deleted = await Favourite.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
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
