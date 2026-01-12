const axios = require("axios");
const { generateBlueDartToken } = require("./bluedart.auth.service");

const createBlueDartShipment = async (order) => {
  const token = await generateBlueDartToken();

  const payload = {
  "Request": {
    "Consignee": {
      "ConsigneeAddress1": "8-3-137/1, Bhagathnagar, Karimnagar",
      "ConsigneeAddress2": "",
      "ConsigneeAddress3": "",
      "ConsigneeAddressType": "R",
      "ConsigneeAttention": "",
      "ConsigneeEmailID": "mekalarishwanthkumar26@gmail.com",
      "ConsigneeGSTNumber": "",
      "ConsigneeLatitude": "",
      "ConsigneeLongitude": "",
      "ConsigneeMaskedContactNumber": "",
      "ConsigneeMobile": "9000002659",
      "ConsigneeName": "Rishwanth Mekala",
      "ConsigneePincode": "505001",
      "ConsigneeTelephone": ""
    },
    "Returnadds": {
      "ManifestNumber": "",
      "ReturnAddress1": "Flat no. 501, Ibis Apartment...",
      "ReturnAddress2": "",
      "ReturnAddress3": "",
      "ReturnContact": "BLUEDART EXPRESS LIMITED",
      "ReturnEmailID": "",
      "ReturnLatitude": "",
      "ReturnLongitude": "",
      "ReturnMaskedContactNumber": "",
      "ReturnMobile": "7330645588",
      "ReturnPincode": "500019",
      "ReturnTelephone": ""
    },
    "Services": {
      "AWBNo": "",
      "ActualWeight": "0.50",
      "Commodity": {},
      "CreditReferenceNo": "ORDER-XXXX",
      "Dimensions": [],
      "ECCN": "",
      "PDFOutputNotRequired": true,
      "PackType": "",
      "PickupDate": "/Date(1700000000000)/",
      "PickupTime": "1600",
      "PieceCount": "1",
      "ProductCode": "A",
      "SubProductCode": "C",
      "ProductType": 0,
      "RegisterPickup": false,
      "SpecialInstruction": "",
      "OTPBasedDelivery": 0,
      "OTPCode": "",
      "itemdtl": [],
      "noOfDCGiven": 0
    },
    "Shipper": {
      "CustomerAddress1": "Flat no. 501, Ibis Apartment...",
      "CustomerAddress2": "",
      "CustomerAddress3": "",
      "CustomerCode": "099960",
      "CustomerEmailID": "",
      "CustomerGSTNumber": "",
      "CustomerLatitude": "",
      "CustomerLongitude": "",
      "CustomerMaskedContactNumber": "",
      "CustomerMobile": "7330645588",
      "CustomerName": "BLUEDART EXPRESS LIMITED",
      "CustomerPincode": "500019",
      "CustomerTelephone": "",
      "IsToPayCustomer": false,
      "OriginArea": "HYD",
      "Sender": "MAA00001",
      "VendorCode": ""
    }
  },
  "Profile": {
    "Api_type": "S",
    "LicenceKey": "sguz0fkmhnsvvtliuooorpsnrpfmkfhi",
    "LoginID": "MAA00001"
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
