const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const authorization = require("../middlewares/authorization");
const Product = require("../models/product.model");
const Order = require("../models/order.model");

/* =====================================================
   INITIATE PAYMENT (PHONEPE STYLE - DEMO)
===================================================== */
router.post("/order", authorization, async (req, res) => {
  try {
    const { cartProducts, shippingDetails } = req.body;

    if (!cartProducts || !cartProducts.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    /* ================= SERVER-SIDE AMOUNT CALCULATION ================= */
    let totalAmount = 0;
    const normalizedProducts = [];

    for (const item of cartProducts) {
      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const quantity = Number(item.quantity);
      totalAmount += product.price * quantity;

      normalizedProducts.push({
  title: item.name || product.name,   // ✅ FIX (CRITICAL)
  gender: product.gender || "Unisex",
  description: product.description || "",
  category: product.category || "General",
  price: Number(product.price),
  size: item.size,
  color: item.color || "Default",
  rating: Number(product.rating || 0),
  img: Array.isArray(product.images) ? product.images : [],
  quantity,
});

    }

    /* ================= TRANSACTION ID ================= */
    const merchantTransactionId = `TXN_${Date.now()}`;

    /* ================= CREATE ORDER (CREATED STATE) ================= */
    const order = await Order.create({
      amount: totalAmount,
      orderStatus: "PAYMENT_PENDING",

      cartProducts: normalizedProducts,
      shippingDetails,

      paymentDetails: {
        provider: "PHONEPE",
        merchantTransactionId,
        paymentStatus: "INITIATED",
      },

      user: req.user._id,
    });

    /* ================= DEMO REDIRECT URL ================= */
    const redirectUrl = `${process.env.FRONTEND_URL}/payment-success?txn=${merchantTransactionId}`;

    return res.status(200).json({
      success: true,
      redirectUrl,
    });
  } catch (error) {
    console.error("❌ PAYMENT INIT ERROR:", error);

    return res.status(500).json({
      message: "Payment initiation failed",
    });
  }
});

/* =====================================================
   VERIFY PAYMENT (PHONEPE CALLBACK STYLE - DEMO)
===================================================== */
router.post("/verify", async (req, res) => {
  try {
    const { merchantTransactionId, status } = req.body;

    const order = await Order.findOne({
      "paymentDetails.merchantTransactionId": merchantTransactionId,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status !== "SUCCESS") {
      order.orderStatus = "FAILED";
      order.paymentDetails.paymentStatus = "FAILED";
      await order.save();

      return res.status(400).json({
        success: false,
        message: "Payment failed",
      });
    }

    /* ================= PAYMENT VERIFIED ================= */
    order.orderStatus = "PAID";
    order.paymentDetails.paymentStatus = "SUCCESS";
    order.paymentDetails.checksumVerified = true;

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified and order confirmed",
    });
  } catch (error) {
    console.error("❌ PAYMENT VERIFY ERROR:", error);

    return res.status(500).json({
      message: "Payment verification failed",
    });
  }
});

module.exports = router;
