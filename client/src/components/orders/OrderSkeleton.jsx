import {
  Box,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

export const OrderSkeleton = () => {
  return Array.from({ length: 3 }).map((_, i) => (
    <Box
      key={i}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="14px"
      p="16px"
      mb="16px"
      bg="white"
    >
      <Skeleton height="80px" mb="12px" />
      <SkeletonText noOfLines={3} spacing="4" />
    </Box>
  ));
};
