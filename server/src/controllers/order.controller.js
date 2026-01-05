const Order = require("../models/order.model");
const Product = require("../models/product.model");

/* ================= CREATE ORDER ================= */
const createOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { cartProducts = [], shippingDetails = {} } = req.body;

    if (!cartProducts.length) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    /* 🔒 FETCH PRODUCTS FROM DB */
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

    /* ✅ BUILD cartProducts EXACTLY AS SCHEMA */
    const orderItems = cartProducts.map((cartItem) => {
      const product = productsFromDB.find(
        (p) => String(p._id) === String(cartItem._id)
      );

      if (!product) throw new Error("Product mismatch");

      return {
        product: product._id,              // ✅ REQUIRED
        name: product.name,                // ✅ REQUIRED
        price: product.price,
        quantity: Number(cartItem.quantity),
        size: cartItem.size,
        images: product.images || [],
        category: product.category,
        productType: product.productType,
      };
    });

    /* 💰 CALCULATE TOTAL */
    const subTotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shipping = subTotal > 999 ? 0 : 50;
    const discount = 0;
    const total = subTotal + shipping - discount;

    /* ✅ CREATE ORDER */
    const order = await Order.create({
      user: userId,
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
      .lean();

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
