import { Box, Heading, Text, List, ListItem, Divider } from "@chakra-ui/react";

const ReturnPolicy = () => {
  return (
    <Box
      maxW="900px"
      mx="auto"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "30px", md: "50px" }}
    >
      <Heading mb="10px">Return & Exchange Policy</Heading>

      <Text fontSize="sm" color="gray.500" mb="30px">
        Last updated: {new Date().toLocaleDateString()}
      </Text>

      <Text mb="20px">
        We offer refunds or exchanges within the first <b>3 days</b> from the
        date of your purchase. If more than 3 days have passed since your
        purchase, you will not be eligible for a return, exchange, or refund of
        any kind.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Eligibility for Return or Exchange
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          The item must be unused and in the same condition as it was received.
        </ListItem>

        <ListItem>
          The item must be returned in its original packaging.
        </ListItem>

        <ListItem>
          Items purchased during a sale or promotional offer may not be eligible
          for return or exchange.
        </ListItem>

        <ListItem>
          Only items found to be defective or damaged will be considered for
          replacement based on an approved exchange request.
        </ListItem>
      </List>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Exempted Products
      </Heading>

      <Text mb="20px">
        Certain categories of products may be exempt from returns or refunds.
        Such categories will be clearly communicated to you at the time of
        purchase.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Return & Exchange Process
      </Heading>

      <Text mb="20px">
        Once your return or exchange request is accepted, and the returned item
        is received and inspected by us, we will notify you via email regarding
        the receipt of the product.
      </Text>

      <Text mb="20px">
        If the returned product passes the quality check, your return or exchange
        request will be processed in accordance with our policies.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Contact
      </Heading>

      <Text>
        For any questions or concerns related to returns or exchanges, please
        contact our customer support team using the contact information provided
        on this website.
      </Text>
    </Box>
  );
};

export default ReturnPolicy;
