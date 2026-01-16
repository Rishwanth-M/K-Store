import {
  Box,
  Center,
  Flex,
  Image,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { RiHeartLine, RiShoppingBagLine } from "react-icons/ri";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { KreedentialsLogo } from "../../constants/images";
import { setNavbarPath } from "../../redux/features/path/actions";
import { setItemSession } from "../../utils/sessionStorage";

import { Auth } from "../../components/auth/Auth";
import { Logout } from "../../components/auth/Logout";
import { DarkModeBtn } from "../../components/darkmode/DarkModeBtn";
import { Category, NavIcon } from "../../components/navbar/CategoryAndIcon";
import { SideDrawer } from "../../components/navbar/SideDrawer";

/* 🔥 Badge animation */
const pop = keyframes`
  0% { transform: scale(0.8); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  /* AUTH */
  const token = useSelector(
    (state) => state.authReducer.token,
    shallowEqual
  );

  /* 🛒 CART COUNT (DB ONLY) */
  const cartCount = useSelector(
    (state) =>
      token ? state.cartReducer.cartProducts.length : 0,
    shallowEqual
  );

  /* ❤️ FAV COUNT (DB ONLY) */
  const favCount = useSelector(
    (state) =>
      token ? state.favouriteReducer.favourites.length : 0,
    shallowEqual
  );

  const formatCount = (count) =>
    count > 9 ? "9+" : count;

  const handlePath = ({ target: { name } }) => {
    if (!name) return;
    dispatch(setNavbarPath(name));
    setItemSession("path", name);
  };

  const handleProtectedNav = (path) => {
    if (!token) {
      navigate("/auth", { state: { from: { pathname: path } } });
    } else {
      navigate(path);
    }
  };

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="1000"
      bg={colorMode === "light" ? "white" : "gray.900"}
    >
      {/* ===================== TOP AUTH BAR ===================== */}
      <Box h="46px" bg={colorMode === "light" ? "#f5f5f5" : "transparent"}>
        <Center h="46px" justifyContent="flex-end" px="16px" gap="8px">
          {!token ? <Auth /> : <Logout />}
          <Box display={{ base: "none", md: "block" }}>
            <DarkModeBtn />
          </Box>
        </Center>
      </Box>

      {/* ===================== MAIN NAVBAR ===================== */}
      <Flex h={{ base: "56px", md: "72px" }} px={{ base: "16px", md: "30px" }} align="center">
        {/* LOGO */}
        <Box w={{ base: "90px", md: "150px" }}>
          <Link to="/">
            <Image
              src={KreedentialsLogo}
              alt="Kreedentials Logo"
              filter={colorMode === "dark" ? "brightness(0) invert(1)" : "none"}
              h={{ base: "44px", md: "68px" }}
              objectFit="contain"
            />
          </Link>
        </Box>

        <Spacer display={{ base: "none", md: "block" }} />

        {/* DESKTOP CATEGORIES */}
        <Box display={{ base: "none", md: "flex" }}>
          <Category handlePath={handlePath} name="all" text="All Products" link="/allProducts" />
        </Box>

        <Spacer />

        {/* RIGHT ICONS */}
        <Flex align="center" gap="14px">
          {/* ❤️ FAV */}
          <Box position="relative">
            <NavIcon
              iconName={RiHeartLine}
              onClick={() => handleProtectedNav("/favourite")}
            />
            {favCount > 0 && (
              <Box
                position="absolute"
                top="-6px"
                right="-6px"
                minW="18px"
                h="18px"
                px="5px"
                bg="red.500"
                color="white"
                fontSize="11px"
                fontWeight="800"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                animation={`${pop} 0.25s ease`}
              >
                {formatCount(favCount)}
              </Box>
            )}
          </Box>

          {/* 🛒 CART */}
          <Box position="relative">
            <NavIcon
              iconName={RiShoppingBagLine}
              onClick={() => handleProtectedNav("/cart")}
            />
            {cartCount > 0 && (
              <Box
                position="absolute"
                top="-6px"
                right="-6px"
                minW="18px"
                h="18px"
                px="5px"
                bg="red.500"
                color="white"
                fontSize="11px"
                fontWeight="800"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                animation={`${pop} 0.25s ease`}
              >
                {formatCount(cartCount)}
              </Box>
            )}
          </Box>

          {/* 📱 MOBILE DRAWER */}
          <Box display={{ base: "flex", md: "none" }}>
            <SideDrawer
              handlePath={handlePath}
              cartCount={cartCount}
              favCount={favCount}
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
