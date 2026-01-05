const axios = require("axios");
const Order = require("../models/order.model");

/* ======================================================
   GET PHONEPE ACCESS TOKEN (OAUTH)
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

  if (!response.data?.access_token) {
    throw new Error("Failed to get PhonePe access token");
  }

  return response.data.access_token;
};

/* ======================================================
   INITIATE PAYMENT (TEST MODE)
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

    // ✅ MERGE, do not overwrite
    order.paymentDetails = {
      ...order.paymentDetails,
      merchantTransactionId,
      paymentStatus: "INITIATED",
      initiatedAt: new Date(),
    };

    await order.save();

    const accessToken = await getPhonePeToken();

    const payload = {
      merchantTransactionId,
      merchantUserId: req.user._id.toString(),
      amount: Math.round(amount * 100),
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

    const redirectUrl =
      response?.data?.data?.instrumentResponse?.redirectInfo?.url;

    if (!redirectUrl) {
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
   PHONEPE CALLBACK (PAYMENT STATUS CHECK)
====================================================== */
exports.phonePeCallback = async (req, res) => {
  try {
    const { transactionId } = req.query;

    if (!transactionId) {
      return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
    }

    const order = await Order.findOne({
      "paymentDetails.merchantTransactionId": transactionId,
    });

    if (!order) {
      return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
    }

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

    const data = response?.data?.data;
    const paymentState = data?.state;

    if (paymentState === "COMPLETED") {
      order.paymentDetails.paymentStatus = "SUCCESS";
      order.paymentDetails.phonepeTransactionId = data.transactionId || null;
      order.paymentDetails.completedAt = new Date();
      order.orderStatus = "PAID";
      await order.save();

      return res.redirect(`${process.env.FRONTEND_URL}/payment-success`);
    }

    order.paymentDetails.paymentStatus = "FAILED";
    order.paymentDetails.completedAt = new Date();
    order.orderStatus = "FAILED";
    await order.save();

    return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
  } catch (error) {
    console.error("❌ PhonePe CALLBACK error:", error.message);
    return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
  }
};
