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
    // 🔒 EXISTING VALUES KEPT
    // ➕ COD-friendly statuses added
    orderStatus: {
      type: String,
      enum: ["CREATED", "PAID", "FAILED", "CONFIRMED", "SHIPPED", "DELIVERED"],
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
      // 🔒 PHONEPE KEPT AS DEFAULT
      // ➕ COD ADDED AS OPTION
      provider: {
        type: String,
        enum: ["PHONEPE", "COD"],
        default: "PHONEPE",
      },

      // 🔒 PHONEPE FIELDS (UNCHANGED)
      merchantTransactionId: {
        type: String,
        index: true,
      },

      phonepeTransactionId: {
        type: String,
      },

      // 🔒 EXISTING STATUSES KEPT
      // ➕ PENDING added for COD
      paymentStatus: {
        type: String,
        enum: ["INITIATED", "SUCCESS", "FAILED", "PENDING"],
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

    /* ================= SHIPPING ADDRESS ================= */
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

    /* ================= LOGISTICS (NEW - NON BREAKING) ================= */
    // 🟢 This does NOT affect PhonePe in any way
    logistics: {
      courier: {
        type: String,
        default: "BLUEDART",
      },

      awbNumber: {
        type: String,
        index: true,
      },

      shipmentId: {
        type: String,
      },

      status: {
        type: String,
        enum: ["CREATED", "PICKED", "IN_TRANSIT", "DELIVERED"],
        default: "CREATED",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Order", orderSchema);
