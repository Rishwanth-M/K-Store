const router = require("express").Router();
const authorization = require("../middlewares/authorization");
const checkDuplicateFavourite = require("../middlewares/checkDuplicateFavourite");
const Favourite = require("../models/favourite.model");

// ADD TO FAVOURITE
router.post("/", authorization, checkDuplicateFavourite, async (req, res) => {
  try {
    const userId = req.user._id;
    const product = req.body;

    const favourite = await Favourite.create({
      userId,
      productId: product._id,
      name: product.name,
      price: product.price,
      images: product.images || [],
      description: product.description,
      category: product.category,
      productType: product.productType,
    });

    return res.status(201).json(favourite);
  } catch (error) {
    console.error("❌ Favourite Add Error:", error);
    return res.status(500).json({
      message: "Failed to add favourite",
    });
  }
});

// GET FAVOURITES
router.get("/", authorization, async (req, res) => {
  try {
    const userId = req.user._id;
    const favourites = await Favourite.find({ userId });
    return res.status(200).json(favourites);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch favourites" });
  }
});

// DELETE FAVOURITE
router.delete("/:id", authorization, async (req, res) => {
  try {
    await Favourite.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Removed from favourites" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete favourite" });
  }
});

module.exports = router;
