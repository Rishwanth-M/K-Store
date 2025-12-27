const router = require("express").Router();

/**
 * DEMO PAYMENT ONLY
 * No Razorpay
 * Always succeeds
 */

router.post("/order", async (req, res) => {
  try {
    const { amount } = req.body;

    return res.status(200).json({
      demo: true,
      amount,
      message: "Demo payment success",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: "Demo payment failed",
    });
  }
});

router.post("/verify", async (req, res) => {
  return res.status(200).json({
    demo: true,
    message: "Demo payment verified",
  });
});

module.exports = router;
