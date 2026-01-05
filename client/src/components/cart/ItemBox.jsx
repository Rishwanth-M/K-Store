import {
  Box,
  Divider,
  Flex,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { numberWithCommas, setToast } from "../../utils/extraFunctions";
import { BagItemBtn, QuantityBtn } from "./BagItemBtn";
import { addToFavouriteRequest } from "../../redux/features/favourite/actions";
import {
  addToCartDB,
  removeFromCartDB,
} from "../../redux/features/cart/cart.api";

import noImage from "../../assets/no-image.png";

export const ItemBox = ({ data }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const token = useSelector((state) => state.authReducer.token);

  /* ================= DATA ================= */
  const {
    _id,              // cart item id
    product,          // product id
    name,
    description,
    price,
    quantity,
    size,
    images = [],
  } = data;

  const imageUrl = images.length ? images[0] : noImage;

  /* ================= REMOVE ================= */
  const handleRemoveItem = () => {
    dispatch(removeFromCartDB(_id, toast));
  };

  /* ================= QUANTITY ================= */
  const handleQuantityChange = ({ target: { name } }) => {
    if (name === "reduce" && quantity === 1) {
      dispatch(removeFromCartDB(_id, toast));
      return;
    }

    dispatch(
      addToCartDB(
        {
          productId: product,
          size,
          operation: name, // "add" | "reduce"
        },
        toast
      )
    );
  };

  /* ================= FAVOURITE ================= */
  const handleAddToFavourite = () => {
    if (!token) {
      setToast(toast, "Please login first", "error");
      navigate("/auth");
      return;
    }

    dispatch(
      addToFavouriteRequest(
        {
          productId: product,
          size,
        },
        toast
      )
    );
  };

  /* ================= UI ================= */
  return (
    <>
      <Box my="20px" display="flex" gap={["12px", "24px"]}>
        {/* IMAGE */}
        <Box w="150px" h="150px" flexShrink={0}>
          <Image
            h="100%"
            w="100%"
            objectFit="cover"
            src={imageUrl}
            alt={name}
            borderRadius="md"
          />
        </Box>

        {/* DETAILS */}
        <Box
          w="100%"
          display="grid"
          gap="12px"
          gridTemplateColumns={["1fr", "80% 18%"]}
        >
          <Box>
            <Text fontWeight={600} fontSize="16px">
              {name}
            </Text>

            <Text fontSize="14px" color="gray.600">
              Size: <strong>{size}</strong>
            </Text>

            {description && (
              <Text fontSize="14px" color="gray.500">
                {description}
              </Text>
            )}

            {/* QUANTITY */}
            <Flex align="center" gap="10px" mt="8px">
              <Text fontSize="14px">Quantity:</Text>

              <QuantityBtn
                text="-"
                name="reduce"
                onClick={handleQuantityChange}
              />

              <Text fontWeight={600}>{quantity}</Text>

              <QuantityBtn
                text="+"
                name="add"
                onClick={handleQuantityChange}
              />
            </Flex>

            {/* ACTIONS */}
            <Flex gap="12px" mt="10px">
              <BagItemBtn
                title="Favourites"
                onClick={handleAddToFavourite}
              />
              <BagItemBtn
                title="Remove"
                onClick={handleRemoveItem}
              />
            </Flex>
          </Box>

          {/* PRICE */}
          <Box textAlign="right">
            <Text fontSize="18px" fontWeight={600}>
              ₹{numberWithCommas(price)}
            </Text>
          </Box>
        </Box>
      </Box>

      <Divider />
    </>
  );
};
