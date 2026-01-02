const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");
const {
  initiatePayment,
  paymentStatus,
  phonePeWebhook,
} = require("../controllers/payment.controller");

/* ======================================================
   INITIATE PAYMENT (CLIENT → SERVER)
====================================================== */
router.post("/initiate", authorization, initiatePayment);

/* ======================================================
   PAYMENT STATUS CHECK (OPTIONAL CLIENT POLL)
====================================================== */
router.get("/status/:merchantTransactionId", paymentStatus);

/* ======================================================
   PHONEPE WEBHOOK (SERVER → SERVER)
   ⚠ MUST MATCH raw-body middleware path
====================================================== */
router.post("/webhook", phonePeWebhook);

module.exports = router;
