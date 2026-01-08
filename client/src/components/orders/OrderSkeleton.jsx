import {
  Box,
  Flex,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

const OrderSkeleton = () => {
  return (
    <Box maxW="1100px" mx="auto" px="20px" py="40px">
      {[1, 2].map((_, orderIdx) => (
        <Box
          key={orderIdx}
          mb="56px"
          bg="white"
          borderRadius="22px"
          p={{ base: "18px", md: "26px" }}
          boxShadow="0 14px 40px rgba(0,0,0,0.06)"
          border="1px solid"
          borderColor="gray.100"
        >
          {/* ================= ORDER HEADER ================= */}
          <Flex
            justify="space-between"
            align="center"
            mb="24px"
            flexWrap="wrap"
            gap="12px"
          >
            <Box>
              <Skeleton height="10px" width="90px" mb="6px" />
              <Skeleton height="14px" width="220px" />
            </Box>

            <Skeleton height="24px" width="90px" borderRadius="full" />
          </Flex>

          {/* ================= ORDER ITEMS ================= */}
          {[1, 2].map((_, itemIdx) => (
            <Flex
              key={itemIdx}
              gap="16px"
              align="center"
              mb="16px"
            >
              <Skeleton boxSize="80px" borderRadius="12px" />

              <Box flex="1">
                <Skeleton height="14px" width="70%" mb="8px" />
                <Skeleton height="12px" width="40%" mb="6px" />
                <Skeleton height="12px" width="30%" />
              </Box>

              <Skeleton height="14px" width="50px" />
            </Flex>
          ))}

          {/* ================= META SECTION ================= */}
          <Flex
            gap="20px"
            mt="28px"
            direction={{ base: "column", md: "row" }}
          >
            {[1, 2, 3].map((_, metaIdx) => (
              <Box
                key={metaIdx}
                flex="1"
                bg="gray.50"
                borderRadius="16px"
                p="20px"
              >
                <SkeletonText noOfLines={4} spacing="4" />
              </Box>
            ))}
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

export default OrderSkeleton;
