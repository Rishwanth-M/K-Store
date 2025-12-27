const Favourite = require("../models/favourite.model");

const checkDuplicateFavourite = async (req, res, next) => {
  try {
    const exists = await Favourite.findOne({
      user: req.user._id,
      "data._id": req.body._id,
    });

    if (exists) {
      return res.status(400).json({
        status: "Failed",
        message: "Already added to favourites",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

module.exports = checkDuplicateFavourite;
