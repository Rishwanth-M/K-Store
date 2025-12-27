import {
  Box,
  HStack,
  useColorModeValue,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";

/* ========================= */
/* RADIO CARD */
/* ========================= */
const RadioCard = (props) => {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const radio = getRadioProps();

  const textColor = useColorModeValue("gray.800", "white");
  const bg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const checkedBorder = useColorModeValue("black", "white");

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...radio}
        cursor="pointer"
        px={5}
        py={3}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="sm"
        bg={bg}
        color={textColor}
        borderColor={borderColor}
        transition="all 0.2s ease"
        _hover={{
          bg: hoverBg,
        }}
        _checked={{
          border: `2px solid ${checkedBorder}`,
          fontWeight: "600",
        }}
        _focusVisible={{
          boxShadow: "outline",
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

/* ========================= */
/* SIZE SELECTOR */
/* ========================= */
export const SelectSize = ({ sizes = [], setMySize }) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "size",
    onChange: setMySize,
  });

  const group = getRootProps();

  return (
    <HStack {...group} spacing={3} wrap="wrap">
      {sizes.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
};
