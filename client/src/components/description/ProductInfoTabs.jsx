import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  UnorderedList,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";

export const ProductInfoTabs = ({ product }) => {
  const {
    details,
    material,
    sizeGuide,
    delivery,
    specs = [],
  } = product;

  const textColor = useColorModeValue("gray.800", "white");
  const bg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const accordionButtonProps = {
    py: "22px",
    bg,
    color: textColor,
    _hover: { bg: hoverBg },
    _expanded: { bg: hoverBg },
  };

  const panelTextProps = {
    fontSize: "15px",
    lineHeight: "1.8",
    color: textColor,
  };

  return (
    <Box mt="60px">
      <Accordion allowToggle>
        {details && (
          <AccordionItem borderTop="1px solid" borderColor={borderColor}>
            <AccordionButton {...accordionButtonProps}>
              <Box flex="1" textAlign="left" fontWeight="600">
                Product Details
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb="24px" bg={bg}>
              <Text {...panelTextProps}>{details}</Text>
            </AccordionPanel>
          </AccordionItem>
        )}

        {material && (
          <AccordionItem borderTop="1px solid" borderColor={borderColor}>
            <AccordionButton {...accordionButtonProps}>
              <Box flex="1" textAlign="left" fontWeight="600">
                Material & Fit
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb="24px" bg={bg}>
              <Text {...panelTextProps}>{material}</Text>
            </AccordionPanel>
          </AccordionItem>
        )}

        {sizeGuide && (
          <AccordionItem borderTop="1px solid" borderColor={borderColor}>
            <AccordionButton {...accordionButtonProps}>
              <Box flex="1" textAlign="left" fontWeight="600">
                Size & Fit
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb="24px" bg={bg}>
              <Text {...panelTextProps}>{sizeGuide}</Text>
            </AccordionPanel>
          </AccordionItem>
        )}

        {delivery && (
          <AccordionItem borderTop="1px solid" borderColor={borderColor}>
            <AccordionButton {...accordionButtonProps}>
              <Box flex="1" textAlign="left" fontWeight="600">
                Delivery & Returns
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb="24px" bg={bg}>
              <Text {...panelTextProps}>{delivery}</Text>
            </AccordionPanel>
          </AccordionItem>
        )}

        {specs.length > 0 && (
          <AccordionItem
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            <AccordionButton {...accordionButtonProps}>
              <Box flex="1" textAlign="left" fontWeight="600">
                Product Information
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb="24px" bg={bg}>
              <UnorderedList spacing={3} fontSize="15px" color={textColor}>
                {specs.map((item, index) => (
                  <ListItem key={index}>{item}</ListItem>
                ))}
              </UnorderedList>
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </Box>
  );
};
