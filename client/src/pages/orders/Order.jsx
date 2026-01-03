import {
  Accordion,
  Box,
  Center,
  Divider,
  Flex,
  Grid,
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

        // ✅ FIX: use res.data.orders
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
      <Center h="40vh">
        <Text fontSize="20px">
          Your orders will be displayed here.
        </Text>
      </Center>
    );
  }

  return (
    <Box px="20px" mb="150px">
      <Flex justify="space-between" maxW={1200} m="20px auto">
        <Text fontWeight={600} fontSize="24px">
          Orders ({data.length})
        </Text>
      </Flex>

      <Accordion allowMultiple>
        <Box maxW={1200} m="40px auto">
          {data.map((item) => {
            const { date, time } = item.createdAt
              ? dateFormator(item.createdAt)
              : { date: "-", time: "-" };

            return (
              <OrderSection key={item._id} date={date} time={time}>
                <Grid
                  templateColumns={{
                    base: "100%",
                    md: "48% 48%",
                    lg: "32% 31% 33%",
                  }}
                  gap="20px"
                >
                  {/* ORDER ITEMS */}
                  <Box py="15px" px="25px">
                    <Text fontSize="20px" fontWeight={600}>
                      Ordered Items
                    </Text>

                    <Divider mb="20px" />

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
        </Box>
      </Accordion>
    </Box>
  );
};
