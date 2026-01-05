import { Box, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setToast } from "../../utils/extraFunctions";
import { CheckoutBtn } from "./CheckoutBtn";
import { OrderSummaryDataSection } from "./OrderSummaryDataSection";

export const OrderSummary = () => {
  const orderSummary = useSelector(
    (state) => state.cartReducer.orderSummary
  );

  const token = useSelector(
    (state) => state.authReducer.token
  );

  const toast = useToast();
  const navigate = useNavigate();

  /* ================= CHECKOUT ================= */
  const handleMemberCheckout = () => {
    if (!token) {
      setToast(toast, "Please login first", "error");
      return navigate("/auth");
    }

    if (!orderSummary || orderSummary.quantity === 0) {
      return setToast(
        toast,
        "Please add some products in the cart",
        "error"
      );
    }

    navigate("/checkout");
  };

  return (
    <Box>
      {/* SUMMARY */}
      <OrderSummaryDataSection {...orderSummary} />

      {/* CHECKOUT */}
      <CheckoutBtn
        onClick={handleMemberCheckout}
        name="Proceed to Checkout"
        bgColor="black"
        color="white"
        hoverBg="#1e1e1e"
        borderColor="transparent"
      />
    </Box>
  );
};
