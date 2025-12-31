import {
  Box,
  Grid,
  Text,
  Flex,
  Button,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getRequest } from "../redux/features/products/actions";
import { ProductDisplayBox } from "../components/products/ProductDisplayBox";
import { setItemSession } from "../utils/sessionStorage";
import { Loading } from "../components/loading/Loading";
import { Error } from "../components/loading/Error";

const HomeCombo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products = [], isLoading, isError } = useSelector(
    (state) => state.prodReducer
  );

  useEffect(() => {
    dispatch(getRequest("Combo"));
  }, [dispatch]);

  const handleClick = (product) => {
    setItemSession("singleProduct", product);
    navigate("/description");
  };

const normalizedProducts = Array.isArray(products)
  ? products
  : Array.isArray(products?.products)
  ? products.products
  : [];

const comboProducts = normalizedProducts.slice(0, 4);


  const getIncludesPreview = (details = "") => {
    if (!details.toLowerCase().includes("includes")) return null;

    return details
      .replace(/includes/i, "")
      .split(",")
      .slice(0, 5)
      .map((i) => i.trim())
      .join(" • ");
  };

  return (
    <Box
      w="100%"
      px={{ base: 3, sm: 4, md: 6 }}   // 🔥 small edge gap only
      mt={{ base: 10, md: 16 }}
    >
      {/* HEADER */}
      <Flex justify="space-between" align="center" mb={4}>
        <Box>
          <Text
            fontSize={{ base: "20px", md: "24px" }}
            fontWeight="600"
          >
            Combo Packs
          </Text>
          <Text fontSize="sm" color="gray.500">
            Best value bundles
          </Text>
        </Box>

        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate("/allProducts")}
        >
          View All
        </Button>
      </Flex>

      <Divider mb={4} />

      {/* CONTENT */}
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : (
        <Grid
          gap={5}
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
        >
          {Array.isArray(comboProducts) &&
            comboProducts.map((product) => {
            const includesPreview = getIncludesPreview(product.details);

            return (
              <Box
                key={product._id}
                _hover={{ transform: "translateY(-2px)" }}
                transition="0.2s ease"
              >
                <ProductDisplayBox
                  {...product}
                  onClick={() => handleClick(product)}
                />

                <Stack spacing={1} mt={2}>
                  {includesPreview && (
                    <Text fontSize="sm" color="gray.600">
                      <Text as="span" fontWeight="500">
                        Includes:
                      </Text>{" "}
                      {includesPreview}
                    </Text>
                  )}

                  {product.mrp && product.mrp > product.price && (
                    <Flex gap={2} align="center">
                      <Text
                        fontSize="sm"
                        color="gray.500"
                        textDecoration="line-through"
                      >
                        ₹{product.mrp}
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="green.600"
                      >
                        ₹{product.price}
                      </Text>
                    </Flex>
                  )}
                </Stack>
              </Box>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default HomeCombo;
