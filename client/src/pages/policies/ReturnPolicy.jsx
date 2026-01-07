import { Box, Heading, Text, List, ListItem, Divider } from "@chakra-ui/react";

const ReturnPolicy = () => {
  return (
    <Box
      maxW="900px"
      mx="auto"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "30px", md: "50px" }}
    >
      {/* Title */}
      <Heading mb="10px">Return and Exchange Policy</Heading>

      {/* Last Updated */}
      <Text fontSize="sm" color="gray.500" mb="30px">
        Last updated: 01 January 2026
      </Text>

      {/* Introduction */}
      <Text mb="20px">
        This Return and Exchange Policy explains the conditions under which
        products purchased from <b>https://www.kreedentials.com</b> (the
        “Website”) may be returned or exchanged.
      </Text>

      <Text mb="20px">
        The Website is owned and operated by <b>AVYAYPRATYAY SPORTS LLP</b>, having
        its registered office at Plot No. 10, 2nd Floor, Viman Nagar Colony,
        Secunderabad Viman Nagar Road, Hyderabad, Telangana, India – 500016.
      </Text>

      <Divider my="30px" />

      {/* Eligibility */}
      <Heading size="md" mb="15px">
        Eligibility for Return or Exchange
      </Heading>

      <Text mb="20px">
        We offer return or exchange within the first <b>5 (five) days</b> from
        the date of purchase. If <b>5 (five) days</b> have passed since your
        purchase, you will not be eligible for a return, exchange, or refund of
        any kind.
      </Text>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          The item must be unused and in the same condition as received.
        </ListItem>

        <ListItem>
          The item must be returned in its original packaging along with all
          tags, labels, and accessories.
        </ListItem>

        <ListItem>
          Products purchased during sales, discounts, or promotional offers may
          not be eligible for return or exchange.
        </ListItem>

        <ListItem>
          Only products found to be defective or damaged are eligible for
          replacement.
        </ListItem>
      </List>

      <Divider my="30px" />

      {/* Request Process */}
      <Heading size="md" mb="15px">
        Return or Exchange Request Process
      </Heading>

      <Text mb="20px">
        To place a return or exchange request for an eligible product, customers
        must send an email request to <b>amangoyal@kreedentials.com</b> within{" "}
        <b>5 (five) days</b> of receiving the product.
      </Text>

      <Text mb="20px">
        Certain categories of products may be exempt from returns or exchanges
        due to hygiene, customization, or other reasons. Such exclusions will be
        clearly communicated at the time of purchase.
      </Text>

      <Divider my="30px" />

      {/* Inspection */}
      <Heading size="md" mb="15px">
        Inspection and Approval
      </Heading>

      <Text mb="20px">
        Once your returned or exchanged product is received, it will be inspected
        by our team. You will be notified via email regarding the receipt and
        status of your return or exchange request.
      </Text>

      <Text mb="20px">
        If the product passes the quality check and is approved, the return or
        exchange request will be processed in accordance with our applicable
        policies.
      </Text>

      <Divider my="30px" />

      {/* Reference */}
      <Heading size="md" mb="15px">
        Refund Reference
      </Heading>

      <Text mb="20px">
        Any refunds, where applicable, will be processed as per our{" "}
        <b>Refund and Cancellation Policy</b>, available on the Website.
      </Text>

      <Divider my="30px" />

      {/* Contact */}
      <Heading size="md" mb="15px">
        Contact Information
      </Heading>

      <Text mb="10px">
        For any questions, concerns, or assistance related to returns or
        exchanges, please contact us using the details below:
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

export default ReturnPolicy;
