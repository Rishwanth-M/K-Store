const express = require("express");
const User = require("../models/user.model");
const authorization = require("../middlewares/authorization");

const router = express.Router();

/**
 * 🔹 GET saved addresses
 */
router.get("/", authorization, async (req, res) => {
  try {
    console.log("📥 Fetching addresses for user:", req.user._id);

    const user = await User.findById(req.user._id).select("addresses");

    console.log("📦 Addresses found:", user.addresses);

    return res.status(200).json({
      status: "Success",
      addresses: user.addresses || [],
    });
  } catch (error) {
    console.error("❌ Error fetching addresses:", error.message);

    return res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
});

/**
 * 🔹 SAVE new address
 */
router.post("/", authorization, async (req, res) => {
  try {
    console.log("📤 Incoming address payload:", req.body);
    console.log("👤 Address belongs to user:", req.user._id);

    const address = req.body;

    // Basic safety check
    if (!address.addressLine1 || !address.mobile) {
      console.log("⚠️ Address validation failed");

      return res.status(400).json({
        status: "Failed",
        message: "Required address fields missing",
      });
    }

    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { addresses: address } },
      { new: true }
    );

    console.log("✅ Address successfully saved in MongoDB");

    return res.status(201).json({
      status: "Success",
      message: "Address saved successfully",
    });
  } catch (error) {
    console.error("❌ Error saving address:", error.message);

    return res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
});

module.exports = router;
