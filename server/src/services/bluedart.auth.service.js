const axios = require("axios");

const generateBlueDartToken = async () => {
  const response = await axios.get(
    process.env.BLUEDART_AUTH_URL,
    {
      headers: {
        ClientID: process.env.BLUEDART_API_KEY,
        clientSecret: process.env.BLUEDART_API_SECRET,
        Accept: "application/json",
      },
      timeout: 15000,
    }
  );

  return response.data.JWTToken; // 🔥 exact key from API
};

module.exports = { generateBlueDartToken };
