import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Text,
  HStack,
  Badge,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { BiMenu } from "react-icons/bi";
import { DrawerCategory } from "./CategoryAndIcon";

export const SideDrawer = ({
  handlePath,
  cartCount = 0,
  favCount = 0,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const user = useSelector((state) => state.authReducer.user);
  const firstName = user?.firstName ?? "Guest";

  const formatCount = (count) =>
    count > 9 ? "9+" : count;

  return (
    <>
      <Icon
        w="28px"
        h="28px"
        mr="10px"
        cursor="pointer"
        onClick={onOpen}
        as={BiMenu}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>Hi {firstName}</DrawerHeader>
          <Divider />

          <DrawerBody>
            <VStack gap="26px" mt="24px" align="stretch" onClick={onClose}>
              <DrawerCategory handlePath={handlePath} name="/" text="Home" link="/" />
              <DrawerCategory handlePath={handlePath} name="allProducts" text="All Products" link="/allProducts" />

              {/* ❤️ FAV */}
              <HStack justify="space-between">
                <DrawerCategory handlePath={handlePath} name="favourite" text="Favourites" link="/favourite" />
                {favCount > 0 && <Badge colorScheme="red">{formatCount(favCount)}</Badge>}
              </HStack>

              {/* 🛒 CART */}
              <HStack justify="space-between">
                <DrawerCategory handlePath={handlePath} name="cart" text="Cart" link="/cart" />
                {cartCount > 0 && <Badge colorScheme="red">{formatCount(cartCount)}</Badge>}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
