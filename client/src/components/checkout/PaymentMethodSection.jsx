import {
  Box,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export const PaymentMethodSection = ({ value, onChange }) => {
  const bg = useColorModeValue("gray.50", "#020617");
  const border = useColorModeValue("#e2e8f0", "#1e293b");
  const subText = useColorModeValue("gray.500", "gray.400");

  return (
    <Box
      mt="8"
      p="20px"
      bg={bg}
      border="1px solid"
      borderColor={border}
      borderRadius="14px"
    >
      <Text fontSize="18px" fontWeight="600" mb="2">
        Payment Method
      </Text>

      <Text fontSize="14px" color={subText} mb="5">
        Choose how you’d like to pay for this order
      </Text>

      <RadioGroup value={value} onChange={onChange}>
        <Stack spacing="5">
          {/* PHONEPE (DISABLED) */}
          <Box opacity={0.6}>
            <Radio value="PHONEPE" isDisabled>
              <Text fontWeight="500">Pay Now (PhonePe)</Text>
              <Text fontSize="13px" color={subText} ml="6">
                Online payments will be available soon
              </Text>
            </Radio>
          </Box>

          {/* COD */}
          <Box>
            <Radio value="COD" colorScheme="green">
              <Text fontWeight="500">Cash on Delivery</Text>
              <Text fontSize="13px" color={subText} ml="6">
                Pay when your order is delivered
              </Text>
            </Radio>
          </Box>
        </Stack>
      </RadioGroup>
    </Box>
  );
};
