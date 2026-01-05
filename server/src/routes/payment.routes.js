const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");
const {
  initiatePayment,
  phonePeCallback,
  phonePeWebhook,
} = require("../controllers/payment.controller");

/* ======================================================
   INITIATE PAYMENT
   CLIENT → SERVER
   🔐 AUTH REQUIRED
====================================================== */
router.post("/initiate", authorization, initiatePayment);

/* ======================================================
   PHONEPE REDIRECT CALLBACK
   PHONEPE / BROWSER → SERVER
   ❌ NO AUTH
====================================================== */
router.get("/callback", phonePeCallback);

/* ======================================================
   PHONEPE WEBHOOK
   PHONEPE → SERVER (POST)
   ❌ NO AUTH
====================================================== */
router.post("/webhook", phonePeWebhook);

module.exports = router;
