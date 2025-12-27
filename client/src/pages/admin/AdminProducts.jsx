import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Badge,
  Button,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getRequest } from "../../redux/features/products/actions";

export const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, isLoading } = useSelector(
    (state) => state.prodReducer
  );

  /* Fetch all products */
  useEffect(() => {
    dispatch(getRequest());
  }, [dispatch]);

  return (
    <Box maxW="1200px" mx="auto" px="24px" py="40px">
      {/* HEADER */}
      <Flex justify="space-between" align="center" mb="30px">
        <Heading size="lg">Products</Heading>

        <Button
          colorScheme="blackAlpha"
          onClick={() => navigate("/admin/products/new")}
        >
          Add Product
        </Button>
      </Flex>

      {/* LOADING */}
      {isLoading ? (
        <Flex justify="center" py="60px">
          <Spinner size="lg" />
        </Flex>
      ) : (
        <Box
          border="1px solid #e5e5e5"
          borderRadius="12px"
          overflow="hidden"
          bg="white"
        >
          <Table variant="simple">
            <Thead bg="#f7f7f7">
              <Tr>
                <Th>Product</Th>
                <Th>Category</Th>
                <Th>Type</Th>
                <Th>Price</Th>
                <Th>Status</Th>
                <Th textAlign="right">Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {products?.map((product) => (
                <Tr key={product._id}>
                  {/* PRODUCT */}
                  <Td>
                    <Flex align="center" gap="12px">
                      <Image
                        src={product.images?.[0]}
                        boxSize="56px"
                        objectFit="contain"
                        borderRadius="8px"
                        bg="#f7f7f7"
                      />
                      <Box>
                        <Heading size="sm" fontWeight="600">
                          {product.name}
                        </Heading>
                        <Box fontSize="13px" color="gray.500">
                          {product.color}
                        </Box>
                      </Box>
                    </Flex>
                  </Td>

                  {/* CATEGORY */}
                  <Td textTransform="capitalize">
                    {product.category}
                  </Td>

                  {/* TYPE */}
                  <Td>{product.productType}</Td>

                  {/* PRICE */}
                  <Td>₹ {product.price}</Td>

                  {/* STATUS */}
                  <Td>
                    <Badge
                      colorScheme={
                        product.status === "active"
                          ? "green"
                          : "orange"
                      }
                    >
                      {product.status || "draft"}
                    </Badge>
                  </Td>

                  {/* ACTION */}
                  <Td textAlign="right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        navigate(
                          `/admin/products/edit/${product._id}`
                        )
                      }
                    >
                      Edit
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};
