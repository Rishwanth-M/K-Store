const axios = require("axios");
const Order = require("../models/order.model");

const trackShipment = async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId).lean();
  if (!order) return res.status(404).json({ success: false });

  if (!order.logistics?.awbNumber) {
    return res.json({
      success: true,
      status: "PENDING",
      message: "Shipment not created yet",
    });
  }

  // 🔵 Blue Dart tracking API placeholder
  return res.json({
    success: true,
    courier: "BLUEDART",
    awb: order.logistics.awbNumber,
    status: order.logistics.status,
  });
};

module.exports = { trackShipment };
