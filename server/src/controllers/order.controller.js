const Order = require("../models/order.model");
const Product = require("../models/product.model");

/* ================= CREATE ORDER ================= */
const createOrder = async (req, res, next) => {
  try {
    const userId = req.user._id; // ✅ FIXED (ONLY THIS)

    const { cartProducts = [], shippingDetails = {} } = req.body;

    if (!cartProducts.length) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const productIds = cartProducts.map((p) => p._id);
    const productsFromDB = await Product.find({
      _id: { $in: productIds },
    }).lean();

    if (!productsFromDB.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart products",
      });
    }

    const orderItems = cartProducts.map((cartItem) => {
      const product = productsFromDB.find(
        (p) => String(p._id) === String(cartItem._id)
      );

      if (!product) throw new Error("Product mismatch");

      return {
        title: product.name,
        price: product.price,
        quantity: Number(cartItem.quantity),
        size: cartItem.size,
        img: product.images || [],
        color: product.color || "Default",
      };
    });

    const subTotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shipping = subTotal > 999 ? 0 : 50;
    const discount = 0;
    const total = subTotal + shipping - discount;

    const order = await Order.create({
      user: userId, // ✅ ALWAYS PRESENT NOW
      cartProducts: orderItems,
      orderSummary: {
        subTotal,
        shipping,
        discount,
        total,
        quantity: orderItems.length,
      },
      shippingDetails,
      orderStatus: "CREATED",
      paymentDetails: {
        paymentStatus: "INITIATED",
      },
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
    const userId = req.user._id;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
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
