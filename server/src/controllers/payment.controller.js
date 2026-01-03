const crypto = require("crypto");
const axios = require("axios");
const Order = require("../models/order.model");

/* ======================================================
   INITIATE PAYMENT
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

    /* ✅ FIND ORDER */
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    /* ✅ GENERATE TRANSACTION ID */
    const merchantTransactionId = "MT" + Date.now();

    /* ✅ SAVE TRANSACTION */
    order.paymentDetails.merchantTransactionId = merchantTransactionId;
    order.paymentDetails.paymentStatus = "INITIATED";
    await order.save();

    /* ✅ PHONEPE PAYLOAD */
    const payload = {
      merchantId: process.env.PHONEPE_MERCHANT_ID,
      merchantTransactionId,
      merchantUserId: req.user._id.toString(), // ✅ FIXED
      amount: amount * 100,
      redirectUrl: `${process.env.FRONTEND_URL}/payment-success`,
      redirectMode: "POST",
      callbackUrl: `${process.env.FRONTEND_URL}/api/payment/webhook`,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const base64Payload = Buffer.from(
      JSON.stringify(payload)
    ).toString("base64");

    /* ✅ CHECKSUM */
    const checksum =
      crypto
        .createHash("sha256")
        .update(
          base64Payload +
            "/pg/v1/pay" +
            process.env.PHONEPE_SALT_KEY
        )
        .digest("hex") +
      "###" +
      process.env.PHONEPE_SALT_INDEX;

    /* ✅ CALL PHONEPE */
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

    return res.status(200).json({
      success: true,
      redirectUrl:
        response.data.data.instrumentResponse.redirectInfo.url,
    });
  } catch (error) {
    console.error("❌ Payment Initiation Error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment initiation failed",
    });
  }
};

/* ======================================================
   PHONEPE WEBHOOK
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
      return res.status(400).json({ success: false });
    }

    const data = JSON.parse(payload);
    const transactionId = data.data.merchantTransactionId;
    const status = data.data.state;

    const order = await Order.findOne({
      "paymentDetails.merchantTransactionId": transactionId,
    });

    if (!order) {
      return res.status(404).json({ success: false });
    }

    if (status === "COMPLETED") {
      order.paymentDetails.paymentStatus = "SUCCESS";
      order.orderStatus = "PAID";
    } else {
      order.paymentDetails.paymentStatus = "FAILED";
      order.orderStatus = "FAILED";
    }

    order.paymentDetails.phonepeTransactionId =
      data.data.transactionId || null;
    order.paymentDetails.checksumVerified = true;

    await order.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return res.status(500).json({ success: false });
  }
};
