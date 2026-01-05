import { Box, Heading, Text, List, ListItem, Divider } from "@chakra-ui/react";

const RefundPolicy = () => {
  return (
    <Box
      maxW="900px"
      mx="auto"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "30px", md: "50px" }}
    >
      <Heading mb="10px">Refund & Cancellation Policy</Heading>

      <Text fontSize="sm" color="gray.500" mb="30px">
        Last updated: {new Date().toLocaleDateString()}
      </Text>

      <Text mb="20px">
        This refund and cancellation policy outlines how you can cancel or seek a
        refund for a product or service that you have purchased through the
        Platform. Under this policy:
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Cancellation Policy
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          Cancellation requests will only be considered if the request is made
          within <b>5 days</b> of placing the order.
        </ListItem>

        <ListItem>
          Cancellation requests may not be entertained if the order has already
          been communicated to the seller or merchant and the shipping process
          has been initiated or the product is out for delivery. In such cases,
          you may choose to reject the product at the time of delivery.
        </ListItem>

        <ListItem>
          AVYAYPRATYAY SPORTS LLP does not accept cancellation requests for
          perishable items such as flowers, eatables, or similar products.
        </ListItem>
      </List>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Refund & Replacement Policy
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          Refunds or replacements for perishable items may be considered only if
          the user establishes that the quality of the product delivered is not
          satisfactory.
        </ListItem>

        <ListItem>
          In case of damaged or defective items, please report the issue to our
          customer service team within <b>5 days</b> of receiving the product.
        </ListItem>

        <ListItem>
          The request will be processed only after the seller or merchant listed
          on the Platform verifies and confirms the issue at their end.
        </ListItem>

        <ListItem>
          If you believe that the product received is not as shown on the
          Platform or does not meet your expectations, you must notify our
          customer service team within <b>5 days</b> of delivery. After reviewing
          the complaint, an appropriate decision will be taken.
        </ListItem>
      </List>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Manufacturer Warranty
      </Heading>

      <Text mb="20px">
        For products that come with a manufacturer’s warranty, any complaints or
        issues should be addressed directly with the manufacturer in accordance
        with their warranty terms.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Refund Processing
      </Heading>

      <Text mb="20px">
        In case a refund is approved by AVYAYPRATYAY SPORTS LLP, the refund will
        be processed within <b>3 days</b> from the date of approval.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Contact
      </Heading>

      <Text>
        For any questions or concerns regarding refunds or cancellations, please
        contact our customer support team using the contact details provided on
        this website.
      </Text>
    </Box>
  );
};

export default RefundPolicy;
