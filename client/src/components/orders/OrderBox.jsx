import { Box, Flex, Image, Text } from "@chakra-ui/react";
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
  const imageList = img.length ? img : images;
  const imageUrl = imageList[0] || noImage;
  const productName = name || title || "Product";

  return (
    <Flex
      gap="15px"
      py="12px"
      borderBottom="1px solid"
      borderColor="gray.100"
    >
      <Image
        src={imageUrl}
        w="90px"
        h="90px"
        objectFit="cover"
        borderRadius="8px"
      />

      <Box flex="1">
        <Text fontWeight={600}>
          {shortString(productName)}
        </Text>

        {size && (
          <Text fontSize="sm" color="gray.600">
            Size: {size}
          </Text>
        )}

        <Flex
          justify="space-between"
          mt="6px"
          fontSize="sm"
        >
          <Text>Qty: {quantity}</Text>
          <Text fontWeight={600}>
            ₹{numberWithCommas(price)}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
