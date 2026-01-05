import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Spacer,
  Text,
  useColorMode,
  useToast,
  useBreakpointValue,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { IoOptionsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getRequest } from "../../redux/features/products/actions";
import { LeftSideFilter } from "../../components/products/LeftSideFilter";
import { SortFilters } from "../../components/products/SortFilters";
import { ProductDisplayBox } from "../../components/products/ProductDisplayBox";
import { Loading } from "../../components/loading/Loading";
import { Error } from "../../components/loading/Error";

import {
  getItemSession,
  setItemSession,
} from "../../utils/sessionStorage";

export const Products = () => {
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const touchStartX = useRef(null);

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const { products = [], isLoading, isError, appliedFiltersCount = 0 } =
    useSelector((state) => state.prodReducer);

  /* PATH */
  const path = getItemSession("path") || "all";

  useEffect(() => {
    dispatch(getRequest(path));
    setItemSession("path", path);
  }, [path, dispatch]);

  /* 🔒 LOCK PAGE SCROLL ON DESKTOP */
  useEffect(() => {
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobile]);

  const handleSingleProduct = (product) => {
    setItemSession("singleProduct", product);
    navigate("/description");
  };

  const getHeading = () => {
    switch (path) {
      case "boys":
        return "Boys";
      case "girls":
        return "Girls";
      case "unisex":
        return "Unisex";
      case "combo":
        return "Combos";
      default:
        return "All Products";
    }
  };

  /* MOBILE SWIPE CLOSE */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 80) setShowMobileFilter(false);
    touchStartX.current = null;
  };

  return (
    <>
      {/* ================= TOP BAR ================= */}
      {/* ================= DESKTOP TOP BAR ONLY ================= */}
{!isMobile && (
  <Flex
    direction="row"
    h="64px"
    position="sticky"
    top="0"
    bg={colorMode === "light" ? "white" : "#1a202c"}
    zIndex={10}
    px={8}
    borderBottom="1px solid"
    borderColor="gray.200"
  >
    <Center>
      <Text fontSize="22px" fontWeight="600">
        {getHeading()}{" "}
        <Text as="span" fontSize="14px" color="gray.500">
          ({products.length})
        </Text>
      </Text>
    </Center>
  </Flex>
)}


      

      {/* ================= DESKTOP: SPLIT SCROLL LAYOUT ================= */}
      {!isMobile && (
        <Flex
          h="calc(100vh - 64px)" /* subtract navbar height */
          px={{ base: 4, md: 10 }}
          pt={6}
          gap={12}
        >
          {/* 🔒 LEFT FILTER — COMPLETELY LOCKED */}
          <Box
            w="380px"
            flexShrink={0}
            overflow="hidden"
          >
            <LeftSideFilter />
          </Box>

          {/* 👉 RIGHT PRODUCTS — ONLY SCROLLABLE AREA */}
          <Box
            flex="1"
            overflowY="auto"
            pr={2}
            sx={{
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                background:
                  colorMode === "light"
                    ? "rgba(0,0,0,0.25)"
                    : "rgba(255,255,255,0.25)",
                borderRadius: "full",
              },
            }}
          >
            {isLoading ? (
              <Loading />
            ) : isError ? (
              <Error />
            ) : (
              <Grid
                templateColumns="repeat(3, 1fr)"
                gap={6}
              >
                {products.map((product) => (
                  <ProductDisplayBox
                    key={product._id}
                    {...product}
                    onClick={() =>
                      handleSingleProduct(product)
                    }
                  />
                ))}
              </Grid>
            )}
          </Box>
        </Flex>
      )}

      {isMobile && (
  <Box
    position="sticky"
    top="0"
    zIndex={10}
    bg={colorMode === "light" ? "white" : "#1a202c"}
    borderBottom="1px solid"
    borderColor="gray.200"
    px={4}
    py={2}
  >
    {/* ROW 1: FILTER */}
    <Flex align="center" justify="space-between">
      <Flex
        align="center"
        gap={2}
        cursor="pointer"
        onClick={() => setShowMobileFilter(true)}
      >
        <Text fontSize="16px" fontWeight="500">
          Filter
        </Text>
        <Text fontSize="20px" lineHeight="1">
          +
        </Text>
      </Flex>
    </Flex>

    {/* ROW 2: COUNT + SORT */}
    <Flex
      mt={2}
      align="center"
      justify="space-between"
    >
      <Text fontSize="14px" color="gray.500">
        {products.length} items
      </Text>

      <Flex align="center" gap={1}>
        <SortFilters />
      </Flex>
    </Flex>
  </Box>
)}


      {/* ================= MOBILE PRODUCTS ================= */}
      {isMobile && (
  <Box px={4} pb="120px">
    {isLoading ? (
      <Loading />
    ) : isError ? (
      <Error />
    ) : (
      <Grid templateColumns="1fr" gap={5}>
        {products.map((product) => (
          <ProductDisplayBox
            key={product._id}
            {...product}
            onClick={() => handleSingleProduct(product)}
          />
        ))}
      </Grid>
    )}
  </Box>
)}


      {/* ================= MOBILE FILTER DRAWER ================= */}
      {isMobile && (
        <>
          {/* OVERLAY */}
          <Box
            position="fixed"
            inset="0"
            bg="rgba(0,0,0,0.45)"
            backdropFilter="blur(6px)"
            zIndex={1999}
            opacity={showMobileFilter ? 1 : 0}
            pointerEvents={showMobileFilter ? "auto" : "none"}
            transition="opacity 0.25s ease"
            onClick={() => setShowMobileFilter(false)}
          />

          {/* DRAWER */}
          <Box
            position="fixed"
            top="0"
            right="0"
            h="100dvh"
            w="88%"
            maxW="420px"
            bg={colorMode === "light" ? "white" : "#1a202c"}
            zIndex={2000}
            boxShadow="2xl"
            transform={
              showMobileFilter
                ? "translateX(0)"
                : "translateX(100%)"
            }
            transition="transform 0.35s cubic-bezier(0.4,0,0.2,1)"
            overflowY="auto"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <Flex
              p={4}
              borderBottom="1px solid"
              borderColor="gray.200"
              justify="space-between"
              align="center"
            >
              <Text fontSize="18px" fontWeight="600">
                
              </Text>
              <Button
                size="sm"
                onClick={() => setShowMobileFilter(false)}
              >
                Done
              </Button>
            </Flex>

            <Box p={4}>
              <LeftSideFilter />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
