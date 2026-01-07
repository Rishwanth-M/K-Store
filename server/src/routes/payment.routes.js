const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");
const {
  initiatePayment,
  retryPayment,
  phonePeCallback,
  phonePeWebhook,
} = require("../controllers/payment.controller");

/* ======================================================
   INITIATE PAYMENT (NEW ORDER)
   CLIENT → SERVER
   🔐 AUTH REQUIRED
====================================================== */
router.post("/initiate", authorization, initiatePayment);

/* ======================================================
   RETRY PAYMENT (FAILED ORDER ONLY)
   CLIENT → SERVER
   🔐 AUTH REQUIRED
====================================================== */
router.post("/retry/:orderId", authorization, retryPayment);

/* ======================================================
   PHONEPE REDIRECT CALLBACK
   PHONEPE / BROWSER → SERVER
   ❌ NO AUTH
====================================================== */
router.all("/callback", phonePeCallback);

/* ======================================================
   PHONEPE WEBHOOK (SOURCE OF TRUTH)
   PHONEPE → SERVER
   ❌ NO AUTH
====================================================== */
router.post("/webhook", phonePeWebhook);

module.exports = router;
