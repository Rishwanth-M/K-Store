import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteFavouriteRequest } from "../../redux/features/favourite/actions";
import { numberWithCommas, shortString } from "../../utils/extraFunctions";
import { setItemSession } from "../../utils/sessionStorage";
import noImage from "../../assets/no-image.png";

export const FavouriteItemBox = ({ data, _id }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.authReducer.token);

  const {
    name,
    description,
    price,
    images = [],
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
      <Box overflow="hidden">
        <Image
          src={imageUrl}
          onClick={handleDisplayProduct}
          cursor="pointer"
          className="imgAnimation"
        />
      </Box>

      <Box mt="15px">
        <Flex justifyContent="space-between">
          <Text>{shortString(name)}</Text>
          <Text>₹{numberWithCommas(price)}</Text>
        </Flex>

        <Text fontSize="sm" color="gray">
          {shortString(description, 20)}
        </Text>

        <Button
          mt="20px"
          variant="ghost"
          border="1px solid #cecdce"
          borderRadius="20px"
          onClick={handleDeleteRequest}
        >
          Remove
        </Button>
      </Box>
    </Flex>
  );
};
