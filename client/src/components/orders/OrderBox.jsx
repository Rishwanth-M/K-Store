import { Box, Center, Grid, Image, Text } from "@chakra-ui/react";
import { numberWithCommas, shortString } from "../../utils/extraFunctions";
import noImage from "../../assets/no-image.png";

export const OrderBox = ({
  name,
  title,        // ✅ backend uses `title`
  price,
  quantity,
  size,         // ✅ show selected size
  img = [],     // ✅ backend uses `img`
  images = [],  // ✅ frontend fallback
}) => {
  // ✅ Image compatibility (old + new orders)
  const imageList = img.length ? img : images;
  const imageUrl =
    imageList.length > 0 ? imageList[0] : noImage;

  // ✅ Name compatibility
  const productName = name || title || "Product";

  return (
    <Grid templateColumns="100px 1fr" p="5px" gap="10px">
      <Box w="100px" overflow="hidden">
        <Image
          src={imageUrl}
          w="100%"
          h="100px"
          objectFit="cover"
          borderRadius="6px"
        />
      </Box>

      <Center alignItems="flex-start">
        <Box px="10px" w="100%">
          <Text fontWeight={600}>
            {shortString(productName)}
          </Text>

          {size && (
            <Text fontSize="14px" color="gray.600">
              Size: {size}
            </Text>
          )}

          <Text>
            Price: ₹ {numberWithCommas(price)}
          </Text>

          <Text>
            Quantity: {quantity}
          </Text>
        </Box>
      </Center>
    </Grid>
  );
};
