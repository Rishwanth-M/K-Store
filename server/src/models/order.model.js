const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    /* ================= ORDER AMOUNT (IMMUTABLE) ================= */
    amount: {
      type: Number,
      required: true, // calculated ONLY on backend
    },

    /* ================= ORDER STATUS ================= */
    orderStatus: {
      type: String,
      enum: ["CREATED", "PAYMENT_PENDING", "PAID", "FAILED"],
      default: "CREATED",
    },

    /* ================= CART PRODUCTS ================= */
    cartProducts: [
      {
        title: {
          type: String,
          required: true, // product name at time of purchase
        },

        price: {
          type: Number,
          required: true,
        },

        size: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        /* ===== OPTIONAL METADATA (NON-CRITICAL) ===== */
        gender: {
          type: String,
          default: "Unisex",
        },

        description: {
          type: String,
          default: "",
        },

        category: {
          type: String,
          default: "General",
        },

        color: {
          type: String,
          default: "Default",
        },

        rating: {
          type: Number,
          default: 0,
        },

        img: {
          type: [String],
          default: [],
        },
      },
    ],

    /* ================= PAYMENT DETAILS (PHONEPE READY) ================= */
    paymentDetails: {
      provider: {
        type: String,
        enum: ["DEMO", "PHONEPE"],
        default: "DEMO",
      },

      merchantTransactionId: {
        type: String,
        required: true,
      },

      phonepeTransactionId: {
        type: String,
      },

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

    /* ================= SHIPPING DETAILS ================= */
    shippingDetails: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String, default: "" },
      locality: { type: String, required: true },
      pinCode: { type: Number, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      email: { type: String, required: true },
      mobile: { type: Number, required: true },
    },

    /* ================= USER ================= */
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("order", orderSchema);
