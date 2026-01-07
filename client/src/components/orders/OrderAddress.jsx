import { Box, Divider, Text, VStack } from "@chakra-ui/react";

export const OrderAddress = ({
  firstName,
  lastName,
  email,
  mobile,
  addressLine1,
  addressLine2,
  locality,
  state,
  pinCode,
  country,
}) => {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="12px"
      p="20px"
    >
      <Text fontSize="lg" fontWeight={600}>
        Shipping Address
      </Text>

      <Divider my="12px" />

      <VStack align="start" spacing="6px" fontSize="sm">
        <Text fontWeight={600}>
          {firstName} {lastName}
        </Text>
        <Text>+91 {mobile}</Text>
        <Text>{email}</Text>

        <Divider my="8px" />

        <Text>{addressLine1}</Text>
        {addressLine2 && <Text>{addressLine2}</Text>}
        <Text>
          {locality}, {state} - {pinCode}
        </Text>
        <Text>{country}</Text>
      </VStack>
    </Box>
  );
};
