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
    },

    productType: {
      type: String,
      enum: [
        "combo",
        "tshirt",
        "short",
        "jacket",
        "cap",
        "socks",
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    specs: {
      type: [String], // bullet points
      default: [],
    },

    sizes: {
      type: [String], // ["S","M","L","XL"]
      required: true,
    },

    colors: {
      type: [String], // ["Red","Blue"]
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    images: {
      type: [String], // image URLs
      required: true,
    },

    productDetails: {
  includes: [String],
  occasion: String,
  idealFor: String,
},

materialAndFit: {
  material: String,
  fit: String,
  sleeve: String,
  neckType: String,
},

careInstructions: {
  type: [String],
  default: [],
},

sizeAndFitGuide: {
  modelHeight: String,
  modelSize: String,
  fitNote: String,
},

deliveryAndReturns: {
  deliveryTime: String,
  deliveryDays: String,
  deliveryNote: String,
  returnPolicy: String,
},

  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("product", productSchema);
