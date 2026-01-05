import { Box, Heading, Text, List, ListItem, Divider } from "@chakra-ui/react";

const ShippingPolicy = () => {
  return (
    <Box
      maxW="900px"
      mx="auto"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "30px", md: "50px" }}
    >
      <Heading mb="10px">Shipping Policy</Heading>

      <Text fontSize="sm" color="gray.500" mb="30px">
        Last updated: {new Date().toLocaleDateString()}
      </Text>

      <Text mb="20px">
        Orders placed on the Platform are shipped through registered domestic
        courier companies and/or speed post only.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Shipping Timeline
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          Orders are generally shipped within <b>3 days</b> from the date of
          order and/or payment.
        </ListItem>

        <ListItem>
          Shipping timelines may vary based on the delivery date agreed upon at
          the time of order confirmation and are subject to courier company or
          postal authority norms.
        </ListItem>

        <ListItem>
          The Platform Owner shall not be liable for any delays in delivery
          caused by the courier company or postal authority.
        </ListItem>
      </List>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Delivery Information
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          All orders will be delivered to the address provided by the buyer at
          the time of purchase.
        </ListItem>

        <ListItem>
          Delivery of services and shipment confirmation will be sent to the
          registered email ID provided during account registration.
        </ListItem>
      </List>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Shipping Charges
      </Heading>

      <Text mb="20px">
        If any shipping charges are levied by the seller or the Platform Owner,
        such charges shall be <b>non-refundable</b>.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Contact
      </Heading>

      <Text>
        For any questions or concerns related to shipping or delivery, please
        contact our customer support team using the contact details provided on
        this website.
      </Text>
    </Box>
  );
};

export default ShippingPolicy;
