import { Box, Button, Text } from "@chakra-ui/react";

export const OrderActions = ({ logistics }) => {
  return (
    <Box bg="white" borderRadius="14px" p="20px" boxShadow="sm">
      <Text fontWeight="600" mb="10px">
        Order Actions
      </Text>

      {logistics?.awbNumber ? (
        <Button colorScheme="blue" w="100%">
          Track Order (Blue Dart)
        </Button>
      ) : (
        <Text fontSize="13px" color="gray.500">
          Shipment will be created shortly
        </Text>
      )}
    </Box>
  );
};
