import {
  Box,
  Text,
  Badge,
  Stack,
  Flex,
  Button,
  SimpleGrid,
  Divider,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useState } from "react";
import { useSelector } from "react-redux";

/* 🔥 LOW STOCK ANIMATION */
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.85; }
  100% { transform: scale(1); opacity: 1; }
`;

export const ProductSummary = ({
  product,
  onAddToCart,
  onAddToFavourite,
  onOpenSizeGuide, // 🔥 from Description.jsx
}) => {
  const {
    name,
    description,
    category,
    productType,
    price,
    color,
    variants = [],
  } = product;

  const [selectedSize, setSelectedSize] = useState(null);

  /* ===== SELECTED VARIANT ===== */
  const selectedVariant = variants.find(
    (v) => v.size === selectedSize
  );

  const isSelectedSizeOutOfStock =
    selectedVariant && Number(selectedVariant.stock) <= 0;

  const inStock = variants.some((v) => Number(v.stock) > 0);

  /* ===== FAVOURITES ===== */
  const favouriteList =
    useSelector((state) => state.favouriteReducer.favourites) || [];

  const isFavourite = favouriteList.some(
    (item) =>
      item.product === product._id &&
      item.size === selectedSize
  );

  /* ===== COLORS ===== */
  const textColor = useColorModeValue("gray.900", "white");
  const mutedText = useColorModeValue("gray.600", "gray.400");
  const subtleText = useColorModeValue("gray.500", "gray.500");

  const primaryBg = useColorModeValue("black", "white");
  const primaryText = useColorModeValue("white", "black");
  const borderColor = useColorModeValue("black", "white");

  return (
    <Box color={textColor}>
      {/* ===== TITLE ===== */}
      <Text
        fontSize={["26px", "30px", "34px"]}
        fontWeight="700"
        lineHeight="1.2"
      >
        {name}
      </Text>

      {/* ===== SUBTITLE + BADGES ===== */}
      <Flex mt="10px" gap="10px" align="center" flexWrap="wrap">
        <Text fontSize="14px" color={mutedText}>
          {category}
        </Text>

        {productType?.toLowerCase() === "combo" && (
          <Badge colorScheme="purple" fontSize="11px">
            COMBO SET
          </Badge>
        )}

        <Badge colorScheme={inStock ? "green" : "red"} fontSize="11px">
          {inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      </Flex>

      {/* ===== PRICE ===== */}
      <Box mt="22px">
        <Text fontSize="30px" fontWeight="700">
          ₹ {price}
        </Text>
        <Text fontSize="13px" color={subtleText}>
          Inclusive of all taxes
        </Text>
      </Box>

      {/* ===== COLOR ===== */}
      {color && (
        <Flex gap="8px" mt="18px" align="center">
          <Badge variant="outline" borderColor={borderColor}>
            {color}
          </Badge>
        </Flex>
      )}

      {/* ===== DESCRIPTION ===== */}
      {description && (
        <Text mt="22px" fontSize="15px" lineHeight="1.8">
          {description}
        </Text>
      )}

      <Divider my="32px" />

      {/* ===== SIZE SELECT + SIZE GUIDE ===== */}
      {variants.length > 0 && (
        <Box>
          <Flex justify="space-between" align="center" mb="12px">
            <Text fontWeight="600">Select Size</Text>
            <Link
              fontSize="13px"
              color="blue.500"
              onClick={onOpenSizeGuide}
              cursor="pointer"
            >
              Size Guide
            </Link>
          </Flex>

          <SimpleGrid columns={4} spacing="12px">
            {variants.map((variant) => {
              const isDisabled = Number(variant.stock) <= 0;
              const isSelected = selectedSize === variant.size;
              const isLowStock =
                Number(variant.stock) > 0 &&
                Number(variant.stock) <= 5;

              return (
                <Button
                  key={variant.size}
                  variant="outline"
                  bg={isSelected ? primaryBg : "transparent"}
                  color={isSelected ? primaryText : textColor}
                  borderColor={borderColor}
                  isDisabled={isDisabled}
                  onClick={() => setSelectedSize(variant.size)}
                  position="relative"
                >
                  {variant.size}

                  {/* 🔥 ONLY X LEFT */}
                  {isLowStock && (
                    <Text
                      fontSize="10px"
                      position="absolute"
                      bottom="-18px"
                      color="red.500"
                      animation={`${pulse} 1.2s infinite`}
                    >
                      Only {variant.stock} left
                    </Text>
                  )}
                </Button>
              );
            })}
          </SimpleGrid>
        </Box>
      )}

      {/* ===== CTA ===== */}
      <Stack spacing="14px" mt="42px">
        <Button
          size="lg"
          bg={primaryBg}
          color={primaryText}
          h="54px"
          fontSize="15px"
          isDisabled={!selectedSize || isSelectedSizeOutOfStock}
          onClick={() => onAddToCart(selectedSize)}
          _active={{ transform: "scale(0.98)" }}
        >
          {isSelectedSizeOutOfStock ? "Out of Stock" : "Add to Bag"}
        </Button>

        <Button
          size="lg"
          variant="outline"
          h="54px"
          borderColor={borderColor}
          fontSize="15px"
          isDisabled={
            !selectedSize ||
            isSelectedSizeOutOfStock ||
            isFavourite
          }
          onClick={() => onAddToFavourite(selectedSize)}
          _active={{ transform: "scale(0.98)" }}
        >
          {isFavourite ? "Added to Favourites" : "Favourite"}
        </Button>
      </Stack>
    </Box>
  );
};
