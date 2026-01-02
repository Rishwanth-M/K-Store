const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

/* ======================================================
   TRUST PROXY (REQUIRED FOR RENDER / VERCEL)
====================================================== */
app.set("trust proxy", 1);

/* ======================================================
   SECURITY (PHONEPE SAFE)
====================================================== */
app.use(
  helmet({
    crossOriginEmbedderPolicy: false, // 🔑 Required for payment redirects
  })
);

/* ======================================================
   BODY PARSERS
====================================================== */
// JSON APIs
app.use(express.json({ limit: "10kb" }));

// Form / webhook payloads
app.use(express.urlencoded({ extended: true }));

/* ======================================================
   RAW BODY (PHONEPE WEBHOOK)
====================================================== */
app.use(
  "/api/payment/webhook",
  express.raw({ type: "application/json" })
);

/* ======================================================
   RATE LIMIT (EXCLUDE PAYMENT)
====================================================== */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use((req, res, next) => {
  if (req.path.startsWith("/api/payment")) return next();
  limiter(req, res, next);
});

/* ======================================================
   CORS (PRODUCTION SAFE)
====================================================== */
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://kreedentialsstoredev.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(null, false); // ❌ don’t throw error
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

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
   AUTH ROUTES
====================================================== */
const authController = require("./controllers/auth.controller");
app.post("/signup", authController.signup);
app.post("/login", authController.login);

/* ======================================================
   APP ROUTES
====================================================== */
app.use("/products", require("./routes/product.routes"));
app.use("/favourite", require("./routes/favourite.route"));
app.use("/order", require("./routes/order.routes"));
app.use("/api/payment", require("./routes/payment.routes"));
app.use("/users/addresses", require("./routes/address.routes"));

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
  console.error("❌ Error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
