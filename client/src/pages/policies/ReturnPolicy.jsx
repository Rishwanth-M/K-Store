import { Box, Heading, Text, List, ListItem, Divider } from "@chakra-ui/react";

const ReturnPolicy = () => {
  return (
    <Box
      maxW="900px"
      mx="auto"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "30px", md: "50px" }}
    >
      {/* Page Title */}
      <Heading mb="10px">Return and Exchange Policy</Heading>

      {/* Static Date */}
      <Text fontSize="sm" color="gray.500" mb="30px">
        Last updated: 01 January 2026
      </Text>

      {/* Intro */}
      <Text mb="20px">
        This Return and Exchange Policy explains the conditions under which
        products purchased from <b>https://www.kreedentials.com</b> (the
        "Platform") may be returned or exchanged.
      </Text>

      <Text mb="20px">
        The Platform is owned and operated by <b>AVYAYPRATYAY SPORTS LLP</b>,
        having its registered office at Plot No. 10, 2nd Floor, Viman Nagar
        Colony, Secunderabad Viman Nagar Road, Hyderabad, Telangana, India.
      </Text>

      <Divider my="30px" />

      {/* Eligibility */}
      <Heading size="md" mb="15px">
        Eligibility for Return or Exchange
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          Return or exchange requests must be raised within <b>3 days</b> from
          the date of delivery.
        </ListItem>

        <ListItem>
          The product must be unused, unwashed, and in the same condition as
          received.
        </ListItem>

        <ListItem>
          The product must be returned in its original packaging along with all
          tags, labels, and accessories.
        </ListItem>

        <ListItem>
          Products purchased during sales, discounts, or promotional offers may
          not be eligible for return or exchange unless damaged or defective.
        </ListItem>

        <ListItem>
          Only products that are damaged, defective, or incorrect at the time
          of delivery are eligible for replacement.
        </ListItem>
      </List>

      <Divider my="30px" />

      {/* Exemptions */}
      <Heading size="md" mb="15px">
        Non-Returnable Products
      </Heading>

      <Text mb="20px">
        Certain products or categories may be non-returnable or non-exchangeable
        due to hygiene, customization, or other reasons. Such exclusions will be
        clearly communicated at the time of purchase.
      </Text>

      <Divider my="30px" />

      {/* Process */}
      <Heading size="md" mb="15px">
        Return and Exchange Process
      </Heading>

      <Text mb="20px">
        Once a return or exchange request is approved, the customer must ship
        the product back as per the instructions provided by our support team.
      </Text>

      <Text mb="20px">
        Upon receipt and inspection of the returned product, we will notify you
        regarding approval or rejection of the return or exchange request.
      </Text>

      <Text mb="20px">
        If approved, the exchange or refund (where applicable) will be processed
        in accordance with our <b>Refund and Cancellation Policy</b>.
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
        <b>Email:</b> support@kreedentials.com <br />
        <b>Business Name:</b> AVYAYPRATYAY SPORTS LLP <br />
        <b>Address:</b> Plot No. 10, 2nd Floor, Viman Nagar Colony, Secunderabad
        Viman Nagar Road, Hyderabad, Telangana, India
      </Text>
    </Box>
  );
};

export default ReturnPolicy;
