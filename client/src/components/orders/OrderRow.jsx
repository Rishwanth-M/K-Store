import {
  Box,
  Flex,
  Image,
  Text,
  Badge,
  Button,
} from "@chakra-ui/react";
import noImage from "../../assets/no-image.png";
import { numberWithCommas } from "../../utils/extraFunctions";

export const OrderRow = ({
  order,
  onOpen,
  onRetry,
}) => {
  const firstProduct = order.cartProducts?.[0];
  const image =
    firstProduct?.images?.[0] || noImage;

  const status = order.paymentDetails?.paymentStatus;

  const statusColor =
    status === "SUCCESS"
      ? "green"
      : status === "FAILED"
      ? "red"
      : "orange";

  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="14px"
      p="16px"
      mb="16px"
      bg="white"
    >
      <Flex
        gap="16px"
        align="center"
        justify="space-between"
        flexWrap="wrap"
      >
        {/* LEFT */}
        <Flex gap="14px" align="center">
          <Image
            src={image}
            w="80px"
            h="80px"
            objectFit="cover"
            borderRadius="10px"
          />

          <Box>
            <Text fontWeight={600}>
              {firstProduct?.name || "Order"}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {order.cartProducts.length} item(s)
            </Text>

            <Text fontWeight={600} mt="4px">
              ₹{numberWithCommas(order.orderSummary.total)}
            </Text>
          </Box>
        </Flex>

        {/* RIGHT */}
        <Flex gap="12px" align="center">
          <Badge
            colorScheme={statusColor}
            px="10px"
            py="4px"
            borderRadius="full"
          >
            {status}
          </Badge>

          <Button size="sm" onClick={onOpen}>
            View Details
          </Button>

          {status === "FAILED" && (
            <Button
              size="sm"
              colorScheme="red"
              onClick={onRetry}
            >
              Retry
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
