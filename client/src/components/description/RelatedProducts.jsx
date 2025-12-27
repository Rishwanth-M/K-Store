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
  const { products } = useSelector((state) => state.prodReducer);
  const navigate = useNavigate();


  if (!product || !products?.length) return null;

  const { _id, category, productType, material } = product;

  /* ---------- TRUST BADGES (LOGIC-BASED) ---------- */
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

  /* ---------- RELATED PRODUCTS LOGIC ---------- */
  let related = products.filter(
    (p) =>
      p._id !== _id &&
      p.category === category &&
      p.productType === productType
  );

  if (related.length < 4) {
    related = [
      ...related,
      ...products.filter(
        (p) =>
          p._id !== _id &&
          p.category === category &&
          p.productType !== productType
      ),
    ];
  }

  if (related.length < 4) {
    related = [
      ...related,
      ...products.filter(
        (p) => p._id !== _id && p.productType === productType
      ),
    ];
  }

  related = related.slice(0, 4);

  return (
  <Box
    mt="90px"
    px={["16px", "24px", "32px"]}  // ✅ LEFT & RIGHT SPACE
    
  >
      {/* ===== TRUST SECTION ===== */}
      {trustBadges.length > 0 && (
        <Flex
          justify="center"
          gap="12px"
          mb="60px"
          flexWrap="wrap"
        >
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

      {/* ===== RELATED PRODUCTS ===== */}
      {related.length > 0 && (
        <>
          <Text
            fontSize={["22px", "24px"]}
            fontWeight="700"
            mb="24px"
          >
            You may also like
          </Text>

          <SimpleGrid
            columns={[1, 2, 4]}
            spacing="20px"
          >
            {related.map((item) => (
  <ProductDisplayBox
  key={item._id}
  {...item}
  onClick={() => {
    setItemSession("singleProduct", item);
    navigate("/description");
    window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ ADD THIS
  }}
/>

))}

          </SimpleGrid>
        </>
      )}
    </Box>
  );
};
