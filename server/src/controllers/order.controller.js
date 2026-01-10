const Order = require("../models/order.model");
const Product = require("../models/product.model");
const { initiateShipmentForOrder } = require("../services/shipment.service");

/* =====================================================
   🔒 PHONEPE ORDER (UNCHANGED)
   ===================================================== */
const createOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { cartProducts = [], shippingDetails = {} } = req.body;

    if (!cartProducts.length) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const productIds = cartProducts.map((p) => p._id);

    const productsFromDB = await Product.find({ _id: { $in: productIds } }).lean();

    if (!productsFromDB.length) {
      return res.status(400).json({ success: false, message: "Invalid cart products" });
    }

    const orderItems = cartProducts.map((cartItem) => {
      const product = productsFromDB.find(
        (p) => String(p._id) === String(cartItem._id)
      );
      if (!product) throw new Error("Product mismatch");

      return {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: Number(cartItem.quantity),
        size: cartItem.size,
        images: product.images || [],
        category: product.category,
        productType: product.productType,
      };
    });

    const subTotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shipping = subTotal > 999 ? 0 : 50;
    const total = subTotal + shipping;

    const order = await Order.create({
      user: userId,
      cartProducts: orderItems,
      orderSummary: {
        subTotal,
        shipping,
        discount: 0,
        total,
        quantity: orderItems.length,
      },
      shippingDetails,
      orderStatus: "CREATED",
      paymentDetails: {
        provider: "PHONEPE",
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

/* =====================================================
   🟢 COD ORDER + 🚚 BLUEDART (AUTO, CORRECT)
   ===================================================== */
const createCODOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { cartProducts = [], shippingDetails = {} } = req.body;

    if (!cartProducts.length) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const productIds = cartProducts.map((p) => p._id);
    const productsFromDB = await Product.find({ _id: { $in: productIds } }).lean();

    if (!productsFromDB.length) {
      return res.status(400).json({ success: false, message: "Invalid cart products" });
    }

    const orderItems = cartProducts.map((cartItem) => {
      const product = productsFromDB.find(
        (p) => String(p._id) === String(cartItem._id)
      );
      if (!product) throw new Error("Product mismatch");

      return {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: Number(cartItem.quantity),
        size: cartItem.size,
        images: product.images || [],
        category: product.category,
        productType: product.productType,
      };
    });

    const subTotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shipping = subTotal > 999 ? 0 : 50;
    const total = subTotal + shipping;

    /* 🟢 STEP 1: CREATE ORDER */
    const order = await Order.create({
      user: userId,
      cartProducts: orderItems,
      orderSummary: {
        subTotal,
        shipping,
        discount: 0,
        total,
        quantity: orderItems.length,
      },
      shippingDetails,
      orderStatus: "CONFIRMED",
      paymentDetails: {
        provider: "COD",
        paymentStatus: "PENDING",
      },
    });

    /* 🚚 STEP 2: SHIPMENT VIA SERVICE */
    await initiateShipmentForOrder(order._id);

    return res.status(201).json({
      success: true,
      orderId: order._id,
      message: "Order placed successfully",
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

    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  createCODOrder,
  getUserOrders,
};
