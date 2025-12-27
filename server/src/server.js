require("dotenv").config();
const app = require("./index");
const connect = require("./configs/db");

const port = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
