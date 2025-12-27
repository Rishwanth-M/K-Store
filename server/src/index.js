const express = require("express");
const cors = require("cors");

const app = express();

/* ================= CORS ================= */
app.use(
  cors({
    origin: "*", // later restrict to Vercel domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

/* ================= BODY PARSER ================= */
app.use(express.json());

/* ================= HEALTH CHECK (RENDER) ================= */
app.get("/", (req, res) => {
  res.status(200).json({ status: "API is running 🚀" });
});

/* ================= AUTH ================= */
const { signup, login } = require("./controllers/auth.controller");
app.post("/signup", signup);
app.post("/login", login);

/* ================= ROUTES ================= */
const productRoutes = require("./routes/product.routes");
const favouriteRoutes = require("./routes/favourite.route");
const orderController = require("./controllers/order.controller");
const paymentController = require("./controllers/payment.controller");
const addressRoutes = require("./routes/address.routes");

app.use("/products", productRoutes);
app.use("/favourite", favouriteRoutes);
app.use("/order", orderController);
app.use("/users/addresses", addressRoutes);
app.use("/api/payment", paymentController);

module.exports = app;
