import {
  Box,
  Grid,
  Text,
  Flex,
  Button,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getRequest } from "../redux/features/products/actions";
import { ProductDisplayBox } from "../components/products/ProductDisplayBox";
import { setItemSession } from "../utils/sessionStorage";
import { Loading } from "../components/loading/Loading";
import { Error } from "../components/loading/Error";

gsap.registerPlugin(ScrollTrigger);

const HomeCombo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

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

  // 🔥 GSAP SCROLL + 3D EFFECT
  useEffect(() => {
    if (!cardsRef.current.length) return;

    const ctx = gsap.context(() => {
      gsap.set(cardsRef.current, {
        transformOrigin: "center center",
      });

      gsap.to(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: true,
        },
        stagger: 0.15,
        z: (i) => i * 120,
        scale: (i) => 1 - i * 0.04,
        opacity: (i) => 1 - i * 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [comboProducts]);

  return (
    <Box
      ref={sectionRef}
      w="100%"
      px={{ base: 3, sm: 4, md: 6 }}
      mt={{ base: 20, md: 32 }}
      position="relative"
      sx={{
        perspective: "1200px", // 👈 CRITICAL for 3D feel
      }}
    >
      {/* HEADER */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Text fontSize={{ base: "20px", md: "28px" }} fontWeight="600">
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

      <Divider mb={6} />

      {/* CONTENT */}
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : (
        <Grid
          gap={6}
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
        >
          {comboProducts.map((product, index) => {
            const includesPreview = getIncludesPreview(product.details);

            return (
              <Box
                key={product._id}
                ref={(el) => (cardsRef.current[index] = el)}
                transition="transform 0.3s ease"
                _hover={{
                  transform: "translateY(-6px) scale(1.02)",
                }}
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
