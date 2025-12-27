const Product = require("../models/product.model");

// GET /products
// supports filters:
// /products
// /products?category=boys
// /products?productType=combo
// /products?category=boys&productType=combo
exports.getProducts = async (req, res) => {
  try {
    const { category, productType } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (productType) filter.productType = productType;

    const products = await Product.find(filter);
    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  console.log("ID RECEIVED:", req.params.id);
  console.log("COLLECTION:", Product.collection.name);

  const product = await Product.findById(req.params.id);
  console.log("FOUND:", product);

  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
};


exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /products (for admin use later)
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
