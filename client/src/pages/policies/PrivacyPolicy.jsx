import { Box, Heading, Text, List, ListItem, Divider } from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <Box
      maxW="900px"
      mx="auto"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "30px", md: "50px" }}
    >
      <Heading mb="10px">Privacy Policy</Heading>

      <Text fontSize="sm" color="gray.500" mb="30px">
        Last updated: 01 January 2026
      </Text>

      {/* Introduction */}
      <Text mb="20px">
        This Privacy Policy describes how <b>AVYAYPRATYAY SPORTS LLP</b> (“Company”,
        “we”, “our”, “us”) collects, uses, stores, shares, and protects personal
        information of users (“you”, “your”) who access or use{" "}
        <b>https://www.kreedentials.com</b> (“Website”).
      </Text>

      <Text mb="20px">
        This Privacy Policy is published in accordance with the Information
        Technology Act, 2000 and the Information Technology (Reasonable Security
        Practices and Procedures and Sensitive Personal Data or Information)
        Rules, 2011.
      </Text>

      <Divider my="30px" />

      {/* Information Collected */}
      <Heading size="md" mb="15px">
        Information We Collect
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>Name, gender, date of birth</ListItem>
        <ListItem>Email address and mobile number</ListItem>
        <ListItem>Billing and shipping address</ListItem>
        <ListItem>Order, transaction, and purchase history</ListItem>
        <ListItem>
          Technical data such as IP address, browser type, device identifiers
        </ListItem>
      </List>

      <Text mt="20px">
        <b>Payment Information:</b> We do not store or process any card, UPI, or
        banking credentials. All payments are securely processed by authorized
        third-party payment gateways in compliance with PCI-DSS standards.
      </Text>

      <Divider my="30px" />

      {/* Usage */}
      <Heading size="md" mb="15px">
        Use of Information
      </Heading>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>To process orders and deliver products</ListItem>
        <ListItem>To manage payments, refunds, and cancellations</ListItem>
        <ListItem>To communicate order updates and support requests</ListItem>
        <ListItem>To improve website functionality and user experience</ListItem>
        <ListItem>To comply with legal and regulatory obligations</ListItem>
        <ListItem>To prevent fraud and misuse</ListItem>
      </List>

      <Divider my="30px" />

      {/* Sharing */}
      <Heading size="md" mb="15px">
        Sharing of Information
      </Heading>

      <Text mb="20px">
        We may share your information with payment gateway partners, logistics
        partners, technology service providers, and government authorities where
        required by law.
      </Text>

      <Divider my="30px" />

      {/* Security */}
      <Heading size="md" mb="15px">
        Data Security
      </Heading>

      <Text mb="20px">
        We implement reasonable security practices and procedures to protect
        personal data from unauthorized access, alteration, disclosure, or
        destruction. However, no method of transmission over the internet is
        completely secure.
      </Text>

      <Divider my="30px" />

      {/* Retention */}
      <Heading size="md" mb="15px">
        Data Retention
      </Heading>

      <Text mb="20px">
        Personal data is retained only for as long as necessary to fulfill the
        purposes outlined in this policy or as required under applicable Indian
        laws.
      </Text>

      <Divider my="30px" />

      {/* User Rights */}
      <Heading size="md" mb="15px">
        Your Rights
      </Heading>

      <Text mb="20px">
        You may request access, correction, or deletion of your personal data by
        contacting us, subject to applicable legal and regulatory requirements.
      </Text>

      <Divider my="30px" />

      {/* Consent */}
      <Heading size="md" mb="15px">
        User Consent
      </Heading>

      <Text mb="20px">
        By using the Website, you consent to the collection, storage, processing,
        and transfer of information in accordance with this Privacy Policy.
      </Text>

      <Divider my="30px" />

      {/* Grievance */}
      <Heading size="md" mb="15px">
        Grievance Officer
      </Heading>

      <Text mb="10px">
        In accordance with the Information Technology Act, 2000, the details of
        the Grievance Officer are provided below:
      </Text>

      <Text>
        <b>Name:</b> Aman Goyal <br />
        <b>Email:</b> amangoyal@kreedentials.com <br />
        <b>Phone:</b> +91 7330645588 <br />
        <b>Address:</b> Plot No. 10, 2nd Floor, Viman Nagar Colony, Secunderabad
        Viman Nagar Road, Hyderabad, Telangana, India – 500016 <br />
        <b>Working Hours:</b> Monday – Friday (09:00 – 18:00 IST)
      </Text>

      <Divider my="30px" />

      {/* Governing Law */}
      <Heading size="md" mb="15px">
        Governing Law and Jurisdiction
      </Heading>

      <Text mb="20px">
        This Privacy Policy shall be governed by and construed in accordance
        with the laws of India. Any disputes shall be subject to the exclusive
        jurisdiction of courts in Hyderabad, Telangana.
      </Text>
    </Box>
  );
};

export default PrivacyPolicy;
