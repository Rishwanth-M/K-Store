import { Box, Text, Stack } from "@chakra-ui/react";
import { checkoutTheme } from "./checkout.theme";

export const AddressSection = ({ children }) => {
  return (
    <Box
      bg={checkoutTheme.cardBg}
      border="1px solid"
      borderColor={checkoutTheme.border}
      borderRadius="18px"
      p={{ base: "20px", md: "28px" }}
      boxShadow={checkoutTheme.shadow}
    >
      {/* Section Header */}
      <Box mb="6">
        <Text fontSize="20px" fontWeight="600">
          Shipping Address
        </Text>
        <Text fontSize="14px" color={checkoutTheme.subText} mt="1">
          Delivered via Blue Dart Express
        </Text>
      </Box>

      {/* Content */}
      <Stack spacing="6">
        {children}
      </Stack>
    </Box>
  );
};
