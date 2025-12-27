import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const txnId = params.get("txn");

  return (
    <Box
      minH="70vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="20px"
    >
      <Text fontSize="28px" fontWeight={600} color="green.500">
        Payment Successful 🎉
      </Text>

      <Text fontSize="16px">
        Transaction ID:
      </Text>

      <Text fontWeight={600}>
        {txnId}
      </Text>

      <Button colorScheme="teal" onClick={() => navigate("/orders")}>
        View My Orders
      </Button>

      <Button variant="outline" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
  );
};
