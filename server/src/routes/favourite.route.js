const router = require("express").Router();

const authorization = require("../middlewares/authorization");
const checkDuplicateFavourite = require("../middlewares/checkDuplicateFavourite");
const Favourite = require("../models/favourite.model");

const {
  postFavourite,
  getFavourites,
  deleteOne,
} = require("../controllers/crud.controller");

// Add to favourite
router.post(
  "/",
  authorization,
  checkDuplicateFavourite,
  postFavourite(Favourite)
);

// Get all favourites of logged-in user
router.get("/", authorization, getFavourites(Favourite));

// Remove favourite (protected)
router.delete("/:id", authorization, deleteOne(Favourite));

module.exports = router;
