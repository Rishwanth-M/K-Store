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
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

/* 🔥 Smooth open animation */
const smoothOpen = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ProductInfoTabs = ({ product }) => {
  const { details, material, sizeGuide, delivery, specs = [] } = product;

  /* ===== COLOR SYSTEM ===== */
  const itemBg = useColorModeValue("white", "transparent");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const mutedText = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const buttonProps = {
    py: "22px",
    px: "4px",
    bg: "transparent",
    _hover: { bg: "transparent" },
    _expanded: { bg: "transparent" },
  };

  const panelTextProps = {
    fontSize: "15px",
    lineHeight: "1.9",
    color: textColor,
    animation: `${smoothOpen} 0.25s ease`,
  };

  return (
    <Box mt="64px">
      <Accordion allowToggle>
        {/* PRODUCT DETAILS */}
        {details && (
          <AccordionItem
            bg={itemBg}
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            <AccordionButton {...buttonProps}>
              <Box flex="1" textAlign="left" fontWeight="600" color={textColor}>
                Product Details
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb="28px" bg="transparent">
              <Text {...panelTextProps}>{details}</Text>
            </AccordionPanel>
          </AccordionItem>
        )}

        {/* MATERIAL & FIT */}
        {material && (
          <AccordionItem
            bg={itemBg}
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            <AccordionButton {...buttonProps}>
              <Box flex="1" textAlign="left" fontWeight="600" color={textColor}>
                Material & Fit
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb="28px" bg="transparent">
              <Text {...panelTextProps}>{material}</Text>
            </AccordionPanel>
          </AccordionItem>
        )}

        {/* SIZE GUIDE */}
        {sizeGuide && (
          <AccordionItem
            bg={itemBg}
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            <AccordionButton {...buttonProps}>
              <Box flex="1" textAlign="left" fontWeight="600" color={textColor}>
                Size & Fit
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb="28px" bg="transparent">
              <Text {...panelTextProps}>{sizeGuide}</Text>
            </AccordionPanel>
          </AccordionItem>
        )}

        {/* DELIVERY & RETURNS */}
        {delivery && (
          <AccordionItem
            bg={itemBg}
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            <AccordionButton {...buttonProps}>
              <Box flex="1" textAlign="left" fontWeight="600" color={textColor}>
                Delivery & Returns
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb="28px" bg="transparent">
              <Flex direction="column" gap="10px">
                <Text fontSize="14px" color={mutedText}>
                  🚚 Delivered in 4–6 working days
                </Text>
                <Text fontSize="14px" color={mutedText}>
                  🔄 Easy 3-day return
                </Text>
                <Text fontSize="14px" color={mutedText}>
                  📦 Secure packaging
                </Text>

                <Text mt="12px" {...panelTextProps}>
                  {delivery}
                </Text>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        )}

        {/* PRODUCT INFORMATION */}
        {specs.length > 0 && (
          <AccordionItem
            bg={itemBg}
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            <AccordionButton {...buttonProps}>
              <Box flex="1" textAlign="left" fontWeight="600" color={textColor}>
                Product Information
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb="28px" bg="transparent">
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
