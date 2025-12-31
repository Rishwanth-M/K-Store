import { Box, Grid, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getItemSession } from "../../utils/sessionStorage";
import { setToast } from "../../utils/extraFunctions";

import { addToCartRequest } from "../../redux/features/cart/actions";
import { addToFavouriteRequest } from "../../redux/features/favourite/actions";

import { ProductImageGallery } from "../../components/description/ProductImageGallery";
import { ProductSummary } from "../../components/description/ProductSummary";
import { ProductInfoTabs } from "../../components/description/ProductInfoTabs";
import { RelatedProducts } from "../../components/description/RelatedProducts";

export const Description = () => {
  const product = getItemSession("singleProduct");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const token = useSelector((state) => state.authReducer.token);

  /* 🔒 HARD GUARD */
  if (!product || !product._id) {
    navigate("/allProducts");
    return null;
  }

  /* ---------- ADD TO CART ---------- */
  const handleAddToCart = (selectedSize) => {
    if (!selectedSize) {
      setToast(toast, "Please select a size", "error");
      return;
    }

    // Backend has single stock, not per-size
    if (Number(product.stock) <= 0) {
      setToast(toast, "Product is out of stock", "error");
      return;
    }

    const cartPayload = {
      _id: product._id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: 1,
      images: product.images || [],
    };

    dispatch(addToCartRequest(cartPayload, toast));
  };

  /* ---------- ADD TO FAVOURITE ---------- */
  const handleAddToFavourite = () => {
    if (!token) {
      setToast(toast, "Please login first", "error");
      navigate("/auth");
      return;
    }

    dispatch(addToFavouriteRequest(product, token, toast));
  };

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <Box
        maxW="1400px"
        mx="auto"
        px={{ base: "16px", md: "24px", lg: "40px" }}
        mt="40px"
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "58% 42%" }}
          gap={{ base: "32px", md: "48px" }}
          alignItems="flex-start"
        >
          {/* LEFT: IMAGE GALLERY */}
          <Box
            position={{ base: "static", lg: "sticky" }}
            top="120px"
          >
            <ProductImageGallery
              images={product.images || []}
              alt={product.name}
            />
          </Box>

          {/* RIGHT: PRODUCT DETAILS */}
          <Box>
            <ProductSummary
              product={product}
              onAddToCart={handleAddToCart}
              onAddToFavourite={handleAddToFavourite}
            />

            <ProductInfoTabs product={product} />
          </Box>
        </Grid>
      </Box>

      {/* ===== RELATED PRODUCTS ===== */}
      <Box mt="120px">
        <RelatedProducts product={product} />
      </Box>
    </>
  );
};
