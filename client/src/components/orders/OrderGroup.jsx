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
      borderRadius="20px"
      p={{ base: "16px", md: "24px" }}
      mb="48px"
      boxShadow="0 8px 24px rgba(0,0,0,0.04)"
      border="1px solid"
      borderColor="gray.100"
    >
      {/* ORDER HEADER */}
      <Flex
        justify="space-between"
        align="center"
        mb="20px"
        flexWrap="wrap"
        gap="10px"
      >
        <Text fontSize="14px" color="gray.600" fontWeight="500">
          Ordered on <b>{date}</b> at {time}
        </Text>

        <Badge
          colorScheme={
            order.orderStatus === "CONFIRMED"
              ? "green"
              : order.orderStatus === "SHIPPED"
              ? "blue"
              : order.orderStatus === "DELIVERED"
              ? "green"
              : "gray"
          }
          px="12px"
          py="4px"
          borderRadius="full"
          fontSize="11px"
          letterSpacing="0.5px"
        >
          {order.orderStatus}
        </Badge>
      </Flex>

      {/* ITEMS */}
      {order.cartProducts.map((item, idx) => (
        <OrderItemCard key={idx} {...item} />
      ))}

      <Divider my="20px" />

      {/* META SECTION */}
      <Box
        display="grid"
        gap="16px"
        gridTemplateColumns={{ base: "1fr", md: "1.2fr 1.5fr 1fr" }}
      >
        <OrderSummaryCard orderSummary={order.orderSummary} />
        <OrderShippingCard {...order.shippingDetails} />
        <OrderActions logistics={order.logistics} />
      </Box>
    </Box>
  );
};
