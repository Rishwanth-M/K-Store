const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");
const {
  initiatePayment,
  phonePeCallback,
} = require("../controllers/payment.controller");

/* ======================================================
   INITIATE PAYMENT
   CLIENT → SERVER
   🔐 AUTH REQUIRED
====================================================== */
router.post("/initiate", authorization, initiatePayment);

/* ======================================================
   PHONEPE CALLBACK (REDIRECT)
   PHONEPE / BROWSER → SERVER
   ❌ NO AUTH
====================================================== */
router.get("/callback", phonePeCallback);

module.exports = router;
