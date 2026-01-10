const axios = require("axios");
const { generateBlueDartToken } = require("./bluedart.auth.service");

const DEFAULT_WEIGHT = 0.5; // kg per item

const createBlueDartShipment = async (order) => {
  const token = await generateBlueDartToken();

  const totalWeight = order.cartProducts.reduce(
    (sum, item) => sum + item.quantity * DEFAULT_WEIGHT,
    0
  );

  const payload = {
    Request: {
      Consignee: {
        ConsigneeName: `${order.shippingDetails.firstName} ${order.shippingDetails.lastName}`,
        ConsigneeAddress1: order.shippingDetails.addressLine1,
        ConsigneeAddress2: order.shippingDetails.addressLine2 || "",
        ConsigneeAddressType: "R", // ✅ REQUIRED
        ConsigneeCity: order.shippingDetails.locality,
        ConsigneeState: order.shippingDetails.state,
        ConsigneePincode: order.shippingDetails.pinCode,
        ConsigneeMobile: order.shippingDetails.mobile,
        ConsigneeTelephone: "",
        ConsigneeEmailID: order.shippingDetails.email || "",
      },

      Services: {
        ProductCode: "D",                 // ✅ REQUIRED (Sandbox)
        SubProductCode: "C",              // COD
        ActualWeight: totalWeight.toFixed(2),
        PieceCount: order.orderSummary.quantity,
        CollectableAmount: order.orderSummary.total,
        DeclaredValue: order.orderSummary.total,
        PickupDate: `/Date(${Date.now()})/`, // ✅ REQUIRED
        PickupTime: "1600",                // ✅ REQUIRED
        RegisterPickup: false,
        SpecialInstruction: "",
        PDFOutputNotRequired: true,
      },

      Shipper: {
        CustomerCode: process.env.BLUEDART_CLIENT_CODE,
        CustomerName: process.env.BLUEDART_PICKUP_NAME,
        CustomerAddress1: process.env.BLUEDART_PICKUP_ADDRESS,
        CustomerAddress2: "",
        CustomerCity: process.env.BLUEDART_PICKUP_CITY,
        CustomerState: process.env.BLUEDART_PICKUP_STATE,
        CustomerPincode: process.env.BLUEDART_PICKUP_PIN,
        CustomerMobile: process.env.BLUEDART_PICKUP_PHONE,
        OriginArea: process.env.BLUEDART_AREA,
        IsToPayCustomer: false,
      },
    },

    Profile: {
      Api_type: "S",
      LicenceKey: process.env.BLUEDART_LICENSE_KEY,
      LoginID: process.env.BLUEDART_USER_ID,
    },
  };

  try {
    const response = await axios.post(
      process.env.BLUEDART_WAYBILL_URL,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    return {
      success: true,
      awb: response.data?.AWBNo,
      raw: response.data,
    };
  } catch (err) {
    console.error(
      "❌ BLUEDART ERROR:",
      err.response?.data || err.message
    );
    throw err;
  }
};

module.exports = { createBlueDartShipment };
