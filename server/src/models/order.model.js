const { Schema, model } = require("mongoose");

const reqString = { type: String, required: true };
const reqNumber = { type: Number, required: true };
const reqArray = { type: Array, required: true };

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

    /* ================= CART ================= */
    cartProducts: [
      {
        title: reqString,
        gender: reqString,
        description: reqString,
        category: reqString,
        price: reqNumber,
        size: reqString,
        color: reqString,
        rating: reqNumber,
        img: reqArray,
        quantity: reqNumber,
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
        type: String, // comes from PhonePe callback
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

    /* ================= SHIPPING ================= */
    shippingDetails: {
      firstName: reqString,
      lastName: reqString,
      addressLine1: reqString,
      addressLine2: { type: String },
      locality: reqString,
      pinCode: reqNumber,
      state: reqString,
      country: reqString,
      email: reqString,
      mobile: reqNumber,
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
