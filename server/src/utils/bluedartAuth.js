// backend/utils/bluedartAuth.js

const axios = require("axios");
const { BLUEDART } = require("../config/bluedart.config");

/**
 * Generates JWT token for Blue Dart APIs
 * Used by both:
 *  - Prepaid shipments
 *  - COD shipments
 */
const generateBlueDartToken = async () => {
  try {
    const apiKey = process.env.BLUEDART_API_KEY;
    const apiSecret = process.env.BLUEDART_API_SECRET;

    if (!apiKey || !apiSecret) {
      throw new Error("Blue Dart API credentials missing");
    }

    const response = await axios.post(
      `${BLUEDART.BASE_URL}/token`,
      {
        apiKey,
        apiSecret,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    if (!response.data?.access_token) {
      throw new Error("Invalid token response from Blue Dart");
    }

    return response.data.access_token;
  } catch (error) {
    console.error("🔴 Blue Dart JWT Error:", error.response?.data || error.message);
    throw new Error("Failed to generate Blue Dart JWT token");
  }
};

module.exports = { generateBlueDartToken };
