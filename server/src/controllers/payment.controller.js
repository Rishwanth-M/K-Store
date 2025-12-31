const crypto = require("crypto");
const Product = require("../models/product.model");
const Order = require("../models/order.model");

/* ================= HELPER ================= */
const generateTransactionId = (orderId) => {
  return `PP_${orderId}_${Date.now()}`;
};

/* ================= INITIATE PAYMENT ================= */
const initiatePayment = async (req, res, next) => {
  try {
    const { cartProducts, shippingDetails } = req.body;

    if (!cartProducts || !cartProducts.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    /* ===== SERVER-SIDE PRICE VALIDATION ===== */
    let totalAmount = 0;
    const normalizedProducts = [];

    for (const item of cartProducts) {
      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const quantity = Number(item.quantity);
      totalAmount += product.price * quantity;

      normalizedProducts.push({
        title: product.name,
        price: product.price,
        quantity,
        size: item.size,
        color: item.color || "Default",
        img: product.images || [],
      });
    }

    /* ================= CREATE ORDER ================= */
    const order = await Order.create({
      user: req.user._id,
      cartProducts: normalizedProducts,
      shippingDetails,
      orderStatus: "PAYMENT_PENDING",
      paymentStatus: "INITIATED",
      orderSummary: {
        total: totalAmount,
      },
    });

    const merchantTransactionId = generateTransactionId(order._id);

    order.paymentDetails = {
      provider: "PHONEPE",
      merchantTransactionId,
    };

    await order.save();

    /* ================= DEMO REDIRECT ================= */
    const redirectUrl = `${process.env.FRONTEND_URL}/payment-success?txn=${merchantTransactionId}`;

    return res.status(200).json({
      success: true,
      orderId: order._id,
      amount: totalAmount,
      redirectUrl,
    });

  } catch (error) {
    next(error);
  }
};

/* ================= VERIFY PAYMENT (CALLBACK) ================= */
const verifyPayment = async (req, res, next) => {
  try {
    const { merchantTransactionId, status, checksum } = req.body;

    const order = await Order.findOne({
      "paymentDetails.merchantTransactionId": merchantTransactionId,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    /* ================= CHECKSUM VERIFY (STRUCTURE) ================= */
    const payload = `${merchantTransactionId}|${order.orderSummary.total}`;
    const expectedChecksum = crypto
      .createHash("sha256")
      .update(payload + process.env.PHONEPE_SALT_KEY)
      .digest("hex");

    if (checksum !== expectedChecksum) {
      return res.status(400).json({
        success: false,
        message: "Checksum verification failed",
      });
    }

    if (status !== "SUCCESS") {
      order.orderStatus = "FAILED";
      order.paymentStatus = "FAILED";
      await order.save();

      return res.status(400).json({ message: "Payment failed" });
    }

    /* ================= PAYMENT SUCCESS ================= */
    order.orderStatus = "PAID";
    order.paymentStatus = "SUCCESS";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified",
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  initiatePayment,
  verifyPayment,
};
