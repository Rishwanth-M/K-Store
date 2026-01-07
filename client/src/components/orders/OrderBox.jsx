import { Box, Flex, Image, Text, Badge } from "@chakra-ui/react";
import { numberWithCommas, shortString } from "../../utils/extraFunctions";
import noImage from "../../assets/no-image.png";

export const OrderBox = ({
  name,
  title,
  price,
  quantity,
  size,
  img = [],
  images = [],
}) => {
  /* ================= DATA SAFETY ================= */
  const imageList = img.length ? img : images;
  const imageUrl = imageList[0] || noImage;
  const productName = name || title || "Product";

  return (
    <Flex
      gap="16px"
      py="14px"
      align="flex-start"
      borderBottom="1px solid"
      borderColor="gray.100"
      _hover={{ bg: "gray.50" }}
      borderRadius="10px"
      px="6px"
    >
      {/* PRODUCT IMAGE */}
      <Image
        src={imageUrl}
        w="90px"
        h="90px"
        objectFit="cover"
        borderRadius="10px"
        border="1px solid"
        borderColor="gray.200"
        bg="white"
      />

      {/* PRODUCT DETAILS */}
      <Box flex="1">
        {/* NAME */}
        <Text
          fontWeight={600}
          fontSize="md"
          mb="4px"
        >
          {shortString(productName, 50)}
        </Text>

        {/* VARIANTS */}
        {size && (
          <Badge
            variant="subtle"
            colorScheme="gray"
            mb="6px"
          >
            Size: {size}
          </Badge>
        )}

        {/* META */}
        <Flex
          justify="space-between"
          align="center"
          mt="6px"
          fontSize="sm"
          color="gray.700"
        >
          <Text>
            Qty: <b>{quantity}</b>
          </Text>

          <Text fontWeight={700} color="gray.900">
            ₹{numberWithCommas(price)}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
