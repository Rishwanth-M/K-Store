import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { BagItems } from "../../components/cart/BagItems";
import { OrderSummary } from "../../components/cart/OrderSummary";

export const Cart = () => {
  const token = useSelector((state) => state.authReducer.token);
  const cartItems = useSelector(
    (state) => state.cartReducer?.cart || []
  );

  /* 🔒 AUTH GUARD */
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  /* 🛒 EMPTY CART GUARD */
  if (!cartItems.length) {
    return <Navigate to="/allProducts" replace />;
  }

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
