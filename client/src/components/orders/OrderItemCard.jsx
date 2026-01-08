import { Box, Flex, Image, Text } from "@chakra-ui/react";

export const OrderItemCard = ({ name, images, size, quantity, price }) => {
  return (
    <Flex
      bg="white"
      borderRadius="14px"
      p="16px"
      align="center"
      justify="space-between"
      boxShadow="sm"
      mb="12px"
    >
      <Flex gap="16px" align="center">
        <Image
          src={images?.[0]}
          boxSize="80px"
          objectFit="cover"
          borderRadius="10px"
        />

        <Box>
          <Text fontWeight="600">{name}</Text>
          <Text fontSize="13px" color="gray.500">
            Size: {size}
          </Text>
          <Text fontSize="13px" color="gray.500">
            Qty: {quantity}
          </Text>
        </Box>
      </Flex>

      <Text fontWeight="600">₹{price}</Text>
    </Flex>
  );
};
