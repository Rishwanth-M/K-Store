const axios = require("axios");
const Order = require("../models/order.model");

/* ======================================================
   GET PHONEPE ACCESS TOKEN
====================================================== */
const getPhonePeToken = async () => {
  const response = await axios.post(
    `${process.env.PHONEPE_BASE_URL}/oauth/token`,
    {
      clientId: process.env.PHONEPE_CLIENT_ID,
      clientSecret: process.env.PHONEPE_CLIENT_SECRET,
      grantType: "client_credentials",
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Client-Version": process.env.PHONEPE_CLIENT_VERSION,
      },
    }
  );

  return response.data.access_token;
};

/* ======================================================
   INITIATE PAYMENT (TEST MODE)
====================================================== */
exports.initiatePayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({ success: false, message: "Missing data" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const merchantTransactionId = "MT" + Date.now();

    order.paymentDetails = {
      merchantTransactionId,
      paymentStatus: "INITIATED",
    };
    await order.save();

    const accessToken = await getPhonePeToken();

    const payload = {
      merchantTransactionId,
      amount: amount * 100, // paise
      redirectUrl: `${process.env.FRONTEND_URL}/payment-success`,
      redirectMode: "GET",
      callbackUrl: `${process.env.BACKEND_URL}/api/payment/callback`,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const response = await axios.post(
      `${process.env.PHONEPE_BASE_URL}/pg/v1/pay`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Client-Version": process.env.PHONEPE_CLIENT_VERSION,
        },
      }
    );

    return res.status(200).json({
      success: true,
      redirectUrl: response.data.data.instrumentResponse.redirectInfo.url,
    });
  } catch (error) {
    console.error("❌ PhonePe INIT error:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: "Payment failed" });
  }
};

/* ======================================================
   PAYMENT STATUS CHECK (CALLBACK)
====================================================== */
exports.phonePeCallback = async (req, res) => {
  try {
    const { transactionId } = req.query;

    const order = await Order.findOne({
      "paymentDetails.merchantTransactionId": transactionId,
    });

    if (!order) return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);

    const accessToken = await getPhonePeToken();

    const response = await axios.get(
      `${process.env.PHONEPE_BASE_URL}/pg/v1/status/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Client-Version": process.env.PHONEPE_CLIENT_VERSION,
        },
      }
    );

    if (response.data.data.state === "COMPLETED") {
      order.paymentDetails.paymentStatus = "SUCCESS";
      order.orderStatus = "PAID";
    } else {
      order.paymentDetails.paymentStatus = "FAILED";
      order.orderStatus = "FAILED";
    }

    await order.save();

    res.redirect(`${process.env.FRONTEND_URL}/payment-success`);
  } catch (err) {
    console.error("❌ PhonePe CALLBACK error:", err.message);
    res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
  }
};
