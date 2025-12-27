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

    /* ================= NORMALIZE SHIPPING ================= */
    const normalizedShipping = {
      firstName: shippingDetails.firstName,
      lastName: shippingDetails.lastName,
      addressLine1: shippingDetails.addressLine1,
      addressLine2: shippingDetails.addressLine2 || "",
      locality: shippingDetails.locality,
      pinCode: Number(shippingDetails.pinCode),
      state: shippingDetails.state,
      country: shippingDetails.country,
      email: shippingDetails.email,
      mobile: Number(shippingDetails.mobile),
    };

    /* ================= NORMALIZE CART PRODUCTS ================= */
    const normalizedProducts = cartProducts.map((item) => ({
      title: item.name,                     // ✅ FIX
      gender: item.gender || "Unisex",      // ✅ DEFAULT
      description: item.description || "",
      category: item.category || "General",
      price: Number(item.price),
      size: item.size,                      // ✅ FROM CART
      color: item.color || "Default",
      rating: Number(item.rating || 0),     // ✅ DEFAULT
      img: Array.isArray(item.images) ? item.images : [],
      quantity: Number(item.quantity),
    }));

    /* ================= NORMALIZE ORDER SUMMARY ================= */
    const normalizedSummary = {
      subTotal: Number(orderSummary.subTotal),
      quantity: Number(orderSummary.quantity),
      shipping: Number(orderSummary.shipping),
      discount: Number(orderSummary.discount),
      total: Number(orderSummary.total),
    };

    /* ================= CREATE ORDER ================= */
    const order = await Order.create({
      cartProducts: normalizedProducts,
      orderSummary: normalizedSummary,
      paymentDetails,
      shippingDetails: normalizedShipping,
      user: req.user._id,
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error("❌ ORDER ERROR:", error.message);

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
