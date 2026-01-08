import { Box, Grid } from "@chakra-ui/react";
import { checkoutTheme } from "./checkout.theme";

export const CheckoutLayout = ({ left, right }) => {
  return (
    <Box bg={checkoutTheme.pageBg} minH="100vh" py="40px">
      <Grid
        maxW="1200px"
        mx="auto"
        px="20px"
        templateColumns={{ base: "1fr", md: "2fr 1fr" }}
        gap="40px"
        alignItems="start"
      >
        {left}
        {right}
      </Grid>
    </Box>
  );
};
