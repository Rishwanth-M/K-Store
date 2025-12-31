require("dotenv").config();

const app = require("./index");
const connect = require("./configs/db");

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connect();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
