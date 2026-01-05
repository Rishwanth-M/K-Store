import { Box, Center, Flex, Grid, Text } from "@chakra-ui/react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdOutlinePersonPin } from "react-icons/md";
import { IconLink } from "../../components/footer/IconLink";
import { Link as RouterLink } from "react-router-dom";

export const Footer = () => {
  return (
    <Box h={"300px"} bg={"black"} color={"white"} mt={"40px"}>
      <Center h={"80px"}>
        <Text className="typeWritertheme">Kreate Kommit Konquer</Text>
      </Center>

      <Grid
        h={"220px"}
        p={"10px"}
        templateColumns={["100%", "48% 2% 50%", "48% 2% 50%", "25% 25% 50%"]}
      >
        {/* LEFT SECTION */}
        <Center>
          <Flex
            fontSize={["11px", "13px", "14px"]}
            gap={"10px"}
            fontWeight={600}
            flexDirection={"column"}
          >
            <Text>FIND A NEARBY STORE</Text>
            <Text>BECOME A MEMBER</Text>
            <Text>ALREADY A MEMBER</Text>
            <Text>SIGNUP FOR EMAIL</Text>
            <Text>SEND US FEEDBACK</Text>
          </Flex>
        </Center>

        {/* POLICIES SECTION */}
        <Center>
          <Flex
            fontSize={"14px"}
            gap={"8px"}
            flexDirection={"column"}
            color={"gray"}
          >
            <Text color={"white"} fontWeight={600}>
              POLICIES
            </Text>

            <Text
              as={RouterLink}
              to="/terms-and-conditions"
            >
              Terms & Conditions
            </Text>

            <Text
              as={RouterLink}
              to="/privacy-policy"
            >
              Privacy Policy
            </Text>

            <Text
              as={RouterLink}
              to="/refund-and-cancellation-policy"
            >
              Refund & Cancellation Policy
            </Text>

            <Text
              as={RouterLink}
              to="/return-and-exchange-policy"
            >
              Return & Exchange Policy
            </Text>

            <Text
              as={RouterLink}
              to="/shipping-policy"
            >
              Shipping Policy
            </Text>
          </Flex>
        </Center>

        {/* SOCIAL ICONS */}
        <Flex
          mt={"20px"}
          gap={"15px"}
          flexDirection={"row-reverse"}
          justifyContent={["center", "right"]}
          color={"gray"}
          mr={["0px", "30px", "80px"]}
        >
          <IconLink
            icon={MdOutlinePersonPin}
            link="https://mohit-portfolio.vercel.app/"
          />
          <IconLink
            icon={FaGithub}
            link="https://github.com/m-sehrawat/"
          />
          <IconLink
            icon={FaLinkedin}
            link="https://www.linkedin.com/in/mohitsehrawat/"
          />
        </Flex>
      </Grid>
    </Box>
  );
};
