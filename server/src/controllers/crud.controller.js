const mongoose = require("mongoose");

/* ================= CREATE ================= */
const post = (model, allowedFields = []) => async (req, res) => {
  try {
    const data = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field];
      }
    });

    const item = await model.create(data);

    return res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= CREATE FAVOURITE ================= */
const postFavourite = (model) => async (req, res) => {
  try {
    const item = await model.create({
      user: req.user._id,
      data: req.body,
    });

    return res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ALL ================= */
const getAll = (model) => async (req, res) => {
  try {
    const items = await model.find().lean();

    return res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET USER FAVOURITES ================= */
const getFavourites = (model) => async (req, res) => {
  try {
    const items = await model
      .find({ user: req.user._id })
      .lean();

    return res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE (OWNERSHIP SAFE) ================= */
const deleteOne = (model) => async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const item = await model.findOneAndDelete({
      _id: id,
      user: req.user._id, // 🔐 ownership check
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  post,
  postFavourite,
  getAll,
  getFavourites,
  deleteOne,
};
