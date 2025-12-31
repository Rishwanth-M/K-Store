const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_PATH) {
      throw new Error("MONGO_PATH is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_PATH, {
      autoIndex: true,           // builds indexes
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB connected successfully");

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
