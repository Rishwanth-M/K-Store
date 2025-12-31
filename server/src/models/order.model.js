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
      enum: ["CREATED", "PAYMENT_PENDING", "PAID", "FAILED"],
      default: "CREATED",
    },

    /* ================= CART SNAPSHOT ================= */
    cartProducts: [
      {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
        color: { type: String, default: "Default" },
        img: { type: [String], default: [] },
      },
    ],

    /* ================= ORDER SUMMARY (IMMUTABLE) ================= */
    orderSummary: {
      subTotal: { type: Number, required: true },
      shipping: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      total: { type: Number, required: true }, // 👈 SINGLE SOURCE OF TRUTH
      quantity: { type: Number, required: true },
    },

    /* ================= PAYMENT DETAILS ================= */
    paymentDetails: {
      provider: {
        type: String,
        enum: ["PHONEPE"],
        default: "PHONEPE",
      },

      merchantTransactionId: { type: String },
      phonepeTransactionId: { type: String },

      paymentStatus: {
        type: String,
        enum: ["INITIATED", "SUCCESS", "FAILED"],
        default: "INITIATED",
      },

      checksumVerified: {
        type: Boolean,
        default: false,
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
