import { Box, Heading, Text, List, ListItem, Divider } from "@chakra-ui/react";

const RefundPolicy = () => {
  return (
    <Box
      maxW="900px"
      mx="auto"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "30px", md: "50px" }}
    >
      {/* Title */}
      <Heading mb="10px">Refund and Cancellation Policy</Heading>

      {/* Last Updated */}
      <Text fontSize="sm" color="gray.500" mb="30px">
        Last updated: 01 January 2026
      </Text>

      {/* Introduction */}
      <Text mb="20px">
        This Cancellation and Refund Policy outlines how you can cancel an order
        or seek a refund for products purchased through{" "}
        <b>https://www.kreedentials.com</b> (the “Website”).
      </Text>

      <Text mb="20px">
        The Website is owned and operated by <b>AVYAYPRATYAY SPORTS LLP</b>, having
        its registered office at Plot No. 10, 2nd Floor, Viman Nagar Colony,
        Secunderabad Viman Nagar Road, Hyderabad, Telangana, India – 500016.
      </Text>

      <Divider my="30px" />

      {/* Cancellation */}
      <Heading size="md" mb="15px">
        Cancellation Policy
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          Cancellation requests will be considered only if the request is made
          within <b>5 (five) days</b> of placing the order.
        </ListItem>

        <ListItem>
          Cancellation requests may not be entertained if the order has already
          been communicated to the seller or merchant and the shipping process
          has been initiated, or if the product is out for delivery.
        </ListItem>

        <ListItem>
          In such cases, customers may choose to reject the product at the time
          of delivery, subject to verification and seller policies.
        </ListItem>

        <ListItem>
          Customized, made-to-order, or personalized products are not eligible
          for cancellation once the order has been confirmed.
        </ListItem>
      </List>

      <Divider my="30px" />

      {/* Refunds */}
      <Heading size="md" mb="15px">
        Refunds and Replacements
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          In case of receipt of damaged or defective products, customers must
          report the issue to our customer support team within{" "}
          <b>5 (five) days</b> of receiving the product.
        </ListItem>

        <ListItem>
          Refund or replacement requests will be entertained only after the
          seller or merchant listed on the Platform has verified and confirmed
          the issue at their end.
        </ListItem>

        <ListItem>
          If the product received is materially different from what is shown on
          the Website or does not match the description, the customer must notify
          customer support within <b>5 (five) days</b> of receipt.
        </ListItem>

        <ListItem>
          The customer support team will review the complaint and take an
          appropriate decision based on verification.
        </ListItem>
      </List>

      <Divider my="30px" />

      {/* Warranty */}
      <Heading size="md" mb="15px">
        Manufacturer Warranty
      </Heading>

      <Text mb="20px">
        For products that are covered under a manufacturer’s warranty,
        customers are advised to directly contact the manufacturer in accordance
        with their warranty terms.
      </Text>

      <Divider my="30px" />

      {/* Refund Timeline */}
      <Heading size="md" mb="15px">
        Refund Processing Timeline
      </Heading>

      <Text mb="20px">
        In case of any refunds approved by <b>AVYAYPRATYAY SPORTS LLP</b>, the
        refund shall be processed to the original mode of payment within{" "}
        <b>3 (three) business days</b> from the date of approval.
      </Text>

      <Text mb="20px">
        The time taken for the refund amount to reflect in the customer’s
        account may vary depending on the payment method, bank, or payment
        service provider.
      </Text>

      <Divider my="30px" />

      {/* Contact */}
      <Heading size="md" mb="15px">
        Contact Information
      </Heading>

      <Text mb="10px">
        For any questions, concerns, or assistance related to cancellations or
        refunds, customers may contact us using the details below:
      </Text>

      <Text>
        <b>Email:</b> amangoyal@kreedentials.com <br />
        <b>Phone:</b> +91 7330645588 <br />
        <b>Business Name:</b> AVYAYPRATYAY SPORTS LLP <br />
        <b>Address:</b> Plot No. 10, 2nd Floor, Viman Nagar Colony, Secunderabad
        Viman Nagar Road, Hyderabad, Telangana, India – 500016
      </Text>
    </Box>
  );
};

export default RefundPolicy;
