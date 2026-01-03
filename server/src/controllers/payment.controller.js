const crypto = require("crypto");
const axios = require("axios");

/* ======================================================
   INITIATE PAYMENT
====================================================== */
exports.initiatePayment = async (req, res) => {
  try {
    // 1️⃣ Build payload
    const payload = {
      merchantId: process.env.PHONEPE_MERCHANT_ID,
      merchantTransactionId: "MT" + Date.now(),
      merchantUserId: req.user.id,
      amount: req.body.amount * 100, // paise
      redirectUrl: `${process.env.BASE_URL}/payment-success`,
      redirectMode: "POST",
      callbackUrl: `${process.env.BASE_URL}/api/payment/webhook`,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    // 2️⃣ Encode payload
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString(
      "base64"
    );

    // 3️⃣ Generate checksum
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

    // 4️⃣ Call PhonePe
    const response = await api.post(
      `${process.env.PHONEPE_BASE_URL}/pg/v1/pay`,
      { request: base64Payload },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Payment Initiation Error:", error.message);
    res.status(500).json({ success: false, message: "Payment failed" });
  }
};

/* ======================================================
   PAYMENT STATUS CHECK
====================================================== */
exports.paymentStatus = async (req, res) => {
  try {
    const { merchantTransactionId } = req.params;

    const checksum =
      crypto
        .createHash("sha256")
        .update(
          `/pg/v1/status/${process.env.PHONEPE_MERCHANT_ID}/${merchantTransactionId}` +
            process.env.PHONEPE_SALT_KEY
        )
        .digest("hex") +
      "###" +
      process.env.PHONEPE_SALT_INDEX;

    const response = await api.get(
      `${process.env.PHONEPE_BASE_URL}/pg/v1/status/${process.env.PHONEPE_MERCHANT_ID}/${merchantTransactionId}`,
      {
        headers: {
          "X-VERIFY": checksum,
          "X-MERCHANT-ID": process.env.PHONEPE_MERCHANT_ID,
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Payment Status Error:", error.message);
    res.status(500).json({ success: false });
  }
};

/* ======================================================
   PHONEPE WEBHOOK (RAW BODY)
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

    // ✅ Update order/payment status in DB here

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook Error:", error.message);
    res.status(500).json({ success: false });
  }
};
