const { Schema, model } = require("mongoose");

const favouriteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    size: {
      type: String,
      required: true,
    },

    /* ===== SNAPSHOT (SAFE SUBSET) ===== */
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], default: [] },
    category: { type: String },
    productType: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* ===== PREVENT DUPLICATES (USER + PRODUCT + SIZE) ===== */
favouriteSchema.index(
  { user: 1, product: 1, size: 1 },
  { unique: true }
);

module.exports = model("Favourite", favouriteSchema);
