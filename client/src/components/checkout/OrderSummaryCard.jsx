import {
  Box,
  Divider,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export const OrderSummaryCard = ({ orderSummary }) => {
  const bg = useColorModeValue("white", "#020617");
  const border = useColorModeValue("#e2e8f0", "#1e293b");
  const subText = useColorModeValue("gray.500", "gray.400");

  return (
    <Box
      position={{ md: "sticky" }}
      top="100px"
      bg={bg}
      border="1px solid"
      borderColor={border}
      borderRadius="18px"
      p="24px"
      boxShadow="0 10px 30px rgba(0,0,0,0.06)"
    >
      {/* HEADER */}
      <Text fontSize="20px" fontWeight="600" mb="6">
        Order Summary
      </Text>

      {/* PRICE BREAKDOWN */}
      <Flex direction="column" gap="3">
        <Flex justify="space-between">
          <Text color={subText}>Subtotal</Text>
          <Text>₹{orderSummary.subTotal}</Text>
        </Flex>

        <Flex justify="space-between">
          <Text color={subText}>Shipping</Text>
          <Text>₹{orderSummary.shipping}</Text>
        </Flex>

        <Flex justify="space-between">
          <Text color={subText}>Discount</Text>
          <Text>- ₹{orderSummary.discount}</Text>
        </Flex>
      </Flex>

      <Divider my="5" />

      {/* TOTAL */}
      <Flex justify="space-between" align="center">
        <Text fontSize="16px" fontWeight="600">
          Total
        </Text>
        <Text fontSize="18px" fontWeight="700">
          ₹{orderSummary.total}
        </Text>
      </Flex>

      {/* TRUST & DELIVERY INFO */}
      <Box mt="5">
        <Text fontSize="13px" color={subText}>
          🚚 Delivered by <strong>Blue Dart Express</strong>
        </Text>
        <Text fontSize="13px" color={subText} mt="1">
          ⏱ Estimated delivery in 3–5 business days
        </Text>
        <Text fontSize="13px" color={subText} mt="1">
          💵 Cash on Delivery available
        </Text>
      </Box>
    </Box>
  );
};
