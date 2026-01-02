const { Schema, model } = require("mongoose");

const productSchema = new Schema(
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
      enum: ["boys", "girls", "unisex"],
      required: true,
      lowercase: true, // 🔒 normalize
    },

    productType: {
      type: String,
      enum: ["combo", "tshirt", "short", "jacket", "cap", "socks"],
      required: true,
      lowercase: true, // 🔒 normalize
    },

    description: {
      type: String,
      required: true,
    },

    specs: {
      type: [String],
      default: [],
    },

    sizes: {
      type: [String],
      default: [], // ⚠️ your DB uses variants instead
    },

    colors: {
      type: [String],
      default: [],
    },

    stock: {
      type: Number,
      required: true,
    },

    images: {
      type: [String],
      required: true,
    },

    /* ===== YOUR EXISTING FIELDS ===== */

    variants: {
      type: [
        {
          size: String,
          stock: Number,
        },
      ],
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
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

/* 🔥 CRITICAL FIX — FORCE COLLECTION NAME */
module.exports = model(
  "product",
  productSchema,
  "allproducts" // ✅ MATCHES YOUR MONGODB COLLECTION
);
