import {
  Box,
  Flex,
  Input,
  Text,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";

export const CheckoutForm = ({ form, onChange }) => {
  const inputBg = useColorModeValue("white", "#020617");
  const helperText = useColorModeValue("gray.500", "gray.400");

  return (
    <Box>
      {/* ================= ADDRESS FIELDS ================= */}
      <Flex direction="column" gap="16px">
        <Flex gap="16px" flexDir={{ base: "column", md: "row" }}>
          <Input
            name="firstName"
            placeholder="First Name*"
            value={form.firstName}
            onChange={onChange}
            bg={inputBg}
          />

          <Input
            name="lastName"
            placeholder="Last Name*"
            value={form.lastName}
            onChange={onChange}
            bg={inputBg}
          />
        </Flex>

        <Input
          name="addressLine1"
          placeholder="House No, Street, Area*"
          value={form.addressLine1}
          onChange={onChange}
          bg={inputBg}
        />

        <Input
          name="addressLine2"
          placeholder="Landmark (optional)"
          value={form.addressLine2}
          onChange={onChange}
          bg={inputBg}
        />

        <Flex gap="16px" flexDir={{ base: "column", md: "row" }}>
          <Input
            name="locality"
            placeholder="City / Locality*"
            value={form.locality}
            onChange={onChange}
            bg={inputBg}
          />

          <Input
            name="pinCode"
            placeholder="Pin Code*"
            value={form.pinCode}
            onChange={onChange}
            bg={inputBg}
          />
        </Flex>

        <Flex gap="16px" flexDir={{ base: "column", md: "row" }}>
          <Input
            name="state"
            placeholder="State / Territory*"
            value={form.state}
            onChange={onChange}
            bg={inputBg}
          />

          <Input
            name="country"
            placeholder="Country*"
            value={form.country}
            onChange={onChange}
            bg={inputBg}
          />
        </Flex>
      </Flex>

      {/* ================= CONTACT ================= */}
      <Divider my="8" />

      <Box>
        <Text fontSize="16px" fontWeight="600" mb="1">
          Contact Information
        </Text>
        <Text fontSize="13px" color={helperText} mb="4">
          Used by the courier partner for delivery updates
        </Text>

        <Flex direction="column" gap="16px">
          <Input
            name="email"
            placeholder="Email Address*"
            value={form.email}
            onChange={onChange}
            bg={inputBg}
          />

          <Input
            name="mobile"
            placeholder="Mobile Number*"
            value={form.mobile}
            onChange={onChange}
            bg={inputBg}
          />
        </Flex>
      </Box>
    </Box>
  );
};
