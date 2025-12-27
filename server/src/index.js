const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json());

// Auth
const { signup, login } = require("./controllers/auth.controller");

// Routes
const productRoutes = require("./routes/product.routes");
const favouriteRoutes = require("./routes/favourite.route");
const orderController = require("./controllers/order.controller");
const paymentController = require("./controllers/payment.controller");
const addressRoutes = require("./routes/address.routes");

// Auth
app.post("/signup", signup);
app.post("/login", login);

// Core APIs
app.use("/products", productRoutes);
app.use("/favourite", favouriteRoutes);
app.use("/order", orderController);
app.use("/users/addresses", addressRoutes);

// Payment (demo)
app.use("/api/payment", paymentController);

module.exports = app;
