import {
  Box,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { keyframes } from "@emotion/react";
import { useRef, useState } from "react";

/* 🔥 IMAGE TRANSITION */
const fadeScale = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
`;

export const ProductImageGallery = ({ images = [], alt = "" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const touchStartX = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  if (!images.length) return null;

  /* ---------- NAVIGATION ---------- */
  const nextImage = () =>
    setActiveIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  /* ---------- MOBILE SWIPE ---------- */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 60) prevImage();
    if (diff < -60) nextImage();
    touchStartX.current = null;
  };

  return (
    <>
      {/* ================= DESKTOP ================= */}
      {!isMobile && (
        <Flex gap="20px" align="flex-start">
          {/* THUMBNAILS (LEFT) */}
          <Flex
  direction="column"
  gap="14px"
  maxH="640px"
  overflowY="auto"
  pr="4px"
  sx={{
    scrollbarWidth: "none",        // Firefox
    msOverflowStyle: "none",       // IE / Edge
    "&::-webkit-scrollbar": {
      display: "none",             // Chrome / Safari
    },
  }}
>

            {images.map((img, index) => {
              const isActive = activeIndex === index;
              return (
                <Box
                  key={index}
                  w="70px"
                  h="70px"
                  borderRadius="12px"
                  overflow="hidden"
                  cursor="pointer"
                  border={isActive ? "2px solid black" : "1px solid #e0e0e0"}
                  transform={isActive ? "scale(1.05)" : "scale(1)"}
                  boxShadow={isActive ? "md" : "none"}
                  transition="all 0.25s ease"
                  onClick={() => setActiveIndex(index)}
                >
                  <img
                    src={img}
                    alt={`thumb-${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              );
            })}
          </Flex>

          {/* MAIN IMAGE */}
          <Box
            w="100%"
            h="640px"
            bg="#f6f6f6"
            borderRadius="24px"
            position="relative"
            overflow="hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              w="100%"
              h="100%"
              animation={`${fadeScale} 0.35s ease`}
              _hover={{ transform: "scale(1.05)" }}
              transition="transform 0.4s ease"
              cursor="zoom-in"
              onClick={onOpen}
            >
              <img
                src={images[activeIndex]}
                alt={alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* ARROWS (HOVER ONLY) */}
            {isHovering && images.length > 1 && (
              <>
                <IconButton
                  aria-label="Previous"
                  icon={<ChevronLeftIcon boxSize={8} />}
                  position="absolute"
                  left="14px"
                  top="50%"
                  transform="translateY(-50%)"
                  variant="ghost"
                  bg="whiteAlpha.800"
                  _hover={{ bg: "white" }}
                  onClick={prevImage}
                />
                <IconButton
                  aria-label="Next"
                  icon={<ChevronRightIcon boxSize={8} />}
                  position="absolute"
                  right="14px"
                  top="50%"
                  transform="translateY(-50%)"
                  variant="ghost"
                  bg="whiteAlpha.800"
                  _hover={{ bg: "white" }}
                  onClick={nextImage}
                />
              </>
            )}
          </Box>
        </Flex>
      )}

      {/* ================= MOBILE ================= */}
      {isMobile && (
        <Box>
          {/* MAIN IMAGE */}
          <Box
            w="100%"
            h="380px"
            bg="#f6f6f6"
            borderRadius="18px"
            overflow="hidden"
            position="relative"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={images[activeIndex]}
              alt={alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />

            {images.length > 1 && (
              <>
                <IconButton
                  aria-label="Previous"
                  icon={<ChevronLeftIcon boxSize={6} />}
                  position="absolute"
                  left="10px"
                  top="50%"
                  transform="translateY(-50%)"
                  variant="ghost"
                  bg="whiteAlpha.800"
                  onClick={prevImage}
                />
                <IconButton
                  aria-label="Next"
                  icon={<ChevronRightIcon boxSize={6} />}
                  position="absolute"
                  right="10px"
                  top="50%"
                  transform="translateY(-50%)"
                  variant="ghost"
                  bg="whiteAlpha.800"
                  onClick={nextImage}
                />
              </>
            )}
          </Box>

          {/* HORIZONTAL THUMBNAILS */}
          <Flex
            mt="14px"
            gap="10px"
            overflowX="auto"
            pb="6px"
          >
            {images.map((img, index) => {
              const isActive = activeIndex === index;
              return (
                <Box
                  key={index}
                  w="64px"
                  h="64px"
                  flexShrink={0}
                  borderRadius="12px"
                  overflow="hidden"
                  cursor="pointer"
                  border={isActive ? "2px solid black" : "1px solid #e0e0e0"}
                  onClick={() => setActiveIndex(index)}
                >
                  <img
                    src={img}
                    alt={`thumb-${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              );
            })}
          </Flex>
        </Box>
      )}

      {/* ================= IMAGE PREVIEW MODAL ================= */}
<Modal isOpen={isOpen} onClose={onClose} size="full" motionPreset="none">
  <ModalOverlay bg="rgba(0,0,0,0.85)" />

  <ModalContent
    bg="transparent"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <ModalCloseButton
      color="white"
      top="24px"
      right="24px"
      zIndex={10}
      _hover={{ bg: "whiteAlpha.200" }}
    />

    <Flex
      maxW="90vw"
      maxH="90vh"
      align="center"
      justify="center"
      position="relative"
      animation={`${fadeScale} 0.35s ease`}
    >
      {/* IMAGE */}
      <Box
        bg="#111"
        borderRadius="20px"
        p="20px"
        boxShadow="2xl"
      >
        <img
          src={images[activeIndex]}
          alt="preview"
          style={{
            maxWidth: "80vw",
            maxHeight: "80vh",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* ARROWS (SUBTLE) */}
      {images.length > 1 && (
        <>
          <IconButton
            aria-label="Previous"
            icon={<ChevronLeftIcon boxSize={10} />}
            position="absolute"
            left="-60px"
            variant="ghost"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
            onClick={prevImage}
          />
          <IconButton
            aria-label="Next"
            icon={<ChevronRightIcon boxSize={10} />}
            position="absolute"
            right="-60px"
            variant="ghost"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
            onClick={nextImage}
          />
        </>
      )}
    </Flex>
  </ModalContent>
</Modal>

    </>
  );
};
