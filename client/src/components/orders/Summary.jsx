import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { dateFormator } from "../../utils/dateFormator";
import { numberWithCommas } from "../../utils/extraFunctions";
import { OrderPageText } from "./OrderPageText";

export const Summary = ({
  createdAt,

  /* ===== OLD ORDER FIELDS ===== */
  subTotal,
  discount,
  quantity,
  total,
  shipping,

  /* ===== NEW PHONEPE FIELDS ===== */
  amount,
  paymentStatus,
  merchantTransactionId,
  razorpayPaymentId,
}) => {
  const { date, time } = createdAt
    ? dateFormator(createdAt)
    : { date: "-", time: "-" };

  // ✅ Final amount resolution (old + new compatible)
  const finalTotal =
    total ??
    amount ??
    0;

  return (
    <Box py="15px" px="25px">
      <Text fontSize="20px" fontWeight={600}>
        Summary
      </Text>

      <Divider />

      <Flex flexDirection="column" gap="8px" my="20px" fontSize="16px">
        <OrderPageText name="Order Date" value={date} />
        <OrderPageText name="Order Time" value={time} />

        <Divider my="10px" />

        {/* ✅ Payment / Transaction IDs */}
        {merchantTransactionId && (
          <OrderPageText
            name="Transaction ID"
            value={merchantTransactionId}
          />
        )}

        {razorpayPaymentId && (
          <OrderPageText
            name="Payment ID"
            value={razorpayPaymentId}
          />
        )}

        {paymentStatus && (
          <OrderPageText
            name="Payment Status"
            value={paymentStatus}
          />
        )}

        <Divider my="10px" />

        {/* ===== OLD ORDERS ONLY ===== */}
        {subTotal !== undefined && (
          <OrderPageText
            name="Subtotal"
            value={`₹${numberWithCommas(subTotal)}`}
          />
        )}

        {quantity !== undefined && (
          <OrderPageText
            name="Quantity"
            value={quantity}
          />
        )}

        {shipping !== undefined && (
          <Flex justifyContent="space-between">
            <Text>Shipping</Text>
            <Text>
              ₹{numberWithCommas(shipping)}
            </Text>
          </Flex>
        )}

        {discount !== undefined && (
          <OrderPageText
            name="Discount"
            value={`₹${numberWithCommas(discount)}`}
          />
        )}

        <Divider my="10px" />

        {/* ✅ FINAL TOTAL (OLD + NEW) */}
        <OrderPageText
          name="Total"
          value={`₹${numberWithCommas(finalTotal)}`}
        />
      </Flex>
    </Box>
  );
};
