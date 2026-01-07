import { Box, Heading, Text, List, ListItem, Divider } from "@chakra-ui/react";

const ShippingPolicy = () => {
  return (
    <Box
      maxW="900px"
      mx="auto"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "30px", md: "50px" }}
    >
      {/* Title */}
      <Heading mb="10px">Shipping Policy</Heading>

      {/* Last Updated */}
      <Text fontSize="sm" color="gray.500" mb="30px">
        Last updated: 01 January 2026
      </Text>

      {/* Introduction */}
      <Text mb="20px">
        This Shipping Policy outlines the terms and conditions governing the
        shipment and delivery of products purchased from{" "}
        <b>https://www.kreedentials.com</b> (“Website”).
      </Text>

      <Text mb="20px">
        The Website is owned and operated by{" "}
        <b>AVYAYPRATYAY SPORTS LLP</b>, having its registered office at Plot No. 10,
        2nd Floor, Viman Nagar Colony, Secunderabad Viman Nagar Road, Hyderabad,
        Telangana, India – 500016.
      </Text>

      <Divider my="30px" />

      {/* Shipping Coverage */}
      <Heading size="md" mb="15px">
        Shipping Coverage
      </Heading>

      <Text mb="20px">
        Currently, we deliver products only within India. International shipping
        is not supported at this time.
      </Text>

      <Divider my="30px" />

      {/* Shipping Method */}
      <Heading size="md" mb="15px">
        Shipping Method
      </Heading>

      <Text mb="20px">
        Orders placed on the Website are shipped through registered domestic
        courier partners and/or India Post to ensure safe and reliable delivery.
      </Text>

      <Divider my="30px" />

      {/* Processing & Delivery Timeline */}
      <Heading size="md" mb="15px">
        Order Processing and Delivery Timeline
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          Orders are processed within <b>2–3 business days</b> after successful
          payment confirmation.
        </ListItem>

        <ListItem>
          Delivery typically takes <b>4–7 business days</b> from the date of
          dispatch, depending on the delivery location.
        </ListItem>

        <ListItem>
          Delivery timelines may vary due to factors beyond our control,
          including courier delays, weather conditions, or regional restrictions.
        </ListItem>
      </List>

      <Divider my="30px" />

      {/* Delivery Information */}
      <Heading size="md" mb="15px">
        Delivery Information
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>
          Products will be delivered to the address provided by the customer at
          checkout.
        </ListItem>

        <ListItem>
          Shipment tracking details, if available, will be shared via registered
          email or SMS.
        </ListItem>

        <ListItem>
          Customers are responsible for ensuring the accuracy of the delivery
          address. Incorrect addresses may result in delivery failure.
        </ListItem>
      </List>

      <Divider my="30px" />

      {/* Failed Delivery */}
      <Heading size="md" mb="15px">
        Failed or Delayed Delivery
      </Heading>

      <Text mb="20px">
        If a delivery attempt fails due to incorrect address, unavailability of
        the recipient, or refusal to accept the package, re-shipping charges (if
        applicable) may be borne by the customer.
      </Text>

      <Divider my="30px" />

      {/* Shipping Charges */}
      <Heading size="md" mb="15px">
        Shipping Charges
      </Heading>

      <Text mb="20px">
        Shipping charges, if applicable, are clearly displayed at checkout
        before payment. Any shipping fees paid are non-refundable unless
        otherwise required by applicable law.
      </Text>

      <Divider my="30px" />

      {/* COD */}
      <Heading size="md" mb="15px">
        Cash on Delivery
      </Heading>

      <Text mb="20px">
        Currently, Cash on Delivery (COD) is <b>not available</b>. All orders
        must be prepaid using the available online payment methods.
      </Text>

      <Divider my="30px" />

      {/* Returns */}
      <Heading size="md" mb="15px">
        Returns and Refunds
      </Heading>

      <Text mb="20px">
        Returns, cancellations, and refunds are governed by our{" "}
        <b>Refund and Cancellation Policy</b> and{" "}
        <b>Return and Exchange Policy</b>, available on the Website.
      </Text>

      <Divider my="30px" />

      {/* Contact */}
      <Heading size="md" mb="15px">
        Contact Information
      </Heading>

      <Text mb="10px">
        For any questions or assistance related to shipping or delivery, please
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

export default ShippingPolicy;
