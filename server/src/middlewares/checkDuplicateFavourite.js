const Favourite = require("../models/favourite.model");

const checkDuplicateFavourite = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId is required",
      });
    }

    const exists = await Favourite.findOne({
      user: userId,
      product: productId,
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Product already added to favourites",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = checkDuplicateFavourite;
