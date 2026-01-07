import {
  Accordion,
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Heading,
  Text,
} from "@chakra-ui/react";

import { OrderAddress } from "../../components/orders/OrderAddress";
import { Loading } from "../../components/loading/Loading";
import { Error } from "../../components/loading/Error";
import { Summary } from "../../components/orders/Summary";
import { OrderBox } from "../../components/orders/OrderBox";
import { OrderSection } from "../../components/orders/OrderSection";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import api from "../../utils/api";
import { dateFormator } from "../../utils/dateFormator";

export const Order = () => {
  const token = useSelector((state) => state.authReducer.token);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  /* 🔒 AUTH GUARD */
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const res = await api.get("/order");
        const orders = res.data.orders || [];
        setData([...orders].reverse());
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  if (!data.length) {
    return (
      <Center h="50vh">
        <Box textAlign="center">
          <Heading size="md" mb="10px">
            No orders yet
          </Heading>
          <Text color="gray.600">
            Your orders will appear here once you make a purchase.
          </Text>
        </Box>
      </Center>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh" py="40px">
      {/* PAGE HEADER */}
      <Box maxW="1200px" mx="auto" px="20px" mb="30px">
        <Heading size="lg">My Orders</Heading>
        <Text color="gray.600" mt="5px">
          View your order history, payment status and details
        </Text>
      </Box>

      {/* ORDERS CONTAINER */}
      <Box
        maxW="1200px"
        mx="auto"
        px="20px"
      >
        <Box
          bg="white"
          borderRadius="16px"
          boxShadow="sm"
          p={{ base: "15px", md: "25px" }}
        >
          <Flex
            justify="space-between"
            align="center"
            mb="20px"
            flexWrap="wrap"
            gap="10px"
          >
            <Text fontWeight={600} fontSize="lg">
              Orders ({data.length})
            </Text>
          </Flex>

          <Divider mb="20px" />

          <Accordion allowMultiple>
            {data.map((item) => {
              const { date, time } = item.createdAt
                ? dateFormator(item.createdAt)
                : { date: "-", time: "-" };

              return (
                <OrderSection
                  key={item._id}
                  date={date}
                  time={time}
                  paymentStatus={item.paymentDetails?.paymentStatus}
                >
                  <Grid
                    templateColumns={{
                      base: "100%",
                      md: "100%",
                      lg: "1.3fr 1fr 1fr",
                    }}
                    gap="24px"
                  >
                    {/* ORDER ITEMS */}
                    <Box>
                      <Text
                        fontSize="lg"
                        fontWeight={600}
                        mb="12px"
                      >
                        Ordered Items
                      </Text>

                      <Divider mb="12px" />

                      {item.cartProducts?.map((product, idx) => (
                        <OrderBox key={idx} {...product} />
                      ))}
                    </Box>

                    {/* ADDRESS */}
                    <OrderAddress {...item.shippingDetails} />

                    {/* SUMMARY */}
                    <Summary
                      createdAt={item.createdAt}
                      {...item.orderSummary}
                      paymentStatus={item.paymentDetails?.paymentStatus}
                      merchantTransactionId={
                        item.paymentDetails?.merchantTransactionId
                      }
                    />
                  </Grid>
                </OrderSection>
              );
            })}
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};
