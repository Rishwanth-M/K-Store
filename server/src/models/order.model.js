const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    /* ================= USER ================= */
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    /* ================= ORDER STATUS ================= */
    orderStatus: {
      type: String,
      enum: ["CREATED", "PAID", "FAILED"],
      default: "CREATED",
      index: true,
    },

    /* ================= CART SNAPSHOT ================= */
    cartProducts: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
        images: { type: [String], default: [] },
        category: { type: String },
        productType: { type: String },
      },
    ],

    /* ================= ORDER SUMMARY ================= */
    orderSummary: {
      subTotal: { type: Number, required: true },
      shipping: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      total: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },

    /* ================= PAYMENT DETAILS ================= */
    paymentDetails: {
      provider: {
        type: String,
        enum: ["PHONEPE"],
        default: "PHONEPE",
      },

      merchantTransactionId: {
        type: String,
        index: true,
      },

      phonepeTransactionId: {
        type: String,
      },

      paymentStatus: {
        type: String,
        enum: ["INITIATED", "SUCCESS", "FAILED"],
        default: "INITIATED",
        index: true,
      },

      initiatedAt: {
        type: Date,
      },

      completedAt: {
        type: Date,
      },
    },

    /* ================= SHIPPING ================= */
    shippingDetails: {
      firstName: String,
      lastName: String,
      addressLine1: String,
      addressLine2: String,
      locality: String,
      pinCode: String,
      state: String,
      country: String,
      email: String,
      mobile: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Order", orderSchema);
