import { Button, Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { OrderTrackingModal } from "./OrderTrackingModal";

export const OrderActions = ({ orderId, logistics }) => {
  const [open, setOpen] = useState(false);

  const hasShipment = !!logistics?.awbNumber;

  return (
    <Box>
      <Text fontSize="13px" color="gray.500" mb="2">
        Shipment
      </Text>

      {hasShipment ? (
        <>
          <Text fontSize="14px" fontWeight="600">
            Blue Dart • AWB: {logistics.awbNumber}
          </Text>

          <Button
            size="sm"
            mt="3"
            colorScheme="blue"
            onClick={() => setOpen(true)}
          >
            Track Shipment
          </Button>
        </>
      ) : (
        <>
          <Text fontSize="14px" color="gray.500">
            Shipment pending
          </Text>

          <Button size="sm" mt="3" isDisabled>
            Track Shipment
          </Button>
        </>
      )}

      <OrderTrackingModal
        isOpen={open}
        onClose={() => setOpen(false)}
        orderId={orderId}
      />
    </Box>
  );
};
