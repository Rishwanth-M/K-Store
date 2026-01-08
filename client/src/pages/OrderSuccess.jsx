import {
  Box,
  Button,
  Flex,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";

export const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const bg = useColorModeValue("white", "#020617");
  const border = useColorModeValue("#e2e8f0", "#1e293b");
  const subText = useColorModeValue("gray.600", "gray.400");

  return (
    <Flex
      minH="80vh"
      align="center"
      justify="center"
      px="20px"
    >
      <Box
        maxW="520px"
        w="100%"
        bg={bg}
        border="1px solid"
        borderColor={border}
        borderRadius="20px"
        p="40px"
        textAlign="center"
        boxShadow="0 20px 40px rgba(0,0,0,0.08)"
      >
        {/* SUCCESS ICON */}
        <Icon
          as={CheckCircleIcon}
          boxSize="60px"
          color="green.400"
          mb="4"
        />

        {/* TITLE */}
        <Text fontSize="22px" fontWeight="600">
          Order Placed Successfully 🎉
        </Text>

        <Text fontSize="14px" color={subText} mt="2">
          Thank you for your purchase. Your order has been confirmed.
        </Text>

        {/* ORDER DETAILS */}
        <Box
          mt="6"
          p="4"
          bg={useColorModeValue("gray.50", "#020617")}
          borderRadius="12px"
          textAlign="left"
        >
          <Text fontSize="14px" mb="2">
  <strong>Order ID:</strong>{" "}
  <Text as="span" fontWeight="600">
    #{orderId?.slice(-6)}
  </Text>
</Text>

          <Text fontSize="14px" mb="2">
            <strong>Payment Method:</strong> Cash on Delivery
          </Text>
          <Text fontSize="14px">
            <strong>Delivery Partner:</strong> Blue Dart Express
          </Text>
        </Box>

        {/* INFO */}
        <Text fontSize="13px" color={subText} mt="4">
          Estimated delivery in <strong>3–5 business days</strong>.
          Our courier partner may contact you before delivery.
        </Text>

        {/* ACTION BUTTONS */}
        <Flex gap="4" mt="8" direction={{ base: "column", sm: "row" }}>
          <Button
            w="100%"
            colorScheme="green"
            onClick={() => navigate("/orders")}
          >
            Go to My Orders
          </Button>

          <Button
            w="100%"
            variant="outline"
            onClick={() => {
              // Placeholder for future tracking
              navigate("/orders");
            }}
          >
            Track Shipment
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
