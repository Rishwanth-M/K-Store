const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");
const Order = require("../models/order.model");

/* =====================================================
   CREATE ORDER
===================================================== */
router.post("/", authorization, async (req, res) => {
  try {
    const {
      cartProducts = [],
      orderSummary = {},
      paymentDetails = {},
      shippingDetails = {},
    } = req.body;

    if (!cartProducts.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 🔧 Normalize shipping details
    const normalizedShipping = {
      ...shippingDetails,
      pinCode: Number(shippingDetails.pinCode),
      mobile: Number(shippingDetails.mobile),
    };

    // 🔧 Normalize cart products
    const normalizedProducts = cartProducts.map((item) => ({
      ...item,
      price: Number(item.price),
      rating: Number(item.rating),
      quantity: Number(item.quantity),
    }));

    // 🔧 Normalize order summary
    const normalizedSummary = {
      subTotal: Number(orderSummary.subTotal),
      quantity: Number(orderSummary.quantity),
      shipping: Number(orderSummary.shipping),
      discount: Number(orderSummary.discount),
      total: Number(orderSummary.total),
    };

    const order = await Order.create({
      cartProducts: normalizedProducts,
      orderSummary: normalizedSummary,
      paymentDetails,
      shippingDetails: normalizedShipping,
      user: req.user._id,
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error("❌ ORDER ERROR:", error);

    return res.status(500).json({
      message: "Order creation failed",
      error: error.message,
    });
  }
});

/* =====================================================
   GET USER ORDERS
===================================================== */
router.get("/", authorization, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

module.exports = router;
