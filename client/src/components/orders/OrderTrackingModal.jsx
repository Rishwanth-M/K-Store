import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Spinner,
  Box,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../utils/api";

export const OrderTrackingModal = ({ isOpen, onClose, orderId }) => {
  const [loading, setLoading] = useState(false);
  const [tracking, setTracking] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchTracking = async () => {
      setLoading(true);
      setTracking(null); // 🔴 IMPORTANT RESET

      try {
        const res = await api.get(`/shipment/track/${orderId}`);
        setTracking(res.data || {});
      } catch {
        setTracking({ error: true });
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();
  }, [isOpen, orderId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="20px">
        <ModalHeader fontSize="18px" fontWeight="600">
          Shipment Tracking
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="6">
          {loading ? (
            <Flex justify="center" py="8">
              <Spinner size="lg" />
            </Flex>
          ) : tracking?.error ? (
            <Text color="red.500" textAlign="center">
              Unable to fetch tracking details
            </Text>
          ) : !tracking ? (
            <Text color="gray.500" textAlign="center">
              Loading shipment information…
            </Text>
          ) : (
            <Box>
              <Text fontSize="13px" color="gray.500" mb="4">
                Courier details
              </Text>

              <Text fontSize="14px" mb="2">
                <strong>Courier:</strong>{" "}
                {tracking.courier || "Blue Dart"}
              </Text>

              <Text fontSize="14px" mb="2">
                <strong>AWB:</strong>{" "}
                {tracking.awb || "Not assigned yet"}
              </Text>

              <Badge
                colorScheme={
                  tracking.status === "DELIVERED"
                    ? "green"
                    : tracking.status === "IN_TRANSIT"
                    ? "blue"
                    : "gray"
                }
                px="10px"
                py="4px"
                borderRadius="full"
              >
                {tracking.status || tracking.message || "PENDING"}
              </Badge>

              {!tracking.awb && (
                <Text fontSize="12px" color="gray.400" mt="4">
                  Tracking will be available once the shipment is created.
                </Text>
              )}
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
