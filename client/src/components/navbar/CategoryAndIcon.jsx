import {
  Center,
  Text,
  Icon,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

/* ===================== CATEGORY (DESKTOP NAV) ===================== */
export const Category = ({ text, link, handlePath, name }) => {
  const { colorMode } = useColorMode();

  return (
    <Center
      h="60px"
      px="16px"
      cursor="pointer"
      position="relative"
      _hover={{
        "& span": {
          color: colorMode === "light" ? "#000" : "#fff",
        },
        "&::after": {
          width: "100%",
        },
      }}
      _after={{
        content: '""',
        position: "absolute",
        bottom: "8px",
        left: "0",
        width: "0%",
        height: "2px",
        bg: colorMode === "light" ? "black" : "white",
        transition: "width 0.25s ease",
      }}
    >
      <Link to={link} onClick={handlePath} name={name}>
        <Text
          as="span"
          fontSize="22px"
          fontWeight="600"
          letterSpacing="0.4px"
          textTransform="uppercase"
          color={colorMode === "light" ? "gray.700" : "gray.300"}
          transition="color 0.2s ease"
        >
          {text}
        </Text>
      </Link>
    </Center>
  );
};

/* ===================== CATEGORY (DRAWER / MOBILE) ===================== */
export const DrawerCategory = ({ text, link, handlePath, name }) => {
  return (
    <Text
      fontSize="18px"
      fontWeight="600"
      letterSpacing="0.3px"
      py="10px"
    >
      <Link to={link} onClick={handlePath} name={name}>
        {text}
      </Link>
    </Text>
  );
};

/* ===================== NAV ICON ===================== */
export const NavIcon = ({ iconName }) => {
  return (
    <Icon
      as={iconName}
      boxSize="26px"
      mr="10px"
      cursor="pointer"
    />
  );
};

/* ===================== SEARCH BOX ===================== */
export const SearchBox = () => {
  return (
    <Center>
      <Box
        borderRadius="50px"
        w="180px"
        bg="#f5f5f5"
        p="7px"
        cursor="text"
        transition="all 0.2s ease"
        _hover={{
          bg: "#ececec",
        }}
      >
        <Center justifyContent="flex-start">
          <NavIcon iconName={AiOutlineSearch} />
          <Text fontSize="17px" color="gray.600">
            Search
          </Text>
        </Center>
      </Box>
    </Center>
  );
};
