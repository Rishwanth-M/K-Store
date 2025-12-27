import {
  Box,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";

export const ProductImageGallery = ({ images = [], alt = "" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!images.length) return null;

  /* ---------- Navigation ---------- */
  const nextImage = () =>
    setActiveIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  /* ---------- Mobile Swipe ---------- */
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
      {/* ===== DESKTOP LAYOUT ===== */}
      <Flex
        display={["none", "none", "flex"]}
        gap="20px"
        align="flex-start"
      >
        {/* VERTICAL THUMBNAILS */}
        <Flex
          direction="column"
          gap="12px"
          maxH="640px"
          overflowY="auto"
        >
          {images.map((img, index) => (
            <Box
              key={index}
              w="72px"
              h="72px"
              borderRadius="10px"
              overflow="hidden"
              cursor="pointer"
              border={
                activeIndex === index
                  ? "2px solid black"
                  : "1px solid #ddd"
              }
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
          ))}
        </Flex>

        {/* MAIN IMAGE */}
        <Box
          w="100%"
          h="640px"
          bg="#f5f5f5"
          borderRadius="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <img
            src={images[activeIndex]}
            alt={alt}
            onClick={onOpen}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              cursor: "zoom-in",
            }}
          />
        </Box>
      </Flex>

      {/* ===== MOBILE LAYOUT (SWIPE ONLY) ===== */}
      <Box
        display={["block", "block", "none"]}
        w="100%"
        h="380px"
        bg="#f5f5f5"
        borderRadius="16px"
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
              icon={<ChevronLeftIcon boxSize={8} />}
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
              icon={<ChevronRightIcon boxSize={8} />}
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

      {/* ===== FULLSCREEN MODAL ===== */}
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay bg="blackAlpha.900" />
        <ModalContent bg="black">
          <ModalCloseButton color="white" size="lg" />
          <Flex
            w="100%"
            h="100%"
            align="center"
            justify="center"
            position="relative"
          >
            <img
              src={images[activeIndex]}
              alt="fullscreen"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />

            <IconButton
              aria-label="Previous"
              icon={<ChevronLeftIcon boxSize={12} />}
              position="absolute"
              left="30px"
              top="50%"
              transform="translateY(-50%)"
              variant="ghost"
              color="white"
              onClick={prevImage}
            />
            <IconButton
              aria-label="Next"
              icon={<ChevronRightIcon boxSize={12} />}
              position="absolute"
              right="30px"
              top="50%"
              transform="translateY(-50%)"
              variant="ghost"
              color="white"
              onClick={nextImage}
            />
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};
