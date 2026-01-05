import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { BiMenu } from "react-icons/bi";
import { DrawerCategory } from "./CategoryAndIcon";

export const SideDrawer = ({ handlePath, cartCount }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ✅ SAFE REDUX ACCESS
  const user = useSelector((state) => state.authReducer.user);
  const firstName = user?.firstName ?? "Guest";

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
            <VStack gap="30px" mt="40px" onClick={onClose}>
              <DrawerCategory
                handlePath={handlePath}
                name="/"
                text="Home"
                link="/"
              />
              <DrawerCategory
                handlePath={handlePath}
                name="allProducts"
                text="All Products"
                link="/allProducts"
              />
              <DrawerCategory
                handlePath={handlePath}
                name="men"
                text="Men"
                link="/men"
              />
              <DrawerCategory
                handlePath={handlePath}
                name="women"
                text="Women"
                link="/women"
              />
              <DrawerCategory
                handlePath={handlePath}
                name="kids"
                text="Kids"
                link="/kids"
              />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
