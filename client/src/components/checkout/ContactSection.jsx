import { Box, Text } from "@chakra-ui/react";
import { checkoutTheme } from "./checkout.theme";

export const ContactSection = ({ children }) => {
  return (
    <Box mt="8">
      <Text fontSize="18px" fontWeight="600" mb="2">
        Contact Information
      </Text>
      <Text fontSize="14px" color={checkoutTheme.subText} mb="4">
        Courier may contact you for delivery updates
      </Text>
      {children}
    </Box>
  );
};
