import { Box, Heading, Text, Divider } from "@chakra-ui/react";

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
        This Shipping Policy describes the terms and conditions governing the
        shipment and delivery of products purchased from{" "}
        <b>https://www.kreedentials.com</b> (the “Website”).
      </Text>

      <Text mb="20px">
        The Website is owned and operated by <b>AVYAYPRATYAY SPORTS LLP</b>, having
        its registered office at Plot No. 10, 2nd Floor, Viman Nagar Colony,
        Secunderabad Viman Nagar Road, Hyderabad, Telangana, India – 500016.
      </Text>

      <Divider my="30px" />

      {/* Shipping Method */}
      <Heading size="md" mb="15px">
        Shipping Method
      </Heading>

      <Text mb="20px">
        Orders placed on the Website are shipped through registered domestic
        courier companies and/or India Post (Speed Post) only.
      </Text>

      <Divider my="30px" />

      {/* Shipping Timeline */}
      <Heading size="md" mb="15px">
        Shipping Timeline
      </Heading>

      <Text mb="20px">
        Orders are generally shipped and delivered within <b>3 (three) to 7 (seven) days</b>{" "}
        from the date of order placement and/or successful payment, or as per
        the delivery date agreed at the time of order confirmation, subject to
        courier company or postal authority norms.
      </Text>

      <Text mb="20px">
        AVYAYPRATYAY SPORTS LLP shall not be liable for any delay in delivery
        caused by the courier company, postal authority, natural events, or
        unforeseen circumstances beyond its control.
      </Text>

      <Divider my="30px" />

      {/* Delivery */}
      <Heading size="md" mb="15px">
        Delivery Information
      </Heading>

      <Text mb="20px">
        Delivery of all orders will be made to the shipping address provided by
        the buyer at the time of purchase.
      </Text>

      <Text mb="20px">
        Delivery confirmation of services and order-related communications will
        be sent to the registered email address provided at the time of account
        creation or checkout.
      </Text>

      <Divider my="30px" />

      {/* Shipping Charges */}
      <Heading size="md" mb="15px">
        Shipping Charges
      </Heading>

      <Text mb="20px">
        If any shipping costs are levied by the seller or the Platform Owner, the
        same shall be clearly communicated at the time of checkout. All shipping
        charges paid are <b>non-refundable</b>.
      </Text>

      <Divider my="30px" />

      {/* Contact */}
      <Heading size="md" mb="15px">
        Contact Information
      </Heading>

      <Text mb="10px">
        For any issues related to shipping, delivery, or use of our services,
        customers may contact our helpdesk at:
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

export default ShippingPolicy;
