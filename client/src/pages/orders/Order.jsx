import { Box, Center, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import api from "../../utils/api";
import OrderSkeleton from "../../components/orders/OrderSkeleton";
import { Error } from "../../components/loading/Error";
import { OrderGroup } from "../../components/orders/OrderGroup";

export const Order = () => {
  const token = useSelector((state) => state.authReducer.token);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState([]);

  /* 🔒 AUTH GUARD */
  if (!token) return <Navigate to="/auth" replace />;

  /* 📦 FETCH ORDERS */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await api.get("/order");
        setOrders([...res.data.orders].reverse());
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ⏳ LOADING */
  if (loading) return <OrderSkeleton />;

  /* ❌ ERROR */
  if (error) return <Error />;

  /* 📭 EMPTY STATE */
  if (!orders.length) {
    return (
      <Center h="60vh">
        <Box textAlign="center">
          <Heading size="md" mb="2">
            No orders yet
          </Heading>
          <Text color="gray.500">
            Once you place an order, it will appear here.
          </Text>
        </Box>
      </Center>
    );
  }

  /* ✅ ORDERS LIST */
  return (
    <Box bg="gray.50" minH="100vh" py="40px">
      <Box maxW="1100px" mx="auto" px="20px">
        <Heading size="lg" mb="6px">
          My Orders
        </Heading>

        <Text color="gray.600" mb="32px">
          View your orders and track shipments
        </Text>

        {orders.map((order) => (
          <OrderGroup key={order._id} order={order} />
        ))}
      </Box>
    </Box>
  );
};
