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
        <Box key={orderIdx} mb="40px">
          {/* Order header */}
          <Skeleton height="14px" width="250px" mb="12px" />

          {/* Item cards */}
          {[1, 2].map((_, itemIdx) => (
            <Flex
              key={itemIdx}
              bg="white"
              borderRadius="14px"
              p="16px"
              align="center"
              justify="space-between"
              boxShadow="sm"
              mb="12px"
            >
              <Flex gap="16px" align="center">
                <Skeleton boxSize="80px" borderRadius="10px" />

                <Box>
                  <Skeleton height="14px" width="220px" mb="8px" />
                  <Skeleton height="12px" width="120px" mb="6px" />
                  <Skeleton height="12px" width="80px" />
                </Box>
              </Flex>

              <Skeleton height="16px" width="60px" />
            </Flex>
          ))}

          {/* Meta section */}
          <Flex
            gap="16px"
            mt="16px"
            direction={{ base: "column", md: "row" }}
          >
            {[1, 2, 3].map((_, metaIdx) => (
              <Box
                key={metaIdx}
                bg="white"
                borderRadius="14px"
                p="20px"
                boxShadow="sm"
                flex="1"
              >
                <SkeletonText noOfLines={4} spacing="3" />
              </Box>
            ))}
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

export default OrderSkeleton;
