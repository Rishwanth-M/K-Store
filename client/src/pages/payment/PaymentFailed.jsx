import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <Box p="40px" textAlign="center">
      <Text fontSize="24px" fontWeight="bold" color="red.500">
        ❌ Payment Failed
      </Text>
      <Text mt="2">
        Your payment was not successful. Please try again.
      </Text>

      <Button mt="6" colorScheme="teal" onClick={() => navigate("/cart")}>
        Go back to Cart
      </Button>
    </Box>
  );
};
