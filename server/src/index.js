const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

/* ======================================================
   TRUST PROXY (🔥 REQUIRED FOR RENDER / VERCEL)
====================================================== */
app.set("trust proxy", 1);

/* ======================================================
   SECURITY
====================================================== */
app.use(helmet());

/* ======================================================
   RATE LIMIT
====================================================== */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

/* ======================================================
   BODY PARSER
====================================================== */
app.use(express.json({ limit: "10kb" }));

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
    origin: function (origin, callback) {
      // Allow Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("❌ CORS blocked:", origin);
      callback(new Error("CORS not allowed"));
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
   AUTH ROUTES (KEEP COMPATIBILITY)
====================================================== */
const authController = require("./controllers/auth.controller");
app.post("/signup", authController.signup);
app.post("/login", authController.login);

/* ======================================================
   APP ROUTES
====================================================== */
const productRoutes = require("./routes/product.routes");
const favouriteRoutes = require("./routes/favourite.routes");
const orderRoutes = require("./routes/order.routes");
const paymentRoutes = require("./routes/payment.routes");
const addressRoutes = require("./routes/address.routes");

app.use("/products", productRoutes);
app.use("/favourite", favouriteRoutes);
app.use("/order", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/users/addresses", addressRoutes);

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
