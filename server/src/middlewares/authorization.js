const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    // ✅ MATCH JWT PAYLOAD (userId)
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    // ✅ STANDARDIZED USER OBJECT
    req.user = {
      _id: decoded.userId,
    };

    next();
  } catch (error) {
    console.error("❌ Auth error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authorization;
