import { Box, Center, Flex, Grid, Text } from "@chakra-ui/react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdOutlinePersonPin } from "react-icons/md";
import { IconLink } from "../../components/footer/IconLink";
import { Link as RouterLink } from "react-router-dom";

export const Footer = () => {
  return (
    <Box minH="300px" bg="black" color="white" mt="40px">
      {/* BRAND / BUSINESS NAME */}
      <Center h="80px">
        <Text fontSize="18px" fontWeight="bold">
          Kreedentials
        </Text>
      </Center>

      <Grid
        h="220px"
        p="10px"
        templateColumns={["100%", "48% 2% 50%", "48% 2% 50%", "25% 25% 50%"]}
      >
        {/* LEFT SECTION */}
        <Center>
          <Flex
            fontSize={["11px", "13px", "14px"]}
            gap="10px"
            fontWeight={600}
            flexDirection="column"
          >
            <Text>FIND A NEARBY STORE</Text>
            <Text>BECOME A MEMBER</Text>
            <Text>ALREADY A MEMBER</Text>
            <Text>SIGN UP FOR EMAIL</Text>
            <Text>SEND US FEEDBACK</Text>
          </Flex>
        </Center>

        {/* POLICIES SECTION */}
        <Center>
          <Flex
            fontSize="14px"
            gap="8px"
            flexDirection="column"
            color="gray.300"
          >
            <Text color="white" fontWeight={600}>
              POLICIES
            </Text>

            <Text
              as={RouterLink}
              to="/terms-and-conditions"
              _hover={{ color: "white", textDecoration: "underline" }}
            >
              Terms & Conditions
            </Text>

            <Text
              as={RouterLink}
              to="/privacy-policy"
              _hover={{ color: "white", textDecoration: "underline" }}
            >
              Privacy Policy
            </Text>

            <Text
              as={RouterLink}
              to="/refund-and-cancellation-policy"
              _hover={{ color: "white", textDecoration: "underline" }}
            >
              Refund & Cancellation Policy
            </Text>

            <Text
              as={RouterLink}
              to="/return-and-exchange-policy"
              _hover={{ color: "white", textDecoration: "underline" }}
            >
              Return & Exchange Policy
            </Text>

            <Text
              as={RouterLink}
              to="/shipping-policy"
              _hover={{ color: "white", textDecoration: "underline" }}
            >
              Shipping Policy
            </Text>
          </Flex>
        </Center>

        {/* SOCIAL ICONS */}
        <Flex
          mt="20px"
          gap="15px"
          flexDirection="row-reverse"
          justifyContent={["center", "flex-end"]}
          color="gray.400"
          mr={["0px", "30px", "80px"]}
        >
          <IconLink
            icon={MdOutlinePersonPin}
            link="https://www.kreedentials.com"
          />
          <IconLink
            icon={FaGithub}
            link="https://github.com/"
          />
          <IconLink
            icon={FaLinkedin}
            link="https://www.linkedin.com/"
          />
        </Flex>
      </Grid>
    </Box>
  );
};
