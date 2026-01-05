import {
  Box,
  Button,
  Center,
  Text,
} from "@chakra-ui/react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";

import { BagItems } from "../../components/cart/BagItems";
import { OrderSummary } from "../../components/cart/OrderSummary";
import { fetchCart } from "../../redux/features/cart/cart.api";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.authReducer.token);

  const cartItems =
    useSelector(
      (state) => state.cartReducer.cartProducts,
      shallowEqual
    ) || [];

  /* 🔒 AUTH GUARD */
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  /* 🔥 FETCH CART FROM DB ON LOAD */
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

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
