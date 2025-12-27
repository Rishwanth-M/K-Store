import { Box, Center, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FavouriteItemBox } from "../../components/favourite/FavouriteItemBox";
import { Error } from "../../components/loading/Error";
import { Loading } from "../../components/loading/Loading";
import { getFavouriteRequest } from "../../redux/features/favourite/actions";

export const Favourite = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const { isLoading, isError, favourite } = useSelector(
    (state) => state.favouriteReducer
  );

  useEffect(() => {
    if (token) dispatch(getFavouriteRequest(token));
  }, [token]);

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <Box maxW="1450px" mx="auto" my="20px" p="15px">
      <Text fontSize="20px" fontWeight={500}>
        Favourites
      </Text>

      {!favourite.length ? (
        <Center h="30vh">
          <Text fontSize="20px">
            Your favourite items will be displayed here.
          </Text>
        </Center>
      ) : (
        <Box
          display="grid"
          gap={["20px", "20px", "20px", "40px"]}
          mt="40px"
          gridTemplateColumns={[
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
        >
          {favourite.map((item) => (
            <FavouriteItemBox
              key={item._id}
              _id={item._id}
              data={item.data}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
