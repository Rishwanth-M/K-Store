import {
  Box,
  Button,
  Center,
  Text,
} from "@chakra-ui/react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import { BagItems } from "../../components/cart/BagItems";
import { OrderSummary } from "../../components/cart/OrderSummary";

export const Cart = () => {
  const navigate = useNavigate();

  // ✅ TOKEN MUST BE DEFINED FIRST
  const token = useSelector((state) => state.authReducer.token);

  // ✅ MEMOIZED SELECTOR (NO WARNING)
  const cartItems =
    useSelector(
      (state) => state.cartReducer.cartProducts,
      shallowEqual
    ) || [];

  /* 🔒 AUTH GUARD */
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  /* 🛒 EMPTY CART UI */
  if (!cartItems.length) {
    return (
      <Center minH="60vh" flexDirection="column" gap="16px">
        <Text fontSize="22px" fontWeight="600">
          Your cart is empty 🛒
        </Text>

        <Text color="gray.500">
          Looks like you haven’t added anything yet.
        </Text>

        <Button
          mt="10px"
          bg="black"
          color="white"
          _hover={{ bg: "#1e1e1e" }}
          onClick={() => navigate("/allProducts")}
        >
          Continue Shopping
        </Button>
      </Center>
    );
  }

  /* 🛍 CART WITH ITEMS */
  return (
    <Box
      display="grid"
      gap={{ base: "40px", lg: "5%" }}
      my="30px"
      maxW="1200px"
      mx="auto"
      p="20px"
      gridTemplateColumns={{
        base: "100%",
        lg: "65% 30%",
      }}
    >
      <BagItems />
      <OrderSummary />
    </Box>
  );
};
