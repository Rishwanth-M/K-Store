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
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box color={textColor}>
      {/* PRODUCT NAME */}
      <Text
        fontSize={["26px", "30px", "34px"]}
        fontWeight="700"
        lineHeight="1.15"
        letterSpacing="-0.02em"
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
        <Text mt="22px" fontSize="15px" lineHeight="1.7" color={textColor}>
          {description}
        </Text>
      )}

      <Divider my="28px" borderColor={useColorModeValue("gray.200", "gray.600")} />

      {/* SIZE SELECT */}
      {variants.length > 0 && (
        <Box>
          <Flex justify="space-between" mb="10px">
            <Text fontWeight="600">Select Size</Text>
          </Flex>

          <SimpleGrid columns={4} spacing="12px">
            {variants.map((variant) => {
              const isDisabled = Number(variant.stock) <= 0;
              const isSelected = selectedSize === variant.size;

              return (
                <Button
                  key={variant.size}
                  size="md"
                  variant="outline"
                  bg={isSelected ? primaryBg : "transparent"}
                  color={isSelected ? primaryText : textColor}
                  borderColor={borderColor}
                  _hover={{
                    bg: isSelected ? primaryBg : hoverBg,
                  }}
                  _disabled={{
                    opacity: 0.4,
                    cursor: "not-allowed",
                  }}
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
          fontSize="15px"
          _hover={{
            bg: useColorModeValue("blackAlpha.900", "gray.200"),
          }}
          isDisabled={!selectedSize || !inStock}
          onClick={() => onAddToCart(selectedSize)}
        >
          Add to Bag
        </Button>

        <Button
          size="lg"
          variant="outline"
          h="52px"
          fontSize="15px"
          borderColor={borderColor}
          color={textColor}
          _hover={{ bg: hoverBg }}
          onClick={onAddToFavourite}
        >
          Favourite
        </Button>
      </Stack>
    </Box>
  );
};
