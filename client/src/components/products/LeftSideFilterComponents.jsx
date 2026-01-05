import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Input,
  Text,
  useColorModeValue,
  Flex,
  Wrap,
  WrapItem,
  Checkbox,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

/* ========================= */
/* FILTER SECTION */
/* ========================= */
export const FilterSection = ({
  title,
  item,
  change,
  name,
  selectedCount = 0,
  variant = "pill", // pill | size | color
}) => {
  const titleColor = useColorModeValue("gray.900", "gray.100");
  const dividerColor = useColorModeValue("gray.200", "gray.700");

  /* PILL COLORS – DARK MODE SAFE */
  const pillBg = useColorModeValue("gray.200", "gray.700");       // stronger base
const pillActiveBg = useColorModeValue("gray.900", "gray.500"); // solid selected
const pillActiveColor = useColorModeValue("white", "white");


  return (
    <AccordionItem border="none">
      {({ isExpanded }) => (
        <>
          {/* HEADER */}
          <AccordionButton
            px={0}
            py={4}
            bg="transparent"
            _hover={{ bg: "transparent" }}
            _focus={{ boxShadow: "none" }}
          >
            <Flex w="100%" align="center" justify="space-between">
              <Text
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight="600"
                color={titleColor}
              >
                {title}
                {selectedCount > 0 && (
                  <Box as="span" ml={2} fontSize="13px" color="gray.500">
                    ({selectedCount})
                  </Box>
                )}
              </Text>

              {isExpanded ? (
                <MinusIcon boxSize={3} />
              ) : (
                <AddIcon boxSize={3} />
              )}
            </Flex>
          </AccordionButton>

          {/* CONTENT — TRANSPARENT (NO WHITE CARD) */}
          <AccordionPanel px={0} pb={4} bg="transparent">
            <Wrap spacing={2}>
              {item.map((val) => {
                const id = `${name}-${val}`;

                return (
                  <WrapItem key={val}>
                    {/* HIDDEN CHECKBOX */}
                    <Checkbox
                      id={id}
                      name={name}
                      value={val}
                      onChange={change}
                      display="none"
                      className="peer"
                    />

                    {/* PILL / SIZE */}
                    {variant !== "color" && (
                      <Box
  as="label"
  htmlFor={id}
  px={variant === "size" ? 4 : 5}
  py={2}
  fontSize={{ base: "13px", md: "15px" }}
  borderRadius="full"
  cursor="pointer"
  bg={pillBg}
  color={useColorModeValue("gray.800", "white")}
  transition="all 0.2s ease"
  _hover={{ opacity: 0.9 }}
  _peerChecked={{
    bg: pillActiveBg,
    color: pillActiveColor,
  }}
>

                        {val}
                      </Box>
                    )}

                    {/* COLOR DOT */}
                    {variant === "color" && (
                      <Box
                        as="label"
                        htmlFor={id}
                        w="28px"
                        h="28px"
                        borderRadius="full"
                        bg={val.toLowerCase()}
                        cursor="pointer"
                        border="2px solid transparent"
                        transition="all 0.2s ease"
                        _peerChecked={{
                          borderColor: "white",
                          transform: "scale(1.05)",
                        }}
                      />
                    )}
                  </WrapItem>
                );
              })}
            </Wrap>
          </AccordionPanel>

          <Divider borderColor={dividerColor} />
        </>
      )}
    </AccordionItem>
  );
};

/* ========================= */
/* PRICE FILTER */
/* ========================= */
export const PriceFilter = ({ handleChange }) => {
  const titleColor = useColorModeValue("gray.900", "gray.100");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const bg = useColorModeValue("white", "gray.800");

  return (
    <AccordionItem border="none">
      {({ isExpanded }) => (
        <>
          <AccordionButton
            px={0}
            py={4}
            bg="transparent"
            _hover={{ bg: "transparent" }}
            _focus={{ boxShadow: "none" }}
          >
            <Flex w="100%" align="center" justify="space-between">
              <Text
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight="600"
                color={titleColor}
              >
                Price
              </Text>

              {isExpanded ? (
                <MinusIcon boxSize={3} />
              ) : (
                <AddIcon boxSize={3} />
              )}
            </Flex>
          </AccordionButton>

          <AccordionPanel px={0} pb={4} bg="transparent">
            <Flex direction="column" gap={3}>
              <Input
                type="number"
                name="minPrice"
                placeholder="Min"
                fontSize={{ base: "14px", md: "16px" }}
                bg={bg}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="12px"
                _focus={{
                  borderColor: "gray.500",
                  boxShadow: "none",
                }}
                onChange={handleChange}
              />

              <Input
                type="number"
                name="maxPrice"
                placeholder="Max"
                fontSize={{ base: "14px", md: "16px" }}
                bg={bg}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="12px"
                _focus={{
                  borderColor: "gray.500",
                  boxShadow: "none",
                }}
                onChange={handleChange}
              />
            </Flex>
          </AccordionPanel>

          <Divider borderColor={useColorModeValue("gray.200", "gray.700")} />
        </>
      )}
    </AccordionItem>
  );
};
