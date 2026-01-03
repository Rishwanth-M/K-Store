const Favourite = require("../models/favourite.model");

const checkDuplicateFavourite = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, size } = req.body;

    if (!productId || !size) {
      return res.status(400).json({
        success: false,
        message: "productId and size are required",
      });
    }

    const exists = await Favourite.findOne({
      user: userId,
      product: productId,
      size,
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Already in favourites",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Favourite check failed",
    });
  }
};

module.exports = checkDuplicateFavourite;
