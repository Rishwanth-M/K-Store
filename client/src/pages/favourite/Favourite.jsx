import { Box, Center, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FavouriteItemBox } from "../../components/favourite/FavouriteItemBox";
import { Error } from "../../components/loading/Error";
import { Loading } from "../../components/loading/Loading";
import { getFavouriteRequest } from "../../redux/features/favourite/actions";

export const Favourite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.authReducer.token);

  // ✅ CORRECT STATE KEYS
  const {
    isLoading,
    isError,
    favourites = [],
  } = useSelector((state) => state.favouriteReducer);

  /* 🔒 AUTH GUARD + FETCH */
  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }
    dispatch(getFavouriteRequest());
  }, [token, dispatch, navigate]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <Box maxW="1450px" mx="auto" my="20px" p="15px">
      <Text fontSize="20px" fontWeight={500}>
        Favourites
      </Text>

      {!favourites.length ? (
        <Center h="30vh">
          <Text fontSize="20px">
            Your favourite items will be displayed here.
          </Text>
        </Center>
      ) : (
        <Box
          display="grid"
          gap={{ base: "20px", lg: "40px" }}
          mt="40px"
          gridTemplateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
        >
          {favourites.map((item) => (
            <FavouriteItemBox
              key={item._id}
              _id={item._id}   // favourite document id
              data={item}     // full snapshot
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
