const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");
const {
  createOrder,
  getUserOrders,
} = require("../controllers/order.controller");

router.post("/", authorization, createOrder);
router.get("/", authorization, getUserOrders);

module.exports = router;
