import {
  Box,
  Center,
  Flex,
  Image,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { RiHeartLine, RiShoppingBagLine } from "react-icons/ri";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { KreedentialsLogo } from "../../constants/images";
import { setNavbarPath } from "../../redux/features/path/actions";
import { setItemSession } from "../../utils/sessionStorage";
import { Auth } from "../../components/auth/Auth";
import { Logout } from "../../components/auth/Logout";
import { DarkModeBtn } from "../../components/darkmode/DarkModeBtn";
import { Category, NavIcon } from "../../components/navbar/CategoryAndIcon";
import { SideDrawer } from "../../components/navbar/SideDrawer";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authReducer, shallowEqual);
  const { colorMode } = useColorMode();

  const handlePath = ({ target: { name } }) => {
    dispatch(setNavbarPath(name));
    setItemSession("path", name);
  };

  return (
    <>
      {/* ===================== TOP AUTH BAR ===================== */}
      <Box h="36px" bg={colorMode === "light" ? "#f5f5f5" : "transparent"}>
        <Center
          h="36px"
          justifyContent="flex-end"
          px="20px"
          fontSize="15px"
        >
          {!token ? <Auth /> : <Logout />}
          <DarkModeBtn />
        </Center>
      </Box>

      {/* ===================== MAIN NAVBAR ===================== */}
      <Flex
  h={{ base: "56px", md: "72px" }}
  px={{ base: "16px", md: "30px" }}
  align="center"
>
  <Box w={{ base: "90px", md: "150px" }}>
    <Link to="/">
      <Image
        src={KreedentialsLogo}
        filter={colorMode === "dark" ? "brightness(0) invert(1)" : "none"}
        h={{ base: "44px", md: "68px" }}
        maxH="none"
        objectFit="contain"
      />
    </Link>
  </Box>

        {/* ===================== DESKTOP CATEGORIES ===================== */}
        <Spacer display={{ base: "none", md: "block" }} />

        <Box display={{ base: "none", md: "flex" }}>
          <Category handlePath={handlePath} name="all" text="All Products" link="/allProducts" />
          <Category handlePath={handlePath} name="boys" text="Boys" link="/allProducts" />
          <Category handlePath={handlePath} name="girls" text="Girls" link="/allProducts" />
          <Category handlePath={handlePath} name="unisex" text="Unisex" link="/allProducts" />
          <Category handlePath={handlePath} name="combo" text="Combo" link="/allProducts" />
        </Box>

        <Spacer />

        {/* ===================== RIGHT ICONS + MENU ===================== */}
        <Flex align="center" gap="12px">
          <Link to="/favourite">
            <NavIcon iconName={RiHeartLine} />
          </Link>

          <Link to="/cart">
            <NavIcon iconName={RiShoppingBagLine} />
          </Link>

          {/* Mobile menu on RIGHT */}
          <Box display={{ base: "flex", md: "none" }}>
            <SideDrawer handlePath={handlePath} />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
