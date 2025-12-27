import {
  Box,
  Grid,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";

import noImage from "../../assets/no-image.png";

export const ImageModal = ({ images = [] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const displayImages = images.length ? images : [noImage];

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap="10px">
        {displayImages.map((image, index) => (
          <Box key={index}>
            <Image
              src={image}
              cursor="pointer"
              onClick={onOpen}
              w="100%"
              h="300px"
              objectFit="cover"
            />
          </Box>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <Grid
              templateColumns={[
                "repeat(1, 1fr)",
                "repeat(2, 1fr)"
              ]}
              gap="15px"
            >
              {displayImages.map((image, index) => (
                <Image key={index} src={image} w="100%" />
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
