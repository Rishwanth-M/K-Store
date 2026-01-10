/**
 * Blue Dart configuration
 * Used for BOTH:
 *  - Prepaid (PhonePe)
 *  - Cash on Delivery (COD)
 *
 * No business logic here.
 * No API calls here.
 */

module.exports = {
  BLUEDART: {
    // 🔹 Sandbox base URL (confirm from Blue Dart manual)
    BASE_URL: "https://api-sandbox.bluedart.com",

    // 🔹 Client details (from Blue Dart mail)
    CLIENT_CODE: "099960",
    USER_ID: "MAA00001",
    AREA: "HYD",

    // 🔹 Shipment mode
    PRODUCT: {
      AIR: "A",
      SURFACE: "E",
    },

    // 🔹 Payment mode for Blue Dart
    SUB_PRODUCT: {
      PREPAID: "P", // PhonePe / Online
      COD: "C",     // Cash on Delivery
    },

    // 🔹 Fixed values
    COUNTRY: "India",
    CURRENCY: "INR",
    COURIER_NAME: "Blue Dart",

    // 🔹 Safe defaults (can be overridden later)
    DEFAULTS: {
      PIECES: 1,
      WEIGHT_KG: 0.5,
    },
  },
};
