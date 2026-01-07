import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";

export const OrderSection = ({
  date,
  time,
  paymentStatus,
  children,
}) => {
  const statusColor =
    paymentStatus === "SUCCESS"
      ? "green"
      : paymentStatus === "FAILED"
      ? "red"
      : "orange";

  return (
    <AccordionItem
      border="1px solid"
      borderColor="gray.200"
      borderRadius="12px"
      mb="20px"
      overflow="hidden"
    >
      <h2>
        <AccordionButton
          px="20px"
          py="16px"
          _hover={{ bg: "gray.50" }}
        >
          <Flex
            flex="1"
            justify="space-between"
            align="center"
            flexWrap="wrap"
            gap="10px"
          >
            <Box>
              <Text fontWeight={600}>
                Order placed on {date}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {time}
              </Text>
            </Box>

            {paymentStatus && (
              <Badge
                colorScheme={statusColor}
                px="10px"
                py="4px"
                borderRadius="full"
              >
                {paymentStatus}
              </Badge>
            )}
          </Flex>

          <AccordionIcon ml="10px" />
        </AccordionButton>
      </h2>

      <AccordionPanel px="20px" pb="25px">
        {children}
      </AccordionPanel>
    </AccordionItem>
  );
};
