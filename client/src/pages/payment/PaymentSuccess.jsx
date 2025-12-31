import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = useSelector((state) => state.authReducer.token);
  const txnId = params.get("txn");

  /* 🔒 AUTH GUARD */
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Box
      minH="70vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="20px"
      textAlign="center"
    >
      <Text fontSize="28px" fontWeight={600} color="green.500">
        Payment Successful 🎉
      </Text>

      {txnId ? (
        <>
          <Text fontSize="16px">Transaction ID:</Text>
          <Text fontWeight={600}>{txnId}</Text>
        </>
      ) : (
        <Text fontSize="16px" color="gray.500">
          Transaction reference not available
        </Text>
      )}

      <Button colorScheme="teal" onClick={() => navigate("/orders")}>
        View My Orders
      </Button>

      <Button variant="outline" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
  );
};
