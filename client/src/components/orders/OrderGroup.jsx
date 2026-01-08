import { Box, Divider, Flex, Text, Badge } from "@chakra-ui/react";
import { OrderItemCard } from "./OrderItemCard";
import { OrderSummaryCard } from "./OrderSummaryCard";
import { OrderShippingCard } from "./OrderShippingCard";
import { OrderActions } from "./OrderActions";
import { dateFormator } from "../../utils/dateFormator";

export const OrderGroup = ({ order }) => {
  const { date, time } = dateFormator(order.createdAt);

  return (
    <Box
      bg="white"
      borderRadius="22px"
      p={{ base: "18px", md: "26px" }}
      mb="56px"
      boxShadow="0 14px 40px rgba(0,0,0,0.06)"
      border="1px solid"
      borderColor="gray.100"
      position="relative"
    >
      {/* ================= ORDER HEADER ================= */}
      <Flex
        justify="space-between"
        align="center"
        mb="24px"
        flexWrap="wrap"
        gap="12px"
      >
        <Box>
          <Text fontSize="12px" color="gray.500">
            Ordered on
          </Text>
          <Text fontSize="15px" fontWeight="600">
            {date} • {time}
          </Text>
        </Box>

        <Badge
          px="14px"
          py="6px"
          borderRadius="full"
          fontSize="11px"
          letterSpacing="0.6px"
          textTransform="uppercase"
          colorScheme={
            order.orderStatus === "CONFIRMED"
              ? "green"
              : order.orderStatus === "SHIPPED"
              ? "blue"
              : order.orderStatus === "DELIVERED"
              ? "green"
              : "gray"
          }
        >
          {order.orderStatus}
        </Badge>
      </Flex>

      {/* ================= ORDER ITEMS ================= */}
      <Box>
        {order.cartProducts.map((item, idx) => (
          <OrderItemCard key={idx} {...item} />
        ))}
      </Box>

      <Divider my="26px" />

      {/* ================= META / DETAILS ================= */}
      <Box
        display="grid"
        gap="20px"
        gridTemplateColumns={{ base: "1fr", md: "1.2fr 1.5fr 1fr" }}
      >
        <OrderSummaryCard orderSummary={order.orderSummary} />

        <OrderShippingCard {...order.shippingDetails} />

        <OrderActions
          orderId={order._id}
          logistics={order.logistics}
        />
      </Box>
    </Box>
  );
};
