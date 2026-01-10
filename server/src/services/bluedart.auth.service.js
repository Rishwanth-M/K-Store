const axios = require("axios");

const generateBlueDartToken = async () => {
  const response = await axios.post(
    process.env.BLUEDART_AUTH_URL,
    {
      clientId: process.env.BLUEDART_API_KEY,
      clientSecret: process.env.BLUEDART_API_SECRET,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data.access_token; // JWT
};

module.exports = { generateBlueDartToken };
