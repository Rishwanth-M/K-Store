const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");
const {
  initiatePayment,
  phonePeWebhook,
} = require("../controllers/payment.controller");

/* ======================================================
   INITIATE PAYMENT (CLIENT → SERVER)
====================================================== */
router.post("/initiate", authorization, initiatePayment);

/* ======================================================
   PHONEPE WEBHOOK (SERVER → SERVER)
   ❌ DO NOT ADD AUTH HERE
====================================================== */
router.post("/webhook", phonePeWebhook);

module.exports = router;
