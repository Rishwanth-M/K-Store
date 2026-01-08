// services/bluedart.service.js

const axios = require("axios");
const xml2js = require("xml2js");

const BLUEDART_URL =
  "https://netconnect.bluedart.com/API/ShippingAPI/V1/GenerateWayBill";

const buildShipmentXML = (order) => {
  const shipper = {
    Name: process.env.BLUEDART_PICKUP_CONTACT,
    Address1: process.env.BLUEDART_PICKUP_ADDRESS1 || "PICKUP",
    Address2: process.env.BLUEDART_PICKUP_ADDRESS2 || "",
    City: process.env.BLUEDART_PICKUP_CITY,
    State: process.env.BLUEDART_PICKUP_STATE,
    Pincode: process.env.BLUEDART_PICKUP_PIN,
    Mobile: process.env.BLUEDART_PICKUP_PHONE,
  };

  const consignee = {
    Name: `${order.shippingDetails.firstName} ${order.shippingDetails.lastName}`,
    Address1: order.shippingDetails.addressLine1,
    Address2: order.shippingDetails.addressLine2 || "",
    City: order.shippingDetails.locality,
    State: order.shippingDetails.state,
    Pincode: order.shippingDetails.pinCode,
    Mobile: order.shippingDetails.mobile,
  };

  return `
<GenerateWayBillRequest>
  <Request>
    <LoginID>${process.env.BLUEDART_USERNAME}</LoginID>
    <LicenseKey>${process.env.BLUEDART_LICENSE_KEY}</LicenseKey>
    <APIVersion>${process.env.BLUEDART_API_VERSION}</APIVersion>
  </Request>

  <WayBillData>
    <Consignee>
      <ConsigneeName>${consignee.Name}</ConsigneeName>
      <ConsigneeAddress1>${consignee.Address1}</ConsigneeAddress1>
      <ConsigneeAddress2>${consignee.Address2}</ConsigneeAddress2>
      <ConsigneeCity>${consignee.City}</ConsigneeCity>
      <ConsigneeState>${consignee.State}</ConsigneeState>
      <ConsigneePincode>${consignee.Pincode}</ConsigneePincode>
      <ConsigneeMobile>${consignee.Mobile}</ConsigneeMobile>
    </Consignee>

    <Shipper>
      <ShipperName>${shipper.Name}</ShipperName>
      <ShipperAddress1>${shipper.Address1}</ShipperAddress1>
      <ShipperAddress2>${shipper.Address2}</ShipperAddress2>
      <ShipperCity>${shipper.City}</ShipperCity>
      <ShipperState>${shipper.State}</ShipperState>
      <ShipperPincode>${shipper.Pincode}</ShipperPincode>
      <ShipperMobile>${shipper.Mobile}</ShipperMobile>
    </Shipper>

    <ShipmentDetails>
      <ProductCode>D</ProductCode>
      <CollectableAmount>${order.orderSummary.total}</CollectableAmount>
      <DeclaredValue>${order.orderSummary.total}</DeclaredValue>
      <PaymentType>COD</PaymentType>
      <PieceCount>${order.orderSummary.quantity}</PieceCount>
      <Weight>1</Weight>
    </ShipmentDetails>
  </WayBillData>
</GenerateWayBillRequest>
`;
};

const createBlueDartShipment = async (order) => {
  try {
    const xml = buildShipmentXML(order);

    const response = await axios.post(BLUEDART_URL, xml, {
      headers: {
        "Content-Type": "application/xml",
      },
      timeout: 15000,
    });

    const parsed = await xml2js.parseStringPromise(response.data, {
      explicitArray: false,
    });

    const awb =
      parsed?.GenerateWayBillResponse?.WayBillNumber ||
      parsed?.GenerateWayBillResponse?.AWBNo;

    if (!awb) {
      return {
        success: false,
        error: "AWB not generated",
        raw: parsed,
      };
    }

    return {
      success: true,
      awb,
      shipmentId: awb,
    };
  } catch (err) {
    console.error("❌ Blue Dart Shipment Error:", err.message);

    return {
      success: false,
      error: err.message,
    };
  }
};

module.exports = {
  createBlueDartShipment,
};
