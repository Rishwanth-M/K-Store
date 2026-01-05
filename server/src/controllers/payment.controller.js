const crypto = require("crypto");
const axios = require("axios");
const Order = require("../models/order.model");

/* ======================================================
   INITIATE PHONEPE PAYMENT (PG - SANDBOX / PROD)
   CLIENT → SERVER
====================================================== */
exports.initiatePayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({
        success: false,
        message: "orderId and amount are required",
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    /* ================= CREATE TRANSACTION ID ================= */
    const merchantTransactionId = "MT" + Date.now();

    order.paymentDetails = {
      ...order.paymentDetails,
      merchantTransactionId,
      paymentStatus: "INITIATED",
      initiatedAt: new Date(),
    };

    await order.save();

    /* ================= PHONEPE PAYLOAD ================= */
    const payload = {
      merchantId: process.env.PHONEPE_MERCHANT_ID,
      merchantTransactionId,
      merchantUserId: req.user._id.toString(),
      amount: Math.round(amount * 100), // paise
      redirectUrl: `${process.env.BACKEND_URL}/api/payment/callback`,
      redirectMode: "GET",
      callbackUrl: `${process.env.BACKEND_URL}/api/payment/webhook`,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const base64Payload = Buffer.from(
      JSON.stringify(payload)
    ).toString("base64");

    /* ================= CHECKSUM ================= */
    const stringToSign =
      base64Payload + "/pg/v1/pay" + process.env.PHONEPE_SALT_KEY;

    const checksum =
      crypto
        .createHash("sha256")
        .update(stringToSign)
        .digest("hex") +
      "###" +
      process.env.PHONEPE_SALT_INDEX;

    /* ================= CALL PHONEPE ================= */
    const response = await axios.post(
      `${process.env.PHONEPE_BASE_URL}/pg/v1/pay`,
      { request: base64Payload },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
      }
    );

    const redirectUrl =
      response?.data?.data?.instrumentResponse?.redirectInfo?.url;

    if (!redirectUrl) {
      console.error("❌ PhonePe response:", response.data);
      throw new Error("PhonePe did not return redirect URL");
    }

    return res.status(200).json({
      success: true,
      redirectUrl,
    });
  } catch (error) {
    console.error(
      "❌ PhonePe INIT error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Payment initiation failed",
    });
  }
};

/* ======================================================
   PHONEPE REDIRECT CALLBACK (BROWSER → SERVER)
====================================================== */
exports.phonePeCallback = async (req, res) => {
  try {
    console.log("📥 PhonePe CALLBACK hit");
    console.log("Query:", req.query);
    console.log("Body:", req.body);

    const transactionId =
      req.query.transactionId ||
      req.body?.transactionId ||
      req.body?.merchantTransactionId;

    if (!transactionId) {
      console.error("❌ No transactionId from PhonePe");
      return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
    }

    const order = await Order.findOne({
      "paymentDetails.merchantTransactionId": transactionId,
    });

    if (!order) {
      console.error("❌ Order not found for transactionId:", transactionId);
      return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
    }

    // 🔥 Webhook is the source of truth
    if (order.paymentDetails.paymentStatus === "SUCCESS") {
      return res.redirect(`${process.env.FRONTEND_URL}/payment-success`);
    }

    return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
  } catch (err) {
    console.error("❌ CALLBACK ERROR:", err);
    return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
  }
};


/* ======================================================
   PHONEPE WEBHOOK (SERVER → SERVER)
====================================================== */
exports.phonePeWebhook = async (req, res) => {
  try {
    console.log("📥 PhonePe WEBHOOK hit");

    const receivedChecksum = req.headers["x-verify"];
    const payload = req.body.toString("utf8");

    console.log("📦 Raw payload:", payload);
    console.log("🔑 Received checksum:", receivedChecksum);

    const calculatedChecksum =
      crypto
        .createHash("sha256")
        .update(payload + process.env.PHONEPE_SALT_KEY)
        .digest("hex") +
      "###" +
      process.env.PHONEPE_SALT_INDEX;

    console.log("🔐 Calculated checksum:", calculatedChecksum);

    if (receivedChecksum !== calculatedChecksum) {
      console.error("❌ CHECKSUM MISMATCH");
      return res.status(400).json({ success: false });
    }

    const data = JSON.parse(payload);
    console.log("✅ Parsed webhook data:", data);

    const transactionId = data?.data?.merchantTransactionId;
    const state = data?.data?.state;

    console.log("🧾 Txn:", transactionId, "State:", state);

    const order = await Order.findOne({
      "paymentDetails.merchantTransactionId": transactionId,
    });

    if (!order) {
      console.error("❌ Order not found");
      return res.status(404).json({ success: false });
    }

    if (state === "COMPLETED") {
      order.paymentDetails.paymentStatus = "SUCCESS";
      order.orderStatus = "PAID";
    } else {
      order.paymentDetails.paymentStatus = "FAILED";
      order.orderStatus = "FAILED";
    }

    order.paymentDetails.completedAt = new Date();
    await order.save();

    console.log("✅ Order updated:", order._id);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ WEBHOOK ERROR:", err);
    return res.status(500).json({ success: false });
  }
};

