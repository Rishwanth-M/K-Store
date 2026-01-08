const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");

const {
  createOrder,      // 🔒 PhonePe (unchanged)
  createCODOrder,   // 🟢 COD (new)
  getUserOrders,
} = require("../controllers/order.controller");

/* ================= ORDERS ================= */

// PhonePe order (EXISTING – DO NOT TOUCH)
router.post("/", authorization, createOrder);

// COD order (NEW)
router.post("/cod", authorization, createCODOrder);

// Get user orders
router.get("/", authorization, getUserOrders);

module.exports = router;
