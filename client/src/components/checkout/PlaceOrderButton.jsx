import { Button } from "@chakra-ui/react";

export const PlaceOrderButton = ({ onClick, paymentMethod }) => {
  const isPhonePe = paymentMethod === "PHONEPE";

  return (
    <Button
      mt="6"
      w="100%"
      h="56px"
      borderRadius="30px"
      fontSize="16px"
      fontWeight="600"
      colorScheme={isPhonePe ? "gray" : "green"}
      isDisabled={isPhonePe}
      onClick={onClick}
    >
      {isPhonePe ? "Pay Now (PhonePe)" : "Place Order"}
    </Button>
  );
};
