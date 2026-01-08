const createCODOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { cartProducts = [], shippingDetails = {} } = req.body;

    if (!cartProducts.length) {
      return res.status(400).json({ success: false, message: "Cart empty" });
    }

    /* 🔁 Reuse your EXISTING order creation logic */
    const order = await createOrderInternal({
      userId,
      cartProducts,
      shippingDetails,
      paymentProvider: "COD",
    });

    /* 📦 CREATE BLUEDART SHIPMENT (next step) */
    // const shipment = await createBlueDartShipment(order);

    return res.status(201).json({
      success: true,
      orderId: order._id,
      message: "Order placed with Cash on Delivery",
    });
  } catch (err) {
    next(err);
  }
};
