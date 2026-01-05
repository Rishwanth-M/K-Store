import {
  Box,
  Image,
  Text,
  Badge,
  Stack,
  IconButton,
  HStack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { useRef, useState } from "react";
import { numberWithCommas } from "../../utils/extraFunctions";

export const ProductDisplayBox = ({
  name,
  price,
  images = [],
  stock = 0,
  onClick,

  isNew = false,
  isPopular = false,
  isOnSale = false,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const touchTimer = useRef(null);

  const primaryImage =
    images?.[0] ||
    "https://via.placeholder.com/800x800?text=Product";

  const secondaryImage = images?.[1];

  const cardBg = useColorModeValue("white", "gray.900");
  const imageBg = useColorModeValue("gray.50", "gray.800");

  /* STOCK STATES */
  /* STOCK STATES */
const stockCount = Number(stock);

const isOutOfStock = stockCount === 0;
const isLowStock = stockCount > 0 && stockCount <= 5;
const isInStock = stockCount > 5;


  /* TOUCH (LONG PRESS) HANDLERS */
  const handleTouchStart = () => {
    if (!secondaryImage) return;
    touchTimer.current = setTimeout(() => {
      setIsHovering(true);
    }, 200);
  };

  const handleTouchEnd = () => {
    clearTimeout(touchTimer.current);
    setIsHovering(false);
  };

  return (
    <Box
      role="group"
      tabIndex={isOutOfStock ? -1 : 0}
      bg={cardBg}
      borderRadius="20px"
      overflow="hidden"
      cursor={isOutOfStock ? "not-allowed" : "pointer"}
      opacity={isOutOfStock ? 0.55 : 1}
      pointerEvents={isOutOfStock ? "none" : "auto"}
      outline="none"
      _focusVisible={{
        boxShadow: "0 0 0 2px rgba(66,153,225,0.6)",
      }}
      onClick={!isOutOfStock ? onClick : undefined}
    >
      {/* IMAGE AREA */}
      <Box
        position="relative"
        aspectRatio={1}
        bg={imageBg}
        borderRadius="20px"
        overflow="hidden"
        onMouseEnter={() =>
          secondaryImage &&
          window.matchMedia("(hover: hover)").matches &&
          setIsHovering(true)
        }
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchEnd}
      >
        {/* STATUS BADGES */}
        {isOutOfStock && (
          <Badge
            position="absolute"
            top="14px"
            left="14px"
            px={3}
            py={1}
            fontSize="11px"
            fontWeight="600"
            borderRadius="full"
            zIndex={3}
            bg="gray.600"
            color="white"
          >
            Out of stock
          </Badge>
        )}

        {!isOutOfStock && (isNew || isPopular || isOnSale) && (
          <Badge
            position="absolute"
            top="14px"
            left="14px"
            px={3}
            py={1}
            fontSize="11px"
            fontWeight="600"
            borderRadius="full"
            zIndex={3}
            bg={
              isOnSale
                ? "red.500"
                : isPopular
                ? "black"
                : "blue.600"
            }
            color="white"
          >
            {isOnSale
              ? "Sale"
              : isPopular
              ? "Popular"
              : "New"}
          </Badge>
        )}

        {/* PRIMARY IMAGE */}
        <Image
          src={primaryImage}
          alt={name}
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          objectFit="contain"
          p="18px"
          opacity={isHovering && secondaryImage ? 0 : 1}
          transition="opacity 0.45s cubic-bezier(0.4,0,0.2,1)"
          draggable={false}
        />

        {/* SECONDARY IMAGE */}
        {secondaryImage && (
          <Image
            src={secondaryImage}
            alt={`${name} alternate`}
            position="absolute"
            inset="0"
            w="100%"
            h="100%"
            objectFit="contain"
            p="18px"
            opacity={isHovering ? 1 : 0}
            transition="opacity 0.45s cubic-bezier(0.4,0,0.2,1)"
            draggable={false}
          />
        )}
      </Box>

      {/* CONTENT */}
      <Stack spacing={1.5} px={2} pt={4} pb={3}>
        {/* DESKTOP: NAME + STOCK INLINE */}
        <HStack
          spacing={2}
          align="start"
          display={{ base: "none", md: "flex" }}
        >
          <Text
            fontSize="20px"
            fontWeight="600"
            lineHeight="1.35"
            noOfLines={2}
            flex="1"
          >
            {name}
          </Text>

          {isInStock && (
            <Badge bg="green.100" color="green.700" fontSize="10px">
              In stock
            </Badge>
          )}

          {isLowStock && (
            <Badge bg="red.100" color="red.700" fontSize="10px">
              Low stock
            </Badge>
          )}
        </HStack>

        {/* MOBILE: STACKED */}
        <VStack
          spacing={1}
          align="start"
          display={{ base: "flex", md: "none" }}
        >
          <Text
            fontSize={{ base: "16px", md: "17px" }}
  fontWeight="600"
  lineHeight="1.4"
          >
            {name}
          </Text>

          {isInStock && (
            <Badge bg="green.100" color="green.700" fontSize="10px">
              In stock
            </Badge>
          )}

          {isLowStock && (
            <Badge bg="red.100" color="red.700" fontSize="10px">
              Low stock
            </Badge>
          )}
        </VStack>

        {/* PRICE */}
        <Text
          fontSize={{ base: "17px", md: "18px" }}
  fontWeight="600"
        >
          ₹{numberWithCommas(price)}
        </Text>
      </Stack>
    </Box>
  );
};
