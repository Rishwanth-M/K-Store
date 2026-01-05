const crypto = require("crypto");
const axios = require("axios");
const Order = require("../models/order.model");

/* ======================================================
   INITIATE PHONEPE PAYMENT (PG - SANDBOX / TEST)
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

    const merchantTransactionId = "MT" + Date.now();

    // ✅ update payment details safely
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
      redirectUrl: `${process.env.FRONTEND_URL}/payment-success`,
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
      crypto.createHash("sha256").update(stringToSign).digest("hex") +
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
   PHONEPE WEBHOOK (SERVER → SERVER)
====================================================== */
exports.phonePeWebhook = async (req, res) => {
  try {
    const receivedChecksum = req.headers["x-verify"];
    const payload = req.body.toString("utf8");

    const calculatedChecksum =
      crypto
        .createHash("sha256")
        .update(payload + process.env.PHONEPE_SALT_KEY)
        .digest("hex") +
      "###" +
      process.env.PHONEPE_SALT_INDEX;

    if (receivedChecksum !== calculatedChecksum) {
      console.error("❌ Invalid PhonePe checksum");
      return res.status(400).json({ success: false });
    }

    const data = JSON.parse(payload);
    const transactionId = data?.data?.merchantTransactionId;
    const state = data?.data?.state;

    const order = await Order.findOne({
      "paymentDetails.merchantTransactionId": transactionId,
    });

    if (!order) {
      return res.status(404).json({ success: false });
    }

    if (state === "COMPLETED") {
      order.paymentDetails.paymentStatus = "SUCCESS";
      order.paymentDetails.phonepeTransactionId =
        data.data.transactionId || null;
      order.paymentDetails.completedAt = new Date();
      order.orderStatus = "PAID";
    } else {
      order.paymentDetails.paymentStatus = "FAILED";
      order.paymentDetails.completedAt = new Date();
      order.orderStatus = "FAILED";
    }

    await order.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ PhonePe WEBHOOK error:", error.message);
    return res.status(500).json({ success: false });
  }
};
