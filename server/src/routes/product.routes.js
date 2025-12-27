const router = require("express").Router();
const controller = require("../controllers/product.controller");

router.get("/", controller.getProducts);
router.post("/", controller.createProduct);

router.get("/:id", controller.getProductById);
router.put("/:id", controller.updateProduct);


module.exports = router;
