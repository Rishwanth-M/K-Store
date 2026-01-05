import { Box, Heading, Text, List, ListItem, Divider } from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <Box
      maxW="900px"
      mx="auto"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "30px", md: "50px" }}
    >
      {/* Page Title */}
      <Heading mb="10px">Privacy Policy</Heading>

      {/* Static Date */}
      <Text fontSize="sm" color="gray.500" mb="30px">
        Last updated: 01 January 2026
      </Text>

      {/* Introduction */}
      <Heading size="md" mb="15px">
        Introduction
      </Heading>

      <Text mb="20px">
        This Privacy Policy describes how <b>AVYAYPRATYAY SPORTS LLP</b> ("we",
        "our", "us") collects, uses, stores, shares, and protects your personal
        data through its website <b>https://www.kreedentials.com</b> (the
        "Platform").
      </Text>

      <Text mb="20px">
        By accessing or using the Platform, you agree to the collection and use
        of information in accordance with this Privacy Policy, the Terms and
        Conditions, and applicable laws of India. The Platform operates solely
        within India, and all data is stored and processed in India.
      </Text>

      <Divider my="30px" />

      {/* Data Collection */}
      <Heading size="md" mb="15px">
        Information We Collect
      </Heading>

      <Text mb="20px">
        We collect personal and non-personal information when you interact with
        the Platform, including but not limited to:
      </Text>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>Name, gender, date of birth, and address</ListItem>
        <ListItem>Email address and mobile number</ListItem>
        <ListItem>Account login credentials</ListItem>
        <ListItem>
          Transaction-related information, including order and payment details
        </ListItem>
        <ListItem>
          Technical data such as IP address, browser type, and device
          information
        </ListItem>
      </List>

      <Text mt="20px">
        We do not store any credit/debit card details or sensitive payment
        information. All payments are processed through secure, authorized
        third-party payment gateway providers.
      </Text>

      <Divider my="30px" />

      {/* Use */}
      <Heading size="md" mb="15px">
        Use of Information
      </Heading>

      <Text mb="20px">
        We use the collected information for the following purposes:
      </Text>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>To provide, operate, and improve our services</ListItem>
        <ListItem>To process transactions and fulfill orders</ListItem>
        <ListItem>To communicate order updates and service-related notices</ListItem>
        <ListItem>To enhance user experience and platform security</ListItem>
        <ListItem>To comply with legal and regulatory requirements</ListItem>
        <ListItem>To prevent fraud and misuse of the Platform</ListItem>
      </List>

      <Divider my="30px" />

      {/* Sharing */}
      <Heading size="md" mb="15px">
        Sharing of Information
      </Heading>

      <Text mb="20px">
        We may share your information with logistics partners, payment gateway
        providers, technology service providers, and affiliates strictly for
        service delivery and legal compliance.
      </Text>

      <Text mb="20px">
        Information may also be disclosed to government authorities if required
        by law or in response to valid legal processes.
      </Text>

      <Divider my="30px" />

      {/* Security */}
      <Heading size="md" mb="15px">
        Security Measures
      </Heading>

      <Text mb="20px">
        We implement reasonable technical and organizational security measures
        to protect your personal data against unauthorized access, misuse, or
        loss. However, no method of transmission over the internet is completely
        secure, and users are responsible for safeguarding their login
        credentials.
      </Text>

      <Divider my="30px" />

      {/* Retention */}
      <Heading size="md" mb="15px">
        Data Retention and Deletion
      </Heading>

      <Text mb="20px">
        Personal data is retained only for as long as necessary to fulfill the
        purposes outlined in this Privacy Policy or as required under
        applicable laws. You may request account deletion by contacting us at
        the email address provided below.
      </Text>

      <Divider my="30px" />

      {/* Rights */}
      <Heading size="md" mb="15px">
        Your Rights
      </Heading>

      <Text mb="20px">
        You have the right to access, update, correct, or request deletion of
        your personal data, subject to legal and contractual restrictions.
      </Text>

      <Divider my="30px" />

      {/* Consent */}
      <Heading size="md" mb="15px">
        Consent
      </Heading>

      <Text mb="20px">
        By using the Platform, you provide your consent to the collection,
        storage, processing, and transfer of your personal information in
        accordance with this Privacy Policy.
      </Text>

      <Divider my="30px" />

      {/* Updates */}
      <Heading size="md" mb="15px">
        Changes to this Privacy Policy
      </Heading>

      <Text mb="20px">
        We may update this Privacy Policy periodically. Any changes will be
        posted on this page with a revised "Last updated" date.
      </Text>

      <Divider my="30px" />

      {/* Contact */}
      <Heading size="md" mb="15px">
        Contact and Grievance Redressal
      </Heading>

      <Text mb="10px">
        If you have any questions, concerns, or grievances regarding this
        Privacy Policy or the handling of your personal data, you may contact
        us using the details below:
      </Text>

      <Text>
        <b>Email:</b> support@kreedentials.com <br />
        <b>Business Name:</b> AVYAYPRATYAY SPORTS LLP <br />
        <b>Address:</b> Plot No. 10, 2nd Floor, Viman Nagar Colony, Secunderabad
        Viman Nagar Road, Hyderabad, Telangana, India <br />
        <b>Working Hours:</b> Monday – Friday (09:00 – 18:00 IST)
      </Text>
    </Box>
  );
};

export default PrivacyPolicy;
