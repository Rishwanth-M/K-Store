import { Box, Heading, Text, List, ListItem, Divider } from "@chakra-ui/react";

const RefundPolicy = () => {
  return (
    <Box
      maxW="900px"
      mx="auto"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "30px", md: "50px" }}
    >
      <Heading mb="10px">Refund and Cancellation Policy</Heading>

      <Text fontSize="sm" color="gray.500" mb="30px">
        Last updated: 01 January 2026
      </Text>

      <Text mb="20px">
        This Refund and Cancellation Policy (“Policy”) governs the terms under
        which refunds, cancellations, and replacements may be requested for
        products purchased from <b>https://www.kreedentials.com</b> (“Website”).
      </Text>

      <Text mb="20px">
        The Website is owned and operated by <b>AVYAYPRATYAY SPORTS LLP</b>,
        having its registered office at Plot No. 10, 2nd Floor, Viman Nagar
        Colony, Secunderabad Viman Nagar Road, Hyderabad, Telangana, India –
        500016.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Cancellation Policy
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          Orders may be cancelled within <b>5 (five) days</b> from the date of
          order placement, provided the order has not been shipped.
        </ListItem>
        <ListItem>
          Orders that have been shipped or are out for delivery cannot be
          cancelled.
        </ListItem>
        <ListItem>
          Customized, made-to-order, or personalized products are not eligible
          for cancellation once the order is confirmed.
        </ListItem>
      </List>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Refund and Replacement Policy
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          Refunds or replacements are applicable only if the product delivered
          is damaged, defective, or materially different from the description
          provided on the Website.
        </ListItem>
        <ListItem>
          Issues must be reported within <b>5 (five) days</b> of delivery along
          with photographic or video evidence.
        </ListItem>
        <ListItem>
          All requests are subject to verification and approval by
          AVYAYPRATYAY SPORTS LLP.
        </ListItem>
        <ListItem>
          Approved refunds will be processed to the <b>original mode of
          payment</b>.
        </ListItem>
      </List>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Refund Processing Timeline
      </Heading>

      <Text mb="20px">
        Approved refunds shall be initiated within{" "}
        <b>3 (three) business days</b>. The time taken for the amount to reflect
        may vary depending on the payment method or issuing bank.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Payment Gateway Handling
      </Heading>

      <Text mb="20px">
        Payments are processed through secure third-party payment gateways.
        AVYAYPRATYAY SPORTS LLP does not store or process sensitive payment
        information such as card details, CVV, or UPI credentials.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Governing Law and Jurisdiction
      </Heading>

      <Text mb="20px">
        This Policy shall be governed by and construed in accordance with the
        laws of India. Any disputes shall be subject to the exclusive
        jurisdiction of courts in Hyderabad, Telangana.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Contact and Grievance Redressal
      </Heading>

      <Text mb="10px">
        For any queries, concerns, or grievances related to refunds or
        cancellations, customers may contact:
      </Text>

      <Text>
        <b>Email:</b> amangoyal@kreedentials.com <br />
        <b>Phone:</b> +91 7330645588 <br />
        <b>Business Name:</b> AVYAYPRATYAY SPORTS LLP <br />
        <b>Address:</b> Plot No. 10, 2nd Floor, Viman Nagar Colony, Secunderabad
        Viman Nagar Road, Hyderabad, Telangana, India – 500016 <br />
        <b>Working Hours:</b> Monday – Friday (09:00 – 18:00 IST)
      </Text>
    </Box>
  );
};

export default RefundPolicy;
