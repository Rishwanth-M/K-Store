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

  if (!product) return null;

  /* ---------- ADD TO CART ---------- */
  const handleAddToCart = (selectedSize) => {
    if (!selectedSize) {
      setToast(toast, "Please select a size", "error");
      return;
    }

    const selectedVariant = product.variants?.find(
      (v) => v.size === selectedSize
    );

    if (!selectedVariant || Number(selectedVariant.stock) <= 0) {
      setToast(toast, "Selected size is out of stock", "error");
      return;
    }

    dispatch(
      addToCartRequest(
        {
          ...product,
          selectedSize,
          quantity: 1,
        },
        toast
      )
    );
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
      <Box maxW="1400px" mx="auto" px={["16px", "24px", "40px"]} mt="40px">
        <Grid
          templateColumns={["1fr", "1fr", "58% 42%"]}
          gap={["32px", "48px"]}
          alignItems="flex-start"
        >
          {/* ===== LEFT: STICKY IMAGE COLUMN (DESKTOP ONLY) ===== */}
          <Box
            position={["static", "static", "sticky"]}
            top="120px"
            alignSelf="flex-start"
          >
            <ProductImageGallery
              images={product.images}
              alt={product.name}
            />
          </Box>

          {/* ===== RIGHT: PRODUCT INFO (SCROLLS) ===== */}
          <Box>
            <ProductSummary
              product={product}
              onAddToCart={handleAddToCart}
              onAddToFavourite={handleAddToFavourite}
            />

            {/* INFO TABS (PART OF RIGHT SCROLL) */}
            <ProductInfoTabs product={product} />
          </Box>
        </Grid>
      </Box>

      {/* ===== RELATED PRODUCTS (FULL WIDTH BELOW) ===== */}
      <Box mt="120px">
        <RelatedProducts product={product} />
      </Box>
    </>
  );
};
