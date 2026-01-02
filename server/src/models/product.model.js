const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    productType: {
      type: String,
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      default: "",
    },

    stock: {
      type: Number,
      required: true,
    },

    /* 🔥 FIX: allow OBJECTS inside images array */
    images: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },

    /* 🔥 MATCH DB STRUCTURE */
    variants: {
      type: Array,
      default: [],
    },

    details: {
      type: String,
      default: "",
    },

    material: {
      type: String,
      default: "",
    },

    sizeGuide: {
      type: String,
      default: "",
    },

    delivery: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* 🔥 KEEP YOUR COLLECTION NAME */
module.exports = mongoose.model("product", productSchema, "allproducts");
