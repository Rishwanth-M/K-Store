const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const authorization = require("../middlewares/authorization");

/* ================= GET SAVED ADDRESSES ================= */
router.get("/", authorization, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("addresses")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      addresses: user.addresses || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ================= SAVE NEW ADDRESS ================= */
router.post("/", authorization, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      locality,
      pinCode,
      state,
      country,
      email,
      mobile,
    } = req.body;

    // Required fields check
    if (
      !firstName ||
      !lastName ||
      !addressLine1 ||
      !locality ||
      !pinCode ||
      !state ||
      !country ||
      !mobile
    ) {
      return res.status(400).json({
        success: false,
        message: "Required address fields missing",
      });
    }

    const address = {
      firstName,
      lastName,
      addressLine1,
      addressLine2: addressLine2 || "",
      locality,
      pinCode: String(pinCode),
      state,
      country,
      email,
      mobile: String(mobile),
    };

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { addresses: address } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Address saved successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
