import {
  Box,
  Text,
  SimpleGrid,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { ProductDisplayBox } from "../products/ProductDisplayBox";
import { useNavigate } from "react-router-dom";
import { setItemSession } from "../../utils/sessionStorage";

export const RelatedProducts = ({ product }) => {
  const navigate = useNavigate();
  const { products = [], isLoading } = useSelector(
    (state) => state.prodReducer
  );

  if (!product) return null;

  const { _id, category, productType, material } = product;

  /* ---------- TRUST BADGES ---------- */
  const trustBadges = [];

  if (productType?.toLowerCase() === "combo") {
    trustBadges.push("Complete Set", "Best Value");
  }

  if (category) {
    trustBadges.push("High Performance", "Match Ready");
  }

  if (material?.toLowerCase().includes("poly")) {
    trustBadges.push("Breathable Fabric", "Moisture Wicking");
  }

  /* ---------- SAFE RELATED LOGIC ---------- */
  let related = [];

  if (products.length) {
    // 1️⃣ Same category + same type
    related = products.filter(
      (p) =>
        p._id !== _id &&
        p.category === category &&
        p.productType === productType
    );

    // 2️⃣ Same category
    if (related.length < 4) {
      related = [
        ...related,
        ...products.filter(
          (p) =>
            p._id !== _id &&
            p.category === category &&
            !related.find((r) => r._id === p._id)
        ),
      ];
    }

    // 3️⃣ Same product type
    if (related.length < 4) {
      related = [
        ...related,
        ...products.filter(
          (p) =>
            p._id !== _id &&
            p.productType === productType &&
            !related.find((r) => r._id === p._id)
        ),
      ];
    }

    // 4️⃣ Fallback: any products
    if (related.length < 4) {
      related = [
        ...related,
        ...products.filter(
          (p) =>
            p._id !== _id &&
            !related.find((r) => r._id === p._id)
        ),
      ];
    }

    related = related.slice(0, 4);
  }

  // ❌ Do not hide section completely
  if (!related.length) return null;

  return (
    <Box mt="90px" px={["16px", "24px", "32px"]}>
      {/* TRUST BADGES */}
      {trustBadges.length > 0 && (
        <Flex justify="center" gap="12px" mb="60px" flexWrap="wrap">
          {trustBadges.map((badge, index) => (
            <Badge
              key={index}
              px="12px"
              py="6px"
              borderRadius="full"
              fontSize="13px"
              variant="subtle"
            >
              {badge}
            </Badge>
          ))}
        </Flex>
      )}

      {/* RELATED PRODUCTS */}
      <Text fontSize={["22px", "24px"]} fontWeight="700" mb="24px">
        You may also like
      </Text>

      <SimpleGrid columns={[1, 2, 4]} spacing="20px">
        {related.map((item) => (
          <ProductDisplayBox
            key={item._id}
            {...item}
            onClick={() => {
              setItemSession("singleProduct", item);
              navigate("/description");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
