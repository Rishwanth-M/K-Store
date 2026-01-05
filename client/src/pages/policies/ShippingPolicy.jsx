import { Box, Heading, Text, List, ListItem, Divider } from "@chakra-ui/react";

const ShippingPolicy = () => {
  return (
    <Box
      maxW="900px"
      mx="auto"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "30px", md: "50px" }}
    >
      {/* Page Title */}
      <Heading mb="10px">Shipping Policy</Heading>

      {/* Static Date */}
      <Text fontSize="sm" color="gray.500" mb="30px">
        Last updated: 01 January 2026
      </Text>

      {/* Intro */}
      <Text mb="20px">
        This Shipping Policy outlines the terms and conditions governing the
        shipment and delivery of products purchased from{" "}
        <b>https://www.kreedentials.com</b> (the "Platform").
      </Text>

      <Text mb="20px">
        The Platform is owned and operated by <b>AVYAYPRATYAY SPORTS LLP</b>,
        having its registered office at Plot No. 10, 2nd Floor, Viman Nagar
        Colony, Secunderabad Viman Nagar Road, Hyderabad, Telangana, India.
      </Text>

      <Divider my="30px" />

      {/* Shipping Method */}
      <Heading size="md" mb="15px">
        Shipping Method
      </Heading>

      <Text mb="20px">
        Orders placed on the Platform are shipped through registered domestic
        courier companies and/or India Post (Speed Post) to ensure safe and
        reliable delivery.
      </Text>

      <Divider my="30px" />

      {/* Shipping Timeline */}
      <Heading size="md" mb="15px">
        Shipping Timeline
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          Orders are generally processed and shipped within <b>3 business
          days</b> from the date of order confirmation and successful payment.
        </ListItem>

        <ListItem>
          Estimated delivery timelines may vary depending on the shipping
          address, courier partner, and external factors beyond our control.
        </ListItem>

        <ListItem>
          The Platform Owner shall not be held liable for delays caused by
          courier partners, postal authorities, natural events, or unforeseen
          circumstances.
        </ListItem>
      </List>

      <Divider my="30px" />

      {/* Delivery Info */}
      <Heading size="md" mb="15px">
        Delivery Information
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          Products will be delivered to the shipping address provided by the
          customer at the time of placing the order.
        </ListItem>

        <ListItem>
          Shipment confirmation and tracking details (if available) will be
          shared via the registered email address.
        </ListItem>

        <ListItem>
          Customers are responsible for ensuring that the provided delivery
          address is accurate and complete.
        </ListItem>
      </List>

      <Divider my="30px" />

      {/* Shipping Charges */}
      <Heading size="md" mb="15px">
        Shipping Charges
      </Heading>

      <Text mb="20px">
        Shipping charges, if applicable, will be clearly displayed at the time
        of checkout. Any shipping fees paid are <b>non-refundable</b>, except as
        required under applicable law or explicitly stated otherwise.
      </Text>

      <Divider my="30px" />

      {/* Refund Reference */}
      <Heading size="md" mb="15px">
        Returns and Refunds
      </Heading>

      <Text mb="20px">
        Any returns, cancellations, or refunds related to shipped products are
        governed by our <b>Refund and Cancellation Policy</b>, available on the
        Platform.
      </Text>

      <Divider my="30px" />

      {/* Contact */}
      <Heading size="md" mb="15px">
        Contact Information
      </Heading>

      <Text>
        For any questions, concerns, or assistance related to shipping or
        delivery, please contact us using the details below:
      </Text>

      <Text mt="10px">
        <b>Email:</b> support@kreedentials.com <br />
        <b>Business Name:</b> AVYAYPRATYAY SPORTS LLP <br />
        <b>Address:</b> Plot No. 10, 2nd Floor, Viman Nagar Colony, Secunderabad
        Viman Nagar Road, Hyderabad, Telangana, India
      </Text>
    </Box>
  );
};

export default ShippingPolicy;
