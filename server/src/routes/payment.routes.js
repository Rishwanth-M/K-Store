const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");
const {
  initiatePayment,
  phonePeCallback,
  phonePeWebhook,
} = require("../controllers/payment.controller");

/* INITIATE PAYMENT */
router.post("/initiate", authorization, initiatePayment);

/* PHONEPE REDIRECT CALLBACK (POST + GET SAFE) */
router.all("/callback", phonePeCallback);

/* PHONEPE WEBHOOK */
router.post("/webhook", phonePeWebhook);

module.exports = router;
