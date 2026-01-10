// services/shipment.service.js

const Order = require("../models/order.model");
const { createBlueDartShipment } = require("./bluedart.service");

const initiateShipmentForOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) return;

  // Do not recreate shipment
  if (order.logistics?.awbNumber) return;

  const result = await createBlueDartShipment(order);

  if (result.success) {
    order.logistics = {
      courier: "BLUEDART",
      awbNumber: result.awb,
      shipmentId: result.awb,
      status: "CREATED",
    };
    order.orderStatus = "SHIPPED";
  } else {
    order.logistics = {
      courier: "BLUEDART",
      status: "CREATED",
    };
  }

  await order.save();
};

module.exports = {
  initiateShipmentForOrder,
};
