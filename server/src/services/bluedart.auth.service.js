const axios = require("axios");

const generateBlueDartToken = async () => {
  const response = await axios.get(
    "https://apigateway-sandbox.bluedart.com/in/transportation/token/v1/login",
    {
      headers: {
        ClientID: process.env.BLUEDART_API_KEY,
        clientSecret: process.env.BLUEDART_API_SECRET,
        Accept: "application/json",
      },
      timeout: 10000,
    }
  );

  return response.data.JWTToken;
};

module.exports = { generateBlueDartToken };
