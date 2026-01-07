/* ================= ADD / REDUCE CART ================= */
router.post("/", authorization, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, size, operation = "add" } = req.body;

    if (!productId || !size) {
      return res.status(400).json({
        success: false,
        message: "productId and size are required",
      });
    }

    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const cartItem = await Cart.findOne({
      user: userId,
      product: productId,
      size,
    });

    /* ---------- ADD ---------- */
    if (operation === "add") {
      if (cartItem) {
        cartItem.quantity += 1;
        await cartItem.save();
      } else {
        const newItem = await Cart.create({
          user: userId,
          product: productId,
          size,
          quantity: 1,
          name: product.name,
          price: product.price,
          images: product.images || [],
          category: product.category,
          productType: product.productType,
        });

        return res.status(201).json({ success: true, cartItem: newItem });
      }
    }

    /* ---------- REDUCE ---------- */
    if (operation === "reduce") {
      if (!cartItem) {
        return res.status(404).json({
          success: false,
          message: "Item not in cart",
        });
      }

      cartItem.quantity -= 1;

      if (cartItem.quantity <= 0) {
        await Cart.deleteOne({ _id: cartItem._id });
        return res.status(200).json({
          success: true,
          message: "Item removed from cart",
        });
      }

      await cartItem.save();
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Cart Error:", error.message);
    return res.status(500).json({ success: false });
  }
});
/* ================= ADD / REDUCE CART ================= */
router.post("/", authorization, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, size, operation = "add" } = req.body;

    if (!productId || !size) {
      return res.status(400).json({
        success: false,
        message: "productId and size are required",
      });
    }

    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const cartItem = await Cart.findOne({
      user: userId,
      product: productId,
      size,
    });

    /* ---------- ADD ---------- */
    if (operation === "add") {
      if (cartItem) {
        cartItem.quantity += 1;
        await cartItem.save();
      } else {
        const newItem = await Cart.create({
          user: userId,
          product: productId,
          size,
          quantity: 1,
          name: product.name,
          price: product.price,
          images: product.images || [],
          category: product.category,
          productType: product.productType,
        });

        return res.status(201).json({ success: true, cartItem: newItem });
      }
    }

    /* ---------- REDUCE ---------- */
    if (operation === "reduce") {
      if (!cartItem) {
        return res.status(404).json({
          success: false,
          message: "Item not in cart",
        });
      }

      cartItem.quantity -= 1;

      if (cartItem.quantity <= 0) {
        await Cart.deleteOne({ _id: cartItem._id });
        return res.status(200).json({
          success: true,
          message: "Item removed from cart",
        });
      }

      await cartItem.save();
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Cart Error:", error.message);
    return res.status(500).json({ success: false });
  }
});
