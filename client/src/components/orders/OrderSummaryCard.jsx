import { Box, Divider, Flex, Text } from "@chakra-ui/react";

export const OrderSummaryCard = ({ orderSummary }) => {
  return (
    <Box bg="white" borderRadius="14px" p="20px" boxShadow="sm">
      <Text fontWeight="600" mb="12px">
        Order Summary
      </Text>

      {[
        ["Subtotal", orderSummary.subTotal],
        ["Shipping", orderSummary.shipping],
        ["Discount", orderSummary.discount],
      ].map(([label, value]) => (
        <Flex key={label} justify="space-between" mb="6px">
          <Text fontSize="14px">{label}</Text>
          <Text fontSize="14px">₹{value}</Text>
        </Flex>
      ))}

      <Divider my="10px" />

      <Flex justify="space-between" fontWeight="700">
        <Text>Total</Text>
        <Text>₹{orderSummary.total}</Text>
      </Flex>
    </Box>
  );
};
