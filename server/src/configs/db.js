const mongoose = require("mongoose");

module.exports = async () => {
  try {
    console.log("MONGO_PATH =", process.env.MONGO_PATH);

    await mongoose.connect(process.env.MONGO_PATH);
    console.log("✅ MongoDB Connected to:", mongoose.connection.name);
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  }
};
