import { Box, Image, Text } from "@chakra-ui/react";
import { numberWithCommas, shortString } from "../../utils/extraFunctions";
import { DescText, PriceText } from "./DescText";

export const ProductDisplayBox = ({
  name,
  price,
  description = "",
  images = [],
  category,
  productType,
  onClick,
}) => {
  const imageUrl =
    images && images.length > 0
      ? images[0]
      : "https://e7.pngegg.com/pngimages/826/253/png-clipart-t-shirt-polo-shirt-clothing-sleeve-black-t-shirt-black-crew-neck-t-shirt-tshirt-fashion-thumbnail.png";

  return (
    <Box
      onClick={onClick}
      cursor="pointer"
    >
      {/* IMAGE */}
      <Box
        w="100%"
        aspectRatio={4 / 3}   // balanced, not tall
        overflow="hidden"
        bg="gray.100"
      >
        <Image
          src={imageUrl}
          alt={name}
          w="100%"
          h="100%"
          objectFit="cover"
          loading="lazy"
        />
      </Box>

      {/* DETAILS */}
      <Box mt="10px">
        <Text
          fontSize="15px"
          fontWeight="500"
          lineHeight="1.3"
        >
          {shortString(name, 30)}
        </Text>

        <DescText mt="4px">
          {shortString(description, 40)}
        </DescText>

        <Text
          fontSize="12px"
          color="gray.400"
          mt="2px"
          textTransform="capitalize"
        >
          {category} · {productType}
        </Text>

        <PriceText mt="6px" fontSize="16px" fontWeight={600}>
          ₹{numberWithCommas(price)}
        </PriceText>
      </Box>
    </Box>
  );
};
