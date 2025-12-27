router.post("/", authorization, async (req, res) => {
  try {
    const {
      cartProducts,
      orderSummary,
      paymentDetails,
      shippingDetails,
    } = req.body;

    // 🔧 Normalize shipping details
    const normalizedShipping = {
      ...shippingDetails,
      pinCode: Number(shippingDetails.pinCode),
      mobile: Number(shippingDetails.mobile),
    };

    // 🔧 Normalize cart products
    const normalizedProducts = cartProducts.map((item) => ({
      ...item,
      price: Number(item.price),
      rating: Number(item.rating),
      quantity: Number(item.quantity),
    }));

    // 🔧 Normalize order summary
    const normalizedSummary = {
      subTotal: Number(orderSummary.subTotal),
      quantity: Number(orderSummary.quantity),
      shipping: Number(orderSummary.shipping),
      discount: Number(orderSummary.discount),
      total: Number(orderSummary.total),
    };

    const order = await Order.create({
      cartProducts: normalizedProducts,
      orderSummary: normalizedSummary,
      paymentDetails,
      shippingDetails: normalizedShipping,
      user: req.user._id,
    });

    return res.status(201).json(order);

  } catch (error) {
    console.error("❌ ORDER ERROR:", error.message);

    return res.status(500).json({
      message: "Order creation failed",
      error: error.message,
    });
  }
});
