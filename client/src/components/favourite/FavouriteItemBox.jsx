import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteFavouriteRequest } from "../../redux/features/favourite/actions";
import { numberWithCommas } from "../../utils/extraFunctions";
import { setItemSession } from "../../utils/sessionStorage";
import noImage from "../../assets/no-image.png";

export const FavouriteItemBox = ({ data, _id }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.authReducer.token);

  const {
    name,
    price,
    images = [],
    size,
  } = data;

  const imageUrl = images.length ? images[0] : noImage;

  const handleDeleteRequest = () => {
    dispatch(deleteFavouriteRequest(_id, token, toast));
  };

  const handleDisplayProduct = () => {
    setItemSession("singleProduct", data);
    navigate("/description");
  };

  return (
    <Flex flexDirection="column" mb="30px">
      {/* IMAGE */}
      <Box overflow="hidden">
        <Image
          src={imageUrl}
          onClick={handleDisplayProduct}
          cursor="pointer"
          className="imgAnimation"
        />
      </Box>

      {/* DETAILS */}
      <Box mt="15px">
        {/* NAME */}
        <Text fontWeight="600" lineHeight="1.4">
          {name}
        </Text>

        {/* SIZE */}
        {size && (
          <Badge mt="6px" colorScheme="blue">
            Size: {size}
          </Badge>
        )}

        {/* PRICE */}
        <Text mt="6px" fontWeight="500">
          ₹{numberWithCommas(price)}
        </Text>

        {/* REMOVE */}
        <Button
          mt="16px"
          variant="outline"
          borderRadius="20px"
          size="sm"
          onClick={handleDeleteRequest}
        >
          Remove
        </Button>
      </Box>
    </Flex>
  );
};
