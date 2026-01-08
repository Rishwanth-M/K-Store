import {
  Box,
  Grid,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import {
  getItemSession,
  setItemSession,
} from "../../utils/sessionStorage";
import { setToast } from "../../utils/extraFunctions";

import { updateCartDB } from "../../redux/features/cart/cart.api";
import { addToFavouriteRequest } from "../../redux/features/favourite/actions";

import { ProductImageGallery } from "../../components/description/ProductImageGallery";
import { ProductSummary } from "../../components/description/ProductSummary";
import { ProductInfoTabs } from "../../components/description/ProductInfoTabs";
import { RelatedProducts } from "../../components/description/RelatedProducts";

export const Description = () => {
  /* ================= SESSION (READ ONCE) ================= */

  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const token = useSelector((state) => state.authReducer.token);
  const cartItems =
    useSelector((state) => state.cartReducer.cartProducts) || [];

  /* ================= SIZE GUIDE MODAL ================= */
  const {
    isOpen: isSizeGuideOpen,
    onOpen: openSizeGuide,
    onClose: closeSizeGuide,
  } = useDisclosure();



  /* ================= LOAD PRODUCT (RUN ONCE) ================= */
  useEffect(() => {
  const sessionProduct = getItemSession("singleProduct");

  if (!sessionProduct) {
    navigate("/allProducts");
    return;
  }

  if (sessionProduct.images) {
    setProduct(sessionProduct);
    return;
  }

  if (sessionProduct._id) {
    fetch(
  `${import.meta.env.VITE_BACKEND_URL}/products/${sessionProduct._id}`
)

      .then(async (res) => {
        const text = await res.text();

        try {
          const data = JSON.parse(text);
          const fetchedProduct = data.product || data.data || data;

          if (fetchedProduct?._id) {
            setItemSession("singleProduct", fetchedProduct);
            setProduct(fetchedProduct);
          }
        } catch (err) {
          console.error("Non-JSON response:", text);
        }
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
      });
  }
}, [navigate]);


  /* ================= ADD TO CART ================= */
  const handleAddToCart = (selectedSize) => {
    if (!selectedSize) {
      setToast(toast, "Please select a size", "error");
      return;
    }

    const selectedVariant = product.variants?.find(
      (v) => v.size === selectedSize
    );

    if (!selectedVariant || selectedVariant.stock <= 0) {
      setToast(toast, "Selected size is out of stock", "error");
      return;
    }

    const existingItem = cartItems.find(
      (item) =>
        item.productId === product._id &&
        item.size === selectedSize
    );

    if (
      existingItem &&
      existingItem.quantity >= selectedVariant.stock
    ) {
      setToast(
        toast,
        `Only ${selectedVariant.stock} items available for size ${selectedSize}`,
        "error"
      );
      return;
    }

    dispatch(
      updateCartDB(
        {
          productId: product._id,
          size: selectedSize,
          operation: "add",
        },
        toast
      )
    );

    setToast(
      toast,
      `Added to bag (Size ${selectedSize})`,
      "success"
    );
  };

  /* ================= ADD TO FAVOURITE ================= */
  const handleAddToFavourite = (selectedSize) => {
    if (!selectedSize) {
      setToast(toast, "Please select a size", "error");
      return;
    }

    const selectedVariant = product.variants?.find(
      (v) => v.size === selectedSize
    );

    if (!selectedVariant || selectedVariant.stock <= 0) {
      setToast(toast, "Selected size is out of stock", "error");
      return;
    }

    if (!token) {
      setToast(toast, "Please login first", "error");
      navigate("/auth");
      return;
    }

    dispatch(
      addToFavouriteRequest(
        {
          productId: product._id,
          size: selectedSize,
        },
        toast
      )
    );

    setToast(
      toast,
      `Added to favourites (Size ${selectedSize})`,
      "success"
    );
  };

  /* ================= LOADING GUARD ================= */
  if (!product) return null;

  /* ================= UI ================= */
  return (
    <>
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
          {/* LEFT: STICKY IMAGE */}
          <Box
            position={{ base: "static", lg: "sticky" }}
            top="120px"
            alignSelf="flex-start"
          >
            <ProductImageGallery
              images={product.images || []}
              alt={product.name}
            />
          </Box>

          {/* RIGHT: SCROLLABLE INFO */}
          <Box
            h={{ base: "auto", lg: "calc(100vh - 120px)" }}
            overflowY={{ base: "visible", lg: "auto" }}
            pr={{ base: 0, lg: "12px" }}
          >
            <ProductSummary
              product={product}
              onAddToCart={handleAddToCart}
              onAddToFavourite={handleAddToFavourite}
              onOpenSizeGuide={openSizeGuide}
            />

            <ProductInfoTabs product={product} />
          </Box>
        </Grid>
      </Box>

      <Box mt="120px">
        <RelatedProducts product={product} />
      </Box>
    </>
  );
};
