const axios = require("axios");
const { generateBlueDartToken } = require("./bluedart.auth.service");

const createBlueDartShipment = async (order) => {
  const token = await generateBlueDartToken();

  const payload = {
  Request: {
    Consignee: {
      ConsigneeAddress1: order.shippingDetails.addressLine1,
      ConsigneeAddress2: order.shippingDetails.addressLine2 || "",
      ConsigneeAddress3: "",
      ConsigneeAddressType: "R",
      ConsigneeAttention: "",
      ConsigneeEmailID: order.shippingDetails.email || "",
      ConsigneeGSTNumber: "",
      ConsigneeLatitude: "",
      ConsigneeLongitude: "",
      ConsigneeMaskedContactNumber: "",
      ConsigneeMobile: order.shippingDetails.mobile,
      ConsigneeName: `${order.shippingDetails.firstName} ${order.shippingDetails.lastName}`,
      ConsigneePincode: order.shippingDetails.pinCode,
      ConsigneeTelephone: ""
    },

    Returnadds: {
      ManifestNumber: "",
      ReturnAddress1: process.env.BLUEDART_PICKUP_ADDRESS,
      ReturnAddress2: "",
      ReturnAddress3: "",
      ReturnContact: process.env.BLUEDART_PICKUP_NAME,
      ReturnEmailID: "",
      ReturnLatitude: "",
      ReturnLongitude: "",
      ReturnMaskedContactNumber: "",
      ReturnMobile: process.env.BLUEDART_PICKUP_PHONE,
      ReturnPincode: process.env.BLUEDART_PICKUP_PIN,
      ReturnTelephone: ""
    },

    Services: {
  ActualWeight: "0.50",
  Commodity: {},
  CreditReferenceNo: `ORDER-${order._id}`,
  Dimensions: [],
  PDFOutputNotRequired: true,
  PackType: "",
  PickupDate: `/Date(${Date.now()})/`,
  PickupTime: "1600",
  PieceCount: String(order.orderSummary.quantity),

  // 🔐 FROM BLUEDART MAIL (MANDATORY)
  ProductCode: "A",     // Air
  SubProductCode: "C",  // COD

  RegisterPickup: false,
  SpecialInstruction: "",
  itemdtl: [],
  noOfDCGiven: 0
},

    Shipper: {
      CustomerAddress1: process.env.BLUEDART_PICKUP_ADDRESS,
      CustomerAddress2: "",
      CustomerAddress3: "",
      CustomerCode: process.env.BLUEDART_CLIENT_CODE,
      CustomerEmailID: "",
      CustomerGSTNumber: "",
      CustomerLatitude: "",
      CustomerLongitude: "",
      CustomerMaskedContactNumber: "",
      CustomerMobile: process.env.BLUEDART_PICKUP_PHONE,
      CustomerName: process.env.BLUEDART_PICKUP_NAME,
      CustomerPincode: process.env.BLUEDART_PICKUP_PIN,
      CustomerTelephone: "",
      IsToPayCustomer: false,
      OriginArea: process.env.BLUEDART_AREA,
      Sender: process.env.BLUEDART_USER_ID,
      VendorCode: ""
    }
  },

  Profile: {
    Api_type: "S",
    LicenceKey: process.env.BLUEDART_LICENSE_KEY, // Shipping API License Key
    LoginID: process.env.BLUEDART_USER_ID
  }
};


  const response = await axios.post(
    process.env.BLUEDART_WAYBILL_URL,   // MUST be /waybill/GenerateWayBill
    payload,
    {
      headers: {
        JWTToken: token,
        "Content-Type": "application/json",
      },
      timeout: 20000,
    }
  );

  return {
    success: true,
    awb: response.data?.AWBNo,
    raw: response.data,
  };
};

module.exports = { createBlueDartShipment };
