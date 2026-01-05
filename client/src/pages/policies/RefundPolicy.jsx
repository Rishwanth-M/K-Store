import { Box, Heading, Text, List, ListItem, Divider } from "@chakra-ui/react";

const RefundPolicy = () => {
  return (
    <Box
      maxW="900px"
      mx="auto"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "30px", md: "50px" }}
    >
      {/* Page Title */}
      <Heading mb="10px">Refund and Cancellation Policy</Heading>

      {/* Static Date */}
      <Text fontSize="sm" color="gray.500" mb="30px">
        Last updated: 01 January 2026
      </Text>

      {/* Intro */}
      <Text mb="20px">
        This Refund and Cancellation Policy governs the circumstances under which
        refunds, returns, or cancellations may be requested for products or
        services purchased through <b>https://www.kreedentials.com</b> (the
        "Platform").
      </Text>

      <Text mb="20px">
        The Platform is owned and operated by <b>AVYAYPRATYAY SPORTS LLP</b>,
        having its registered office at Plot No. 10, 2nd Floor, Viman Nagar
        Colony, Secunderabad Viman Nagar Road, Hyderabad, Telangana, India.
      </Text>

      <Divider my="30px" />

      {/* Cancellation */}
      <Heading size="md" mb="15px">
        Cancellation Policy
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          Cancellation requests will be accepted only if raised within{" "}
          <b>5 days</b> of placing the order.
        </ListItem>

        <ListItem>
          Cancellation requests may not be entertained if the order has already
          been processed, shipped, or is out for delivery. In such cases,
          customers may choose to reject the shipment at the time of delivery,
          subject to seller policies.
        </ListItem>

        <ListItem>
          Orders for perishable goods or customized products are not eligible
          for cancellation once confirmed.
        </ListItem>
      </List>

      <Divider my="30px" />

      {/* Refunds */}
      <Heading size="md" mb="15px">
        Refund and Replacement Policy
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          Refunds or replacements will be considered only in cases where the
          product received is damaged, defective, or materially different from
          the description provided on the Platform.
        </ListItem>

        <ListItem>
          Any such issues must be reported within <b>5 days</b> of receiving the
          product, along with supporting evidence such as images or videos.
        </ListItem>

        <ListItem>
          All refund or replacement requests are subject to verification and
          approval by the seller or merchant associated with the order.
        </ListItem>

        <ListItem>
          If approved, refunds will be processed to the original payment method
          used at the time of purchase.
        </ListItem>
      </List>

      <Divider my="30px" />

      {/* Warranty */}
      <Heading size="md" mb="15px">
        Manufacturer Warranty
      </Heading>

      <Text mb="20px">
        Products that are covered under a manufacturer’s warranty must be
        handled directly by the manufacturer in accordance with their warranty
        terms. The Platform Owner does not provide independent warranties unless
        explicitly stated.
      </Text>

      <Divider my="30px" />

      {/* Refund Processing */}
      <Heading size="md" mb="15px">
        Refund Processing Timeline
      </Heading>

      <Text mb="20px">
        Once a refund request is approved, the refund will be initiated within{" "}
        <b>3 business days</b>. The time taken for the refund to reflect in the
        customer’s account may vary depending on the payment method and the
        policies of the respective payment service provider.
      </Text>

      <Divider my="30px" />

      {/* Payment Gateways */}
      <Heading size="md" mb="15px">
        Payment Gateway Handling
      </Heading>

      <Text mb="20px">
        All payments on the Platform are processed through secure and authorized
        third-party payment gateways. The Platform does not store or process
        sensitive payment information such as card details or UPI credentials.
      </Text>

      <Divider my="30px" />

      {/* Contact */}
      <Heading size="md" mb="15px">
        Contact Information
      </Heading>

      <Text mb="10px">
        For any questions, concerns, or assistance related to refunds or
        cancellations, please contact us using the details below:
      </Text>

      <Text>
        <b>Email:</b> support@kreedentials.com <br />
        <b>Business Name:</b> AVYAYPRATYAY SPORTS LLP <br />
        <b>Address:</b> Plot No. 10, 2nd Floor, Viman Nagar Colony, Secunderabad
        Viman Nagar Road, Hyderabad, Telangana, India
      </Text>
    </Box>
  );
};

export default RefundPolicy;
