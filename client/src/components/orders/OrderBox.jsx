import { Box, Center, Grid, Image, Text } from "@chakra-ui/react";
import { numberWithCommas, shortString } from "../../utils/extraFunctions";
import noImage from "../../assets/no-image.png";

export const OrderBox = ({
  name,
  price,
  quantity,
  images = []
}) => {
  const imageUrl = images.length > 0 ? images[0] : noImage;

  return (
    <Grid templateColumns="100px 60%" p="5px">
      <Box w="100px" overflow="hidden">
        <Image
          src={imageUrl}
          w="100%"
          h="100px"
          objectFit="cover"
        />
      </Box>

      <Center>
        <Box px="20px" w="100%">
          <Text fontWeight={600}>
            {shortString(name)}
          </Text>
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
