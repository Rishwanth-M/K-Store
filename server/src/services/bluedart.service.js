const axios = require("axios");
const { generateBlueDartToken } = require("./bluedart.auth.service");

const DEFAULT_WEIGHT = 0.5;

const createBlueDartShipment = async (order) => {
  const token = await generateBlueDartToken();

  const totalWeight = order.cartProducts.reduce(
    (sum, item) => sum + item.quantity * DEFAULT_WEIGHT,
    0
  );

  const payload = {
    clientCode: process.env.BLUEDART_CLIENT_CODE,
    shipmentType: "COD",
    productCode: "A",
    subProductCode: "C",

    consignee: {
      name: `${order.shippingDetails.firstName} ${order.shippingDetails.lastName}`,
      address: order.shippingDetails.addressLine1,
      city: order.shippingDetails.locality,
      state: order.shippingDetails.state,
      pincode: order.shippingDetails.pinCode,
      mobile: order.shippingDetails.mobile,
    },

    shipper: {
      name: process.env.BLUEDART_PICKUP_NAME,
      address: process.env.BLUEDART_PICKUP_ADDRESS,
      city: process.env.BLUEDART_PICKUP_CITY,
      state: process.env.BLUEDART_PICKUP_STATE,
      pincode: process.env.BLUEDART_PICKUP_PIN,
      mobile: process.env.BLUEDART_PICKUP_PHONE,
    },

    declaredValue: order.orderSummary.total,
    collectableAmount: order.orderSummary.total,
    actualWeight: totalWeight.toFixed(2),
    pieceCount: order.orderSummary.quantity,
  };

  const response = await axios.post(
    process.env.BLUEDART_WAYBILL_URL,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return {
    success: true,
    awb: response.data.awbNumber,
    raw: response.data,
  };
};

module.exports = { createBlueDartShipment };
