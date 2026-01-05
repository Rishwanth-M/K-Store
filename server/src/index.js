const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

/* ======================================================
   BASIC SECURITY
====================================================== */
app.disable("x-powered-by");
app.set("trust proxy", 1);

/* ======================================================
   HELMET (PAYMENT SAFE)
====================================================== */
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);

/* ======================================================
   PHONEPE RAW BODY (MUST COME FIRST)
====================================================== */
app.use(
  "/api/payment/webhook",
  express.raw({ type: "*/*" })
);

/* ======================================================
   BODY PARSERS
====================================================== */
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

/* ======================================================
   RATE LIMITING (EXCLUDE PAYMENT)
====================================================== */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api/payment")) return next();
  limiter(req, res, next);
});

/* ======================================================
   CORS (PRODUCTION SAFE)
====================================================== */
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://kreedentialsstoredev.vercel.app",
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ======================================================
   HEALTH CHECK
====================================================== */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running 🚀",
  });
});

/* ======================================================
   AUTH ROUTES (NAMESPACED)
====================================================== */
const authController = require("./controllers/auth.controller");
app.post("/api/auth/signup", authController.signup);
app.post("/api/auth/login", authController.login);

/* ======================================================
   APP ROUTES
====================================================== */
app.use("/products", require("./routes/product.routes"));
app.use("/favourite", require("./routes/favourite.route"));
app.use("/cart", require("./routes/cart.routes"));
app.use("/order", require("./routes/order.routes"));
app.use("/users/addresses", require("./routes/address.routes"));
app.use("/api/payment", require("./routes/payment.routes"));

/* ======================================================
   404 HANDLER
====================================================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ======================================================
   GLOBAL ERROR HANDLER
====================================================== */
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.error("❌ Error stack:", err.stack);
  } else {
    console.error("❌ Error:", err.message);
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
