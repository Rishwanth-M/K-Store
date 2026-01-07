import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  TimeIcon,
  WarningIcon,
} from "@chakra-ui/icons";

export const OrderSection = ({
  date,
  time,
  paymentStatus,
  children,
}) => {
  /* ================= STATUS FLAGS ================= */
  const isPlaced = true;
  const isPaid = paymentStatus === "SUCCESS";
  const isFailed = paymentStatus === "FAILED";
  const isPending = paymentStatus === "INITIATED";

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
      borderRadius="14px"
      mb="22px"
      overflow="hidden"
      bg="white"
    >
      {/* ================= HEADER ================= */}
      <h2>
        <AccordionButton
          px="20px"
          py="18px"
          _hover={{ bg: "gray.50" }}
        >
          <Flex
            flex="1"
            justify="space-between"
            align="center"
            flexWrap="wrap"
            gap="14px"
          >
            {/* LEFT */}
            <Box>
              <Text fontWeight={600}>
                Order placed on {date}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {time}
              </Text>
            </Box>

            {/* RIGHT */}
            <HStack spacing="12px">
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
              <AccordionIcon />
            </HStack>
          </Flex>
        </AccordionButton>
      </h2>

      {/* ================= BODY ================= */}
      <AccordionPanel px="22px" pb="28px">
        {/* ===== ORDER STATUS TIMELINE ===== */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing="24px"
          mb="28px"
          align="center"
        >
          {/* PLACED */}
          <HStack>
            <CheckCircleIcon color="green.500" />
            <Text fontWeight={600}>Placed</Text>
          </HStack>

          {/* PAID */}
          <HStack>
            {isPaid && <CheckCircleIcon color="green.500" />}
            {isFailed && <WarningIcon color="red.500" />}
            {isPending && <TimeIcon color="orange.400" />}
            <Text fontWeight={600}>
              {isPaid
                ? "Paid"
                : isFailed
                ? "Payment Failed"
                : "Payment Pending"}
            </Text>
          </HStack>

          {/* SHIPPED (future ready) */}
          <HStack opacity={0.5}>
            <TimeIcon />
            <Text fontWeight={600}>Shipped</Text>
          </HStack>
        </Stack>

        {/* ===== ACTION BUTTONS ===== */}
        <Flex
          justify="flex-end"
          gap="12px"
          mb="26px"
          flexWrap="wrap"
        >
          {/* DOWNLOAD INVOICE */}
          {isPaid && (
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                console.log("Download invoice:", paymentStatus)
              }
            >
              Download Invoice
            </Button>
          )}

          {/* RETRY PAYMENT */}
          {isFailed && (
            <Button
              size="sm"
              colorScheme="red"
              onClick={() =>
                console.log("Retry payment triggered")
              }
            >
              Retry Payment
            </Button>
          )}
        </Flex>

        {/* ===== ORDER CONTENT ===== */}
        {children}
      </AccordionPanel>
    </AccordionItem>
  );
};
