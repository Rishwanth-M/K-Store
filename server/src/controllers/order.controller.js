const Order = require("../models/order.model");

/* ================= CREATE ORDER ================= */
const createOrder = async (req, res, next) => {
  try {
    const { cartProducts = [], shippingDetails = {} } = req.body;

    if (!cartProducts.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    /* ================= NORMALIZE CART ================= */
    const normalizedProducts = cartProducts.map((item) => ({
      title: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
      size: item.size,
      color: item.color || "Default",
      img: Array.isArray(item.images) ? item.images : [],
    }));

    /* ================= SERVER-SIDE CALCULATION ================= */
    const subTotal = normalizedProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shipping = subTotal > 999 ? 0 : 50; // example rule
    const discount = 0;
    const total = subTotal + shipping - discount;

    /* ================= NORMALIZE SHIPPING ================= */
    const normalizedShipping = {
      firstName: shippingDetails.firstName,
      lastName: shippingDetails.lastName,
      addressLine1: shippingDetails.addressLine1,
      addressLine2: shippingDetails.addressLine2 || "",
      locality: shippingDetails.locality,
      pinCode: String(shippingDetails.pinCode),
      state: shippingDetails.state,
      country: shippingDetails.country,
      email: shippingDetails.email,
      mobile: String(shippingDetails.mobile),
    };

    /* ================= CREATE ORDER ================= */
    const order = await Order.create({
      user: req.user._id,
      cartProducts: normalizedProducts,
      orderSummary: {
        subTotal,
        shipping,
        discount,
        total,
        quantity: normalizedProducts.length,
      },
      shippingDetails: normalizedShipping,
      paymentStatus: "PENDING",
      orderStatus: "CREATED",
    });

    return res.status(201).json({
      success: true,
      message: "Order created",
      orderId: order._id,
      payableAmount: total,
    });

  } catch (error) {
    next(error);
  }
};

/* ================= GET USER ORDERS ================= */
const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select("-__v");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
};
