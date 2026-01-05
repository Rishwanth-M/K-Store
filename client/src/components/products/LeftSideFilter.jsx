import {
  Accordion,
  Box,
  Button,
  Flex,
  Text,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getPriceRange,
  setAllFilters,
  resetFilters,
} from "../../redux/features/products/actions";
import {
  FilterSection,
  PriceFilter,
} from "./LeftSideFilterComponents";

/* DEFAULT FILTER STATE */
const DEFAULT_FILTERS = {
  category: { boys: false, girls: false, unisex: false },
  productType: {
    combo: false,
    tshirt: false,
    shorts: false,
    socks: false,
    jacket: false,
  },
  sizes: { S: false, M: false, L: false, XL: false },
  colors: {
    Red: false,
    Blue: false,
    Black: false,
    White: false,
    Green: false,
  },
};

export const LeftSideFilter = ({ onApplyClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [priceRange, setPriceRange] = useState({
    minPrice: 0,
    maxPrice: Infinity,
  });

  const [manageFilter, setManageFilter] = useState(DEFAULT_FILTERS);

  /* AUTO APPLY FILTERS */
  const handleFilterChange = ({ target: { name, value, checked } }) => {
    setManageFilter((prev) => {
      const updated = {
        ...prev,
        [name]: {
          ...prev[name],
          [value]: checked,
        },
      };
      dispatch(setAllFilters(updated));
      return updated;
    });
  };

  /* PRICE FILTER */
  const handlePriceChange = ({ target: { value, name } }) => {
    setPriceRange((prev) => {
      const updated = { ...prev, [name]: Number(value) };
      dispatch(getPriceRange(updated));
      return updated;
    });
  };

  /* RESET */
  const handleReset = () => {
    setManageFilter(DEFAULT_FILTERS);
    dispatch(resetFilters());
    toast({
      title: "Filters cleared",
      status: "success",
      duration: 1200,
    });
    onApplyClose?.();
  };

  /* COUNT */
  const count = (group) =>
    Object.values(group).filter(Boolean).length;

  return (
    <Box fontSize="15px">
      {/* HEADER */}
      <Flex
        align="center"
        justify="space-between"
        mb={6}
      >
        <Text fontSize="18px" fontWeight="600">
          Filters
        </Text>
        <Button
          size="sm"
          variant="ghost"
          fontSize="18px"
          onClick={handleReset}
        >
          Clear
        </Button>
      </Flex>

      <Divider mb={4} />

      <Accordion allowMultiple defaultIndex={[0]}>
        {/* PRICE */}
        <PriceFilter handleChange={handlePriceChange} />

        {/* GENDER */}
        <FilterSection
          title="Gender"
          name="category"
          item={["boys", "girls", "unisex"]}
          change={handleFilterChange}
          selectedCount={count(manageFilter.category)}
          variant="pill"
        />

        {/* PRODUCT TYPE */}
        <FilterSection
          title="Product Type"
          name="productType"
          item={["combo", "tshirt", "shorts", "socks", "jacket"]}
          change={handleFilterChange}
          selectedCount={count(manageFilter.productType)}
          variant="pill"
        />

        {/* SIZE */}
        <FilterSection
          title="Size"
          name="sizes"
          item={["S", "M", "L", "XL"]}
          change={handleFilterChange}
          selectedCount={count(manageFilter.sizes)}
          variant="size"
        />

        {/* COLOR */}
        <FilterSection
          title="Color"
          name="colors"
          item={["Red", "Blue", "Black", "White", "Green"]}
          change={handleFilterChange}
          selectedCount={count(manageFilter.colors)}
          variant="color"
        />
      </Accordion>
    </Box>
  );
};
