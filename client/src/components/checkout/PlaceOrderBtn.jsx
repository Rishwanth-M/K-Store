import { Input } from "@chakra-ui/react";

export const PlaceOrderBtn = ({ onClick, isDisabled = false }) => {
  return (
    <Input
      as="button"
      type="submit"
      onClick={onClick}
      isDisabled={isDisabled}
      h="60px"
      bg="#edf2f7"
      color="black"
      border="1px solid #cecdce"
      borderRadius="50px"
      w="100%"
      fontSize="17px"
      mt="20px"
      cursor="pointer"
      _hover={{ borderColor: "black" }}
      _disabled={{
        opacity: 0.6,
        cursor: "not-allowed",
      }}
      value="Place Order (Cash on Delivery)"
    />
  );
};
