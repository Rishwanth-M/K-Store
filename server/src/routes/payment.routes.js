const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");
const {
  initiatePayment,
  verifyPayment,
} = require("../controllers/payment.controller");

router.post("/initiate", authorization, initiatePayment);
router.post("/callback", verifyPayment);

module.exports = router;
