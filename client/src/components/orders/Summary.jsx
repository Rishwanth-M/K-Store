import {
  Badge,
  Box,
  Divider,
  Flex,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
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

  /* ================= FINAL TOTAL (OLD + NEW) ================= */
  const finalTotal = total ?? amount ?? 0;

  /* ================= STATUS COLOR ================= */
  const statusColor =
    paymentStatus === "SUCCESS"
      ? "green"
      : paymentStatus === "FAILED"
      ? "red"
      : "orange";

  /* ================= HANDLERS (SAFE PLACEHOLDERS) ================= */
  const handleDownloadInvoice = () => {
    // 🔥 backend PDF endpoint will plug here later
    console.log("Download invoice for:", merchantTransactionId);
  };

  const handleRetryPayment = () => {
    // 🔥 frontend retry flow (reuse initiatePayment)
    console.log("Retry payment for:", merchantTransactionId);
  };

  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="14px"
      p="20px"
      bg="white"
    >
      {/* ================= HEADER ================= */}
      <Flex justify="space-between" align="center">
        <Text fontSize="lg" fontWeight={700}>
          Order Summary
        </Text>

        {paymentStatus && (
          <Badge
            colorScheme={statusColor}
            px="10px"
            py="4px"
            borderRadius="full"
            fontSize="12px"
          >
            {paymentStatus}
          </Badge>
        )}
      </Flex>

      <Divider my="12px" />

      {/* ================= META ================= */}
      <VStack align="stretch" spacing="6px" fontSize="sm">
        <Flex justify="space-between">
          <Text color="gray.600">Order Date</Text>
          <Text fontWeight={500}>{date}</Text>
        </Flex>

        <Flex justify="space-between">
          <Text color="gray.600">Order Time</Text>
          <Text fontWeight={500}>{time}</Text>
        </Flex>

        {merchantTransactionId && (
          <Flex justify="space-between">
            <Text color="gray.600">Transaction ID</Text>
            <Text fontWeight={500} fontSize="xs">
              {merchantTransactionId}
            </Text>
          </Flex>
        )}
      </VStack>

      <Divider my="14px" />

      {/* ================= PRICE BREAKDOWN ================= */}
      <VStack align="stretch" spacing="6px" fontSize="sm">
        {subTotal !== undefined && (
          <Flex justify="space-between">
            <Text>Subtotal</Text>
            <Text>₹{numberWithCommas(subTotal)}</Text>
          </Flex>
        )}

        {quantity !== undefined && (
          <Flex justify="space-between">
            <Text>Items</Text>
            <Text>{quantity}</Text>
          </Flex>
        )}

        {shipping !== undefined && (
          <Flex justify="space-between">
            <Text>Shipping</Text>
            <Text>₹{numberWithCommas(shipping)}</Text>
          </Flex>
        )}

        {discount !== undefined && discount > 0 && (
          <Flex justify="space-between" color="green.600">
            <Text>Discount</Text>
            <Text>- ₹{numberWithCommas(discount)}</Text>
          </Flex>
        )}
      </VStack>

      <Divider my="14px" />

      {/* ================= TOTAL ================= */}
      <Flex justify="space-between" fontWeight={700} fontSize="md">
        <Text>Total Payable</Text>
        <Text>₹{numberWithCommas(finalTotal)}</Text>
      </Flex>

      <Divider my="16px" />

      {/* ================= ACTIONS ================= */}
      <VStack spacing="10px">
        {paymentStatus === "SUCCESS" && (
          <Button
            width="100%"
            colorScheme="blue"
            variant="outline"
            onClick={handleDownloadInvoice}
          >
            Download Invoice
          </Button>
        )}

        {paymentStatus === "FAILED" && (
          <Button
            width="100%"
            colorScheme="red"
            onClick={handleRetryPayment}
          >
            Retry Payment
          </Button>
        )}
      </VStack>
    </Box>
  );
};
