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
        Last updated: {new Date().toLocaleDateString()}
      </Text>

      <Heading size="md" mb="15px">
        Introduction
      </Heading>

      <Text mb="20px">
        This Privacy Policy describes how <b>AVYAYPRATYAY SPORTS LLP</b> and its
        affiliates (“we”, “our”, “us”) collect, use, share, protect, or otherwise
        process your personal data through our website
        https://www.kreedentials.com (the “Platform”).
      </Text>

      <Text mb="20px">
        You may browse certain sections of the Platform without registering.
        Please note that we do not offer any products or services outside India,
        and your personal data will primarily be stored and processed in India.
        By accessing or using the Platform, you agree to be bound by this Privacy
        Policy, the Terms of Use, and applicable laws of India.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Collection of Information
      </Heading>

      <Text mb="20px">
        We collect personal data when you use our Platform, services, or interact
        with us. This may include information provided during registration or
        usage, such as:
      </Text>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>Name, date of birth, address</ListItem>
        <ListItem>Telephone/mobile number and email ID</ListItem>
        <ListItem>Proof of identity or address</ListItem>
        <ListItem>
          Sensitive personal data (with your consent), such as payment
          information or biometric data for enabled features
        </ListItem>
      </List>

      <Text mt="20px">
        You may choose not to provide certain information by opting not to use
        specific features. We may also collect information related to your
        transactions and interactions on the Platform.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Use of Information
      </Heading>

      <Text mb="20px">
        We use your personal data to:
      </Text>

      <List spacing={3} pl="20px" styleType="disc">
        <ListItem>Provide and improve our services</ListItem>
        <ListItem>Process orders and transactions</ListItem>
        <ListItem>Enhance customer experience</ListItem>
        <ListItem>Resolve disputes and troubleshoot issues</ListItem>
        <ListItem>
          Inform you about offers, products, services, and updates
        </ListItem>
        <ListItem>
          Prevent fraud and enforce our terms and conditions
        </ListItem>
      </List>

      <Text mt="20px">
        Where required, we will provide you with an option to opt out of
        marketing communications.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Sharing of Information
      </Heading>

      <Text mb="20px">
        We may share your personal data with our affiliates, group entities,
        sellers, logistics partners, payment service providers, and third-party
        service providers as necessary to deliver our services.
      </Text>

      <Text mb="20px">
        We may also disclose information to government or law enforcement
        agencies when required by law or to protect rights, safety, and prevent
        fraud.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Security Precautions
      </Heading>

      <Text mb="20px">
        We adopt reasonable security practices to protect your personal data.
        While we use secure servers and safeguards, data transmission over the
        internet cannot be guaranteed to be completely secure. Users are
        responsible for safeguarding their login credentials.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Data Retention & Deletion
      </Heading>

      <Text mb="20px">
        You may request deletion of your account through your profile settings
        or by contacting us. Account deletion may be delayed in case of pending
        transactions, grievances, or legal obligations.
      </Text>

      <Text mb="20px">
        We retain personal data only as long as required for lawful purposes or
        as mandated by applicable laws. Data may be retained in anonymised form
        for research and analytical purposes.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Your Rights
      </Heading>

      <Text mb="20px">
        You may access, rectify, and update your personal data directly through
        the Platform’s available features.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Consent
      </Heading>

      <Text mb="20px">
        By using the Platform or providing your information, you consent to the
        collection, use, storage, and processing of your personal data in
        accordance with this Privacy Policy.
      </Text>

      <Text mb="20px">
        You may withdraw your consent by contacting the Grievance Officer.
        Withdrawal of consent will not be retrospective and may affect access
        to certain services.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Changes to this Privacy Policy
      </Heading>

      <Text mb="20px">
        We may update this Privacy Policy from time to time. Please review it
        periodically for any changes. Significant updates will be communicated
        as required by applicable law.
      </Text>

      <Divider my="30px" />

      <Heading size="md" mb="15px">
        Grievance Officer
      </Heading>

      <Text mb="10px">Name: To be updated</Text>
      <Text mb="10px">Designation: To be updated</Text>
      <Text mb="10px">
        Company: AVYAYPRATYAY SPORTS LLP
      </Text>
      <Text mb="10px">Contact details: To be updated</Text>
      <Text>Working hours: Monday – Friday (09:00 – 18:00)</Text>
    </Box>
  );
};

export default PrivacyPolicy;
