import { Box, Text } from "@chakra-ui/react";

export const OrderShippingCard = ({
  firstName,
  lastName,
  mobile,
  email,
  addressLine1,
  addressLine2,
  locality,
  state,
  pinCode,
  country,
}) => {
  return (
    <Box bg="white" borderRadius="14px" p="20px" boxShadow="sm">
      <Text fontWeight="600" mb="10px">
        Shipping Address
      </Text>

      <Text fontSize="14px">
        {firstName} {lastName}
      </Text>
      <Text fontSize="13px" color="gray.600">
        {mobile}
      </Text>
      <Text fontSize="13px" color="gray.600">
        {email}
      </Text>

      <Text fontSize="13px" color="gray.600" mt="8px">
        {addressLine1}
        {addressLine2 && `, ${addressLine2}`}
        <br />
        {locality}, {state} - {pinCode}
        <br />
        {country}
      </Text>
    </Box>
  );
};
