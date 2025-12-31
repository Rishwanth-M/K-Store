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

import { RESET_FILTERS } from "../../redux/features/products/actionTypes";

export const Products = () => {
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [showFilter, setShowFilter] = useState(false);
  const touchStartX = useRef(null);

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const { products = [], isLoading, isError } = useSelector(
    (state) => state.prodReducer
  );

  /* ✅ SAFE PATH FALLBACK */
  const sessionPath = getItemSession("path");
  const path = sessionPath || "all";

  useEffect(() => {
    dispatch(getRequest(path));
    setItemSession("path", path);
  }, [path, dispatch]);

  /* 🔒 Lock scroll when mobile filter open */
  useEffect(() => {
    document.body.style.overflow =
      isMobile && showFilter ? "hidden" : "auto";

    return () => (document.body.style.overflow = "auto");
  }, [isMobile, showFilter]);

  const handleSingleProduct = (product) => {
    setItemSession("singleProduct", product);
    navigate("/description");
  };

  const handleReset = () => {
    dispatch({ type: RESET_FILTERS });
    setShowFilter(false);
    toast({
      title: "Filters reset",
      status: "success",
      duration: 1500,
    });
  };

  const handleApplyClose = () => setShowFilter(false);

  const getHeading = () => {
    switch (path) {
      case "boys":
        return "Boys Products";
      case "girls":
        return "Girls Products";
      case "unisex":
        return "Unisex Products";
      case "combo":
        return "Combo Packs";
      default:
        return "All Products";
    }
  };

  /* 📱 Swipe to close mobile filter */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 80) setShowFilter(false);
    touchStartX.current = null;
  };

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <Flex
        direction={{ base: "column", md: "row" }}
        h={{ base: "100px", md: "60px" }}
        position="sticky"
        top="0"
        bg={colorMode === "light" ? "white" : "#1a202c"}
        zIndex={10}
      >
        <Center>
          <Text
            ml={{ base: "20px", md: "50px" }}
            fontSize={{ base: "20px", md: "25px" }}
            fontWeight={500}
          >
            {getHeading()} [{products.length}]
          </Text>
        </Center>

        <Spacer />

        <Center>
          <Flex gap="8px" px={{ base: "10px", md: "20px" }}>
            <Button
              fontSize={{ base: "13px", md: "16px" }}
              rightIcon={<IoOptionsOutline />}
              onClick={() => setShowFilter((p) => !p)}
            >
              {showFilter ? "Hide Filter" : "Show Filter"}
            </Button>

            <SortFilters />
          </Flex>
        </Center>
      </Flex>

      {/* ================= DESKTOP ================= */}
      {!isMobile && (
        <Grid
          gap="2%"
          templateColumns={showFilter ? "260px 1fr" : "1fr"}
          px="20px"
        >
          {showFilter && (
            <Box position="sticky" top="80px">
              <LeftSideFilter onApplyClose={handleApplyClose} />
            </Box>
          )}

          <Box>
            {isLoading ? (
              <Loading />
            ) : isError ? (
              <Error />
            ) : (
              <Grid
                gap={4}
                templateColumns={{
                  base: "1fr",
                  md: "repeat(2, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
              >
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
        </Grid>
      )}

      {/* ================= MOBILE ================= */}
      {isMobile && (
        <Box px="0" w="100%" overflowX="hidden" pb="120px">
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <Error />
          ) : (
            <Grid gap={4} templateColumns="1fr">
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

      {/* ================= MOBILE FILTER ================= */}
      {isMobile && (
        <>
          <Box
            position="fixed"
            inset="0"
            bg="rgba(0,0,0,0.45)"
            backdropFilter="blur(6px)"
            zIndex={1999}
            opacity={showFilter ? 1 : 0}
            pointerEvents={showFilter ? "auto" : "none"}
            transition="opacity 0.25s ease"
            onClick={() => setShowFilter(false)}
          />

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
              showFilter ? "translateX(0)" : "translateX(100%)"
            }
            transition="transform 0.35s cubic-bezier(0.4,0,0.2,1)"
            overflowY="auto"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <Flex
              p="16px"
              borderBottom="1px solid"
              borderColor="gray.200"
              justify="space-between"
              align="center"
            >
              <Text fontSize="18px" fontWeight={600}>
                Filters
              </Text>
              <Button size="sm" onClick={handleReset}>
                Reset
              </Button>
            </Flex>

            <Box p="16px">
              <LeftSideFilter onApplyClose={handleApplyClose} />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
