import { Flex, Icon, Text, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

export const DarkModeBtn = ({ showLabel = false }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const isDark = colorMode === "dark";

  return (
    <Flex
      align="center"
      gap="10px"
      cursor="pointer"
      onClick={toggleColorMode}
      px={showLabel ? "10px" : "0"}
      py={showLabel ? "8px" : "0"}
      borderRadius="md"
      _hover={showLabel ? { bg: "gray.100" } : {}}
    >
      {/* ICON */}
      <Icon
        as={isDark ? FaSun : FaMoon}
        boxSize="18px"   // 👈 matches MenuItem icon size
      />

      {/* LABEL → MOBILE ONLY */}
      {showLabel && (
        <Text fontSize="15px" fontWeight="500">
          {isDark ? "Light Mode" : "Dark Mode"}
        </Text>
      )}
    </Flex>
  );
};
