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
        This Return and Exchange Policy (“Policy”) describes the conditions under
        which products purchased from <b>https://www.kreedentials.com</b>
        (“Website”) may be returned or exchanged.
      </Text>

      <Text mb="20px">
        The Website is owned and operated by <b>AVYAYPRATYAY SPORTS LLP</b>,
        having its registered office at Plot No. 10, 2nd Floor, Viman Nagar
        Colony, Secunderabad Viman Nagar Road, Hyderabad, Telangana, India –
        500016.
      </Text>

      <Divider my="30px" />

      {/* Eligibility */}
      <Heading size="md" mb="15px">
        Eligibility for Return or Exchange
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          Customers may request a return or exchange within{" "}
          <b>3 (three) days</b> from the date of delivery.
        </ListItem>

        <ListItem>
          The product must be unused, unwashed, and in its original condition,
          with all tags, labels, and packaging intact.
        </ListItem>

        <ListItem>
          Only products that are damaged, defective, or incorrect at the time of
          delivery are eligible for return or replacement.
        </ListItem>

        <ListItem>
          Products purchased during sales, discounts, or promotional campaigns
          are not eligible for return or exchange unless received in a damaged
          or defective condition.
        </ListItem>
      </List>

      <Divider my="30px" />

      {/* Non-returnable */}
      <Heading size="md" mb="15px">
        Non-Returnable Products
      </Heading>

      <Text mb="20px">
        Certain products may be non-returnable or non-exchangeable due to hygiene
        reasons, customization, or other regulatory requirements. Such products
        shall be clearly marked as non-returnable at the time of purchase.
      </Text>

      <Divider my="30px" />

      {/* Process */}
      <Heading size="md" mb="15px">
        Return and Exchange Process
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          Customers must raise a return or exchange request by contacting our
          support team within the eligible time period.
        </ListItem>

        <ListItem>
          Once approved, customers will receive instructions for returning the
          product.
        </ListItem>

        <ListItem>
          Return shipping costs, if applicable, will be communicated at the time
          of approval.
        </ListItem>

        <ListItem>
          Upon receipt and inspection of the returned product, we will process
          the exchange or refund as applicable.
        </ListItem>

        <ListItem>
          Refunds, if approved, will be processed in accordance with our{" "}
          <b>Refund and Cancellation Policy</b>.
        </ListItem>
      </List>

      <Divider my="30px" />

      {/* Final */}
      <Heading size="md" mb="15px">
        Final Decision
      </Heading>

      <Text mb="20px">
        AVYAYPRATYAY SPORTS LLP reserves the right to approve or reject any return
        or exchange request based on verification and quality checks. The
        decision of the company shall be final and binding.
      </Text>

      <Divider my="30px" />

      {/* Contact */}
      <Heading size="md" mb="15px">
        Contact Information
      </Heading>

      <Text mb="10px">
        For any questions or assistance related to returns or exchanges, please
        contact us at:
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

export default ReturnPolicy;
