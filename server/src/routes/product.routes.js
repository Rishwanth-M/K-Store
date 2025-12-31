const router = require("express").Router();

const controller = require("../controllers/product.controller");
const authorization = require("../middlewares/authorization");

/* ================= PUBLIC ROUTES ================= */

// Get all products (with filters)
router.get("/", controller.getProducts);

// Get single product
router.get("/:id", controller.getProductById);

/* ================= PROTECTED ROUTES ================= */
/* 
  ⚠️ TEMP PROTECTION:
  Currently requires login.
  Later you can replace `authorization`
  with `adminAuthorization`.
*/

// Create product
router.post("/", authorization, controller.createProduct);

// Update product
router.put("/:id", authorization, controller.updateProduct);

module.exports = router;
