import { Box, Heading, Text, Divider } from "@chakra-ui/react";

const PolicyLayout = ({ title, children }) => {
  return (
    <Box
      maxW="900px"
      mx="auto"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "30px", md: "50px" }}
    >
      {/* PAGE TITLE */}
      <Heading mb="10px">{title}</Heading>

      {/* LAST UPDATED */}
      <Text fontSize="sm" color="gray.500" mb="30px">
        Last updated: {new Date().toLocaleDateString()}
      </Text>

      <Divider mb="30px" />

      {/* PAGE CONTENT */}
      <Box>{children}</Box>
    </Box>
  );
};

export default PolicyLayout;
