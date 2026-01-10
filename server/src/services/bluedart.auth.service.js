const axios = require("axios");

const generateBlueDartToken = async () => {
  const response = await axios.post(
    process.env.BLUEDART_AUTH_URL,
    {
      client_id: process.env.BLUEDART_API_KEY,
      client_secret: process.env.BLUEDART_API_SECRET,
      grant_type: "client_credentials",
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data.access_token; // JWT
};

module.exports = { generateBlueDartToken };
