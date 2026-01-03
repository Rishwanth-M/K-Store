const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

/* ================= JWT HELPER ================= */
const createToken = (userId) => {
  if (!process.env.JWT_ACCESS_KEY) {
    throw new Error("JWT_ACCESS_KEY not defined");
  }

  return jwt.sign(
    { id: userId }, // ✅ standardized payload
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "7d" }
  );
};

/* ================= SIGNUP ================= */
const signup = async (req, res, next) => {
  try {
    let {
      email,
      password,
      firstName,
      lastName,
      gender,
      dateOfBirth,
    } = req.body;

    /* ================= VALIDATION ================= */
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !gender ||
      !dateOfBirth
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    /* ================= NORMALIZATION ================= */
    email = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    /* ================= CREATE USER ================= */
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      gender,
      dateOfBirth,
    });

    const token = createToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("❌ Signup error:", error.message);
    next(error);
  }
};

/* ================= LOGIN ================= */
const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    /* ================= NORMALIZATION ================= */
    email = email.toLowerCase().trim();

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = createToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    next(error);
  }
};

module.exports = { signup, login };
