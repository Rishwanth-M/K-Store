import {
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
  useColorMode,
} from "@chakra-ui/react";

import { FiLogOut } from "react-icons/fi";
import { FaRegHeart, FaSun, FaMoon } from "react-icons/fa";
import { BsCart2, BsFillCaretDownFill } from "react-icons/bs";
import { RiLuggageCartLine } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../redux/features/auth/actions";
import { Coupon } from "../../pages/coupon/Coupon";

export const Logout = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const user = useSelector(
    (state) => state.authReducer.user?.firstName || "Account"
  );

  const handleLogoutBtn = () => {
    dispatch(logoutUser(toast));
    navigate("/");
  };

  // ✅ Safe navigation handler for Chakra Menu
  const handleMenuNav = (path) => {
    setTimeout(() => {
      navigate(path);
    }, 0);
  };

  return (
    <Menu>
      {/* ================= USER BUTTON ================= */}
      <MenuButton
        as={Button}
        size={{ base: "sm", md: "md" }}
        px={{ base: "10px", md: "16px" }}
        minW={{ base: "90px", md: "120px" }}
        fontSize={{ base: "14px", md: "16px" }}
        fontWeight="500"
        bg="transparent"
        rightIcon={<BsFillCaretDownFill size={14} />}
      >
        {user}
      </MenuButton>

      {/* ================= DROPDOWN ================= */}
      <MenuList zIndex="1100">
        <Flex direction="column" fontSize="16px">
          <MenuItem
            icon={<FaRegHeart />}
            onClick={() => handleMenuNav("/favourite")}
          >
            Wishlist
          </MenuItem>

          <MenuItem
            icon={<RiLuggageCartLine />}
            onClick={() => handleMenuNav("/orders")}
          >
            Orders
          </MenuItem>

          <Coupon />

          <MenuItem
            icon={<BsCart2 />}
            onClick={() => handleMenuNav("/cart")}
          >
            Cart
          </MenuItem>

          {/* DARK / LIGHT MODE — MOBILE ONLY */}
          <MenuItem
            display={{ base: "flex", md: "none" }}
            icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
            onClick={toggleColorMode}
          >
            {colorMode === "dark" ? "Light Mode" : "Dark Mode"}
          </MenuItem>

          <Divider />

          <MenuItem icon={<FiLogOut />} onClick={handleLogoutBtn}>
            Logout
          </MenuItem>
        </Flex>
      </MenuList>
    </Menu>
  );
};
