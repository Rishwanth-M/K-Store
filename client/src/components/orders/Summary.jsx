import { Badge, Box, Divider, Flex, Text } from "@chakra-ui/react";
import { dateFormator } from "../../utils/dateFormator";
import { numberWithCommas } from "../../utils/extraFunctions";

export const Summary = ({
  createdAt,
  subTotal,
  discount,
  quantity,
  total,
  shipping,
  amount,
  paymentStatus,
  merchantTransactionId,
}) => {
  const { date, time } = createdAt
    ? dateFormator(createdAt)
    : { date: "-", time: "-" };

  const finalTotal = total ?? amount ?? 0;

  const statusColor =
    paymentStatus === "SUCCESS"
      ? "green"
      : paymentStatus === "FAILED"
      ? "red"
      : "orange";

  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="12px"
      p="20px"
    >
      <Flex justify="space-between" align="center">
        <Text fontSize="lg" fontWeight={600}>
          Order Summary
        </Text>

        {paymentStatus && (
          <Badge colorScheme={statusColor}>
            {paymentStatus}
          </Badge>
        )}
      </Flex>

      <Divider my="12px" />

      <Flex direction="column" gap="8px" fontSize="sm">
        <Text>Date: {date}</Text>
        <Text>Time: {time}</Text>

        {merchantTransactionId && (
          <Text>
            Transaction ID: {merchantTransactionId}
          </Text>
        )}

        <Divider my="8px" />

        {subTotal !== undefined && (
          <Flex justify="space-between">
            <Text>Subtotal</Text>
            <Text>₹{numberWithCommas(subTotal)}</Text>
          </Flex>
        )}

        {shipping !== undefined && (
          <Flex justify="space-between">
            <Text>Shipping</Text>
            <Text>₹{numberWithCommas(shipping)}</Text>
          </Flex>
        )}

        {discount !== undefined && (
          <Flex justify="space-between">
            <Text>Discount</Text>
            <Text>- ₹{numberWithCommas(discount)}</Text>
          </Flex>
        )}

        <Divider my="8px" />

        <Flex justify="space-between" fontWeight={700}>
          <Text>Total</Text>
          <Text>₹{numberWithCommas(finalTotal)}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};
