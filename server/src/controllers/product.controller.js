const mongoose = require("mongoose");
const Product = require("../models/product.model");

/* ================= GET PRODUCTS ================= */
/* ================= GET PRODUCTS ================= */
exports.getProducts = async (req, res) => {
  try {
    const { category, productType } = req.query;

    const filter = { status: "active" };

    if (category) {
      filter.category = new RegExp(`^${category}$`, "i"); // case-insensitive
    }

    if (productType) {
      filter.productType = new RegExp(`^${productType}$`, "i"); // case-insensitive
    }

    const products = await Product.find(filter);

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/* ================= GET PRODUCT BY ID ================= */
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= CREATE PRODUCT (ADMIN ONLY – PLACEHOLDER) ================= */
exports.createProduct = async (req, res) => {
  try {
    // ⚠️ TEMP: later protect with admin middleware
    const allowedFields = [
      "name",
      "price",
      "category",
      "productType",
      "description",
      "specs",
      "sizes",
      "colors",
      "stock",
      "images",
      "productDetails",
      "materialAndFit",
      "careInstructions",
      "sizeAndFitGuide",
      "deliveryAndReturns",
    ];

    const data = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field];
      }
    });

    const product = await Product.create(data);

    return res.status(201).json({
      success: true,
      product,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE PRODUCT (ADMIN ONLY – PLACEHOLDER) ================= */
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const allowedFields = [
      "name",
      "price",
      "category",
      "productType",
      "description",
      "specs",
      "sizes",
      "colors",
      "stock",
      "images",
      "productDetails",
      "materialAndFit",
      "careInstructions",
      "sizeAndFitGuide",
      "deliveryAndReturns",
    ];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updated = await Product.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product: updated,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
