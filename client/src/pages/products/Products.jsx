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
import { getRequest } from "../../redux/features/products/actions";
import { LeftSideFilter } from "../../components/products/LeftSideFilter";
import { SortFilters } from "../../components/products/SortFilters";
import { useNavigate } from "react-router-dom";
import { getItemSession, setItemSession } from "../../utils/sessionStorage";
import { ProductDisplayBox } from "../../components/products/ProductDisplayBox";
import { Loading } from "../../components/loading/Loading";
import { Error } from "../../components/loading/Error";

export const Products = () => {
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [showFilter, setShowFilter] = useState(false);
  const touchStartX = useRef(null);

  const { products = [], isLoading, isError } = useSelector(
    (state) => state.prodReducer
  );

  const path = getItemSession("path");
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRequest(path));
  }, [path, dispatch]);

  /* 🔒 Lock scroll ONLY when mobile drawer open */
  useEffect(() => {
    if (isMobile && showFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isMobile, showFilter]);

  const handleSingleProduct = (data) => {
    setItemSession("singleProduct", data);
    navigate("/description");
  };

  const handleReset = () => {
    dispatch({ type: "RESET_FILTERS" });
    setShowFilter(false);
    toast({ title: "Filters reset", status: "success", duration: 1500 });
  };

  const handleApplyClose = () => {
    setShowFilter(false);
  };

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

  /* 📱 Swipe to close */
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
      {/* TOP BAR */}
      <Flex
        direction={["column", "column", "row"]}
        h={["100px", "100px", "60px"]}
        position="sticky"
        top="0"
        bg={colorMode === "light" ? "white" : "#1a202c"}
        zIndex={10}
      >
        <Center>
          <Text ml={["20px", "30px", "50px"]} fontSize={["20px", "25px"]} fontWeight={500}>
            {getHeading()} [{products.length}]
          </Text>
        </Center>

        <Spacer />

        <Center>
          <Flex gap="8px" px={["10px", "20px"]}>
            <Button
              fontSize={["13px", "16px"]}
              rightIcon={<IoOptionsOutline />}
              onClick={() => setShowFilter((p) => !p)}
            >
              {showFilter ? "Hide Filter" : "Show Filter"}
            </Button>

            <SortFilters />
          </Flex>
        </Center>
      </Flex>

      {/* DESKTOP */}
      {!isMobile && (
        <Grid gap="2%" templateColumns={showFilter ? "20% 78%" : "100%"} px="20px">
          {showFilter && (
            <Box position="sticky" top="80px">
              <LeftSideFilter onApplyClose={handleApplyClose} />
            </Box>
          )}

          <Box>
            {isLoading ? <Loading /> : isError ? <Error /> : (
              <Grid gap={4} templateColumns="repeat(3, 1fr)">
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

      {/* MOBILE PRODUCTS */}
      {isMobile && (
        <Box px="0" w="100%" overflowX="hidden" pb="120px">
          {isLoading ? <Loading /> : isError ? <Error /> : (
            <Grid
  gap={4}
  templateColumns="1fr"
  w="100%"
  maxW="100%"
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
      )}

      {/* MOBILE FILTER */}
      {isMobile && (
        <>
          {/* BACKDROP */}
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

          {/* DRAWER */}
          <Box
            position="fixed"
            top="0"
            right="0"
            h="100dvh"
            minH="100dvh"
            w="88%"
            maxW="420px"
            bg={colorMode === "light" ? "white" : "#1a202c"}
            zIndex={2000}
            boxShadow="2xl"
            transform={showFilter ? "translateX(0)" : "translateX(100%)"}
            transition="transform 0.35s cubic-bezier(0.4,0,0.2,1)"
            overflowY="auto"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            pb="env(safe-area-inset-bottom)"
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
              <Button size="sm" onClick={() => setShowFilter(false)}>
                Close
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
