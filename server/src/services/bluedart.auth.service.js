const axios = require("axios");
const qs = require("querystring");

const generateBlueDartToken = async () => {
  const response = await axios.post(
    process.env.BLUEDART_AUTH_URL,
    qs.stringify({
      client_id: process.env.BLUEDART_API_KEY,      // Consumer Key
      client_secret: process.env.BLUEDART_API_SECRET,
      grant_type: "client_credentials",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      timeout: 15000,
    }
  );

  if (!response.data?.access_token) {
    throw new Error("BlueDart token not received");
  }

  return response.data.access_token;
};

module.exports = { generateBlueDartToken };
