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
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";

export const ProductSummary = ({
  product,
  onAddToCart,
  onAddToFavourite,
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

  /* ===================== */
  /* FAVOURITES (SIZE AWARE) */
  /* ===================== */
  const favouriteList =
    useSelector((state) => state.favouriteReducer.favourite) || [];

  const isFavourite = favouriteList.some(
    (item) =>
      item.product === product._id &&
      item.size === selectedSize
  );

  const inStock = variants.some((v) => Number(v.stock) > 0);

  /* ===================== */
  /* COLOR MODE VALUES */
  /* ===================== */
  const textColor = useColorModeValue("gray.900", "white");
  const mutedText = useColorModeValue("gray.600", "gray.400");
  const subtleText = useColorModeValue("gray.500", "gray.500");

  const primaryBg = useColorModeValue("black", "white");
  const primaryText = useColorModeValue("white", "black");

  const borderColor = useColorModeValue("black", "white");

  return (
    <Box color={textColor}>
      {/* PRODUCT NAME */}
      <Text
        fontSize={["26px", "30px", "34px"]}
        fontWeight="700"
        lineHeight="1.15"
      >
        {name}
      </Text>

      {/* SUBTITLE */}
      <Text mt="6px" fontSize="15px" color={mutedText}>
        {category} · {productType}
      </Text>

      {/* PRICE */}
      <Text mt="20px" fontSize="28px" fontWeight="700">
        ₹ {price}
      </Text>
      <Text fontSize="13px" color={subtleText}>
        Inclusive of all taxes
      </Text>

      {/* BADGES */}
      <Flex gap="8px" mt="18px" flexWrap="wrap">
        {color && (
          <Badge variant="outline" borderColor={borderColor}>
            {color}
          </Badge>
        )}
        <Badge colorScheme={inStock ? "green" : "red"}>
          {inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      </Flex>

      {/* DESCRIPTION */}
      {description && (
        <Text mt="22px" fontSize="15px" lineHeight="1.7">
          {description}
        </Text>
      )}

      <Divider my="28px" />

      {/* SIZE SELECT */}
      {variants.length > 0 && (
        <Box>
          <Text fontWeight="600" mb="10px">
            Select Size
          </Text>

          <SimpleGrid columns={4} spacing="12px">
            {variants.map((variant) => {
              const isDisabled = Number(variant.stock) <= 0;
              const isSelected = selectedSize === variant.size;

              return (
                <Button
                  key={variant.size}
                  variant="outline"
                  bg={isSelected ? primaryBg : "transparent"}
                  color={isSelected ? primaryText : textColor}
                  borderColor={borderColor}
                  isDisabled={isDisabled}
                  onClick={() => setSelectedSize(variant.size)}
                >
                  {variant.size}
                </Button>
              );
            })}
          </SimpleGrid>
        </Box>
      )}

      {/* CTA */}
      <Stack spacing="14px" mt="36px">
        <Button
          size="lg"
          bg={primaryBg}
          color={primaryText}
          h="52px"
          isDisabled={!selectedSize || !inStock}
          onClick={() => onAddToCart(selectedSize)}
        >
          Add to Bag
        </Button>

        <Button
          size="lg"
          variant="outline"
          h="52px"
          borderColor={borderColor}
          isDisabled={!selectedSize || isFavourite}
          onClick={() => onAddToFavourite(selectedSize)}
        >
          {isFavourite ? "Added to Favourites" : "Favourite"}
        </Button>
      </Stack>
    </Box>
  );
};
