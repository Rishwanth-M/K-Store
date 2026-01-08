const express = require("express");
const router = express.Router();
const authorization = require("../middlewares/authorization");
const { trackShipment } = require("../controllers/shipment.controller");

router.get("/track/:orderId", authorization, trackShipment);

module.exports = router;
