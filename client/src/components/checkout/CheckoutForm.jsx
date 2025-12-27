import { Box, Flex, Input, Text } from "@chakra-ui/react";

export const CheckoutForm = ({ form, onChange }) => {
  return (
    <Box mt="30px">
      <Text fontSize="20px" fontWeight={600} mb="20px">
        Enter your name and address
      </Text>

      <Flex direction="column" gap="20px">
        <Input
          name="firstName"
          placeholder="First Name*"
          value={form.firstName}
          onChange={onChange}
        />

        <Input
          name="lastName"
          placeholder="Last Name*"
          value={form.lastName}
          onChange={onChange}
        />

        <Input
          name="addressLine1"
          placeholder="Address Line 1*"
          value={form.addressLine1}
          onChange={onChange}
        />

        <Input
          name="addressLine2"
          placeholder="Address Line 2"
          value={form.addressLine2}
          onChange={onChange}
        />

        <Flex gap="20px">
          <Input
            name="locality"
            placeholder="City / Locality*"
            value={form.locality}
            onChange={onChange}
          />

          <Input
            name="pinCode"
            placeholder="Pin Code*"
            value={form.pinCode}
            onChange={onChange}
          />
        </Flex>

        <Flex gap="20px">
          <Input
            name="state"
            placeholder="State / Territory*"
            value={form.state}
            onChange={onChange}
          />

          <Input
            name="country"
            placeholder="Country*"
            value={form.country}
            onChange={onChange}
          />
        </Flex>

        <Text fontSize="20px" fontWeight={600} mt="30px">
          Contact Information
        </Text>

        <Input
          name="email"
          placeholder="Email*"
          value={form.email}
          onChange={onChange}
        />

        <Input
          name="mobile"
          placeholder="Mobile*"
          value={form.mobile}
          onChange={onChange}
        />
      </Flex>
    </Box>
  );
};
