import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

/* ========================= */
/* GENERIC FILTER SECTION */
/* ========================= */
export const FilterSection = ({ title, item, change, apply, name }) => {
  const textColor = useColorModeValue("gray.800", "white");
  const bg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <AccordionItem borderColor={borderColor}>
      <h2>
        <AccordionButton
          bg={bg}
          color={textColor}
          _hover={{ bg: hoverBg }}
          _expanded={{ bg: hoverBg }}
          px={4}
          py={3}
        >
          <Box flex="1" textAlign="left" fontSize={["14px", "16px"]}>
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>

      <AccordionPanel bg={bg} color={textColor} pb={4}>
        <Stack spacing={2}>
          {item.map((val) => (
            <Checkbox
              key={val}
              name={name}
              value={val}
              onChange={change}
              colorScheme="teal"
            >
              <Text fontSize={["13px", "15px"]} color={textColor}>
                {val}
              </Text>
            </Checkbox>
          ))}

          <Button
            size="sm"
            colorScheme="teal"
            mt={2}
            onClick={apply}
          >
            Apply
          </Button>
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  );
};

/* ========================= */
/* PRICE FILTER */
/* ========================= */
export const PriceFilter = ({ handleChange, handleSubmit }) => {
  const textColor = useColorModeValue("gray.800", "white");
  const bg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const placeholderColor = useColorModeValue("gray.400", "gray.500");

  return (
    <AccordionItem borderColor={borderColor}>
      <h2>
        <AccordionButton
          bg={bg}
          color={textColor}
          _hover={{ bg: hoverBg }}
          _expanded={{ bg: hoverBg }}
          px={4}
          py={3}
        >
          <Box flex="1" textAlign="left" fontSize={["14px", "16px"]}>
            Price Filter
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>

      <AccordionPanel bg={bg} color={textColor} pb={4}>
        <Flex direction="column" gap={3}>
          <Input
            type="number"
            name="minPrice"
            placeholder="₹ Min Price"
            onChange={handleChange}
            bg={bg}
            color={textColor}
            borderColor={borderColor}
            _placeholder={{ color: placeholderColor }}
          />

          <Input
            type="number"
            name="maxPrice"
            placeholder="₹ Max Price"
            onChange={handleChange}
            bg={bg}
            color={textColor}
            borderColor={borderColor}
            _placeholder={{ color: placeholderColor }}
          />

          <Button
            size="sm"
            colorScheme="teal"
            onClick={handleSubmit}
          >
            Apply
          </Button>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
