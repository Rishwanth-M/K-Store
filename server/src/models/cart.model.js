const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },

    size: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    /* snapshot (safe subset) */
    name: String,
    price: Number,
    images: [String],
    category: String,
    productType: String,
  },
  { timestamps: true }
);

/* prevent duplicate same product + size per user */
cartSchema.index(
  { user: 1, product: 1, size: 1 },
  { unique: true }
);

module.exports = mongoose.model("cart", cartSchema);
