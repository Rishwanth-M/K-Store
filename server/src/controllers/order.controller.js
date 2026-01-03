const Order = require("../models/order.model");
const Product = require("../models/product.model");

/* ================= CREATE ORDER ================= */
const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id; // ✅ FIX
    const { cartProducts = [], shippingDetails = {} } = req.body;

    if (!cartProducts.length) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    /* ================= FETCH PRODUCTS SAFELY ================= */
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

    /* ================= BUILD ORDER ITEMS ================= */
    const orderItems = cartProducts.map((cartItem) => {
      const product = productsFromDB.find(
        (p) => String(p._id) === String(cartItem._id)
      );

      if (!product) {
        throw new Error("Product mismatch");
      }

      return {
        product: product._id,
        name: product.name,
        price: product.price, // ✅ SERVER TRUSTED
        quantity: Number(cartItem.quantity),
        size: cartItem.size,
        images: product.images || [],
        category: product.category,
        productType: product.productType,
      };
    });

    /* ================= CALCULATE TOTAL ================= */
    const subTotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shipping = subTotal > 999 ? 0 : 50;
    const discount = 0;
    const total = subTotal + shipping - discount;

    /* ================= CREATE ORDER ================= */
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
      paymentStatus: "PENDING",
      orderStatus: "CREATED",
    });

    return res.status(201).json({
      success: true,
      message: "Order created",
      orderId: order._id,
      amount: total,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= GET USER ORDERS ================= */
const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

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
