import { Accordion, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getPriceRange,
  setAllFilters,
  resetFilters
} from "../../redux/features/products/actions";
import {
  FilterSection,
  PriceFilter
} from "./LeftSideFilterComponents";

/* DEFAULT FILTER STATE */
const DEFAULT_FILTERS = {
  category: {
    boys: false,
    girls: false,
    unisex: false
  },
  productType: {
    combo: false,
    tshirt: false,
    shorts: false,
    socks: false,
    jacket: false
  },
  sizes: {
    S: false,
    M: false,
    L: false,
    XL: false
  },
  colors: {
    Red: false,
    Blue: false,
    Black: false,
    White: false,
    Green: false
  }
};

export const LeftSideFilter = ({ onApplyClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [priceRange, setPriceRange] = useState({
    minPrice: 0,
    maxPrice: Infinity
  });

  const [manageFilter, setManageFilter] = useState(DEFAULT_FILTERS);

  /* ✅ THIS WAS MISSING */
  const handleFilterChange = ({ target: { name, value, checked } }) => {
    setManageFilter((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        [value]: checked
      }
    }));
  };

  /* APPLY FILTERS */
  const handleFilterApply = () => {
    dispatch(setAllFilters(manageFilter));
    toast({
      title: "Filters applied",
      status: "success",
      duration: 1200
    });
    onApplyClose?.(); // auto-close (desktop & mobile)
  };

  /* PRICE FILTER */
  const handlePriceChange = ({ target: { value, name } }) => {
    setPriceRange((prev) => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const handlePriceSubmit = () => {
    dispatch(getPriceRange(priceRange));
    toast({
      title: "Price filter applied",
      status: "success",
      duration: 1200
    });
    onApplyClose?.(); // auto-close
  };

  /* RESET */
  const handleReset = () => {
    setManageFilter(DEFAULT_FILTERS);
    dispatch(resetFilters());
    toast({
      title: "Filters reset",
      status: "success",
      duration: 1200
    });
    onApplyClose?.(); // auto-close
  };

  return (
    <Accordion allowMultiple>
      {/* PRICE */}
      <PriceFilter
        handleChange={handlePriceChange}
        handleSubmit={handlePriceSubmit}
      />

      {/* GENDER */}
      <FilterSection
        title="Gender"
        name="category"
        item={["boys", "girls", "unisex"]}
        change={handleFilterChange}
        apply={handleFilterApply}
      />

      {/* PRODUCT TYPE */}
      <FilterSection
        title="Product Type"
        name="productType"
        item={["combo", "tshirt", "shorts", "socks", "jacket"]}
        change={handleFilterChange}
        apply={handleFilterApply}
      />

      {/* SIZE */}
      <FilterSection
        title="Size"
        name="sizes"
        item={["S", "M", "L", "XL"]}
        change={handleFilterChange}
        apply={handleFilterApply}
      />

      {/* COLOR */}
      <FilterSection
        title="Color"
        name="colors"
        item={["Red", "Blue", "Black", "White", "Green"]}
        change={handleFilterChange}
        apply={handleFilterApply}
      />

      {/* RESET */}
      <FilterSection
        title="Reset Filters"
        name="reset"
        item={[]}
        change={() => {}}
        apply={handleReset}
      />
    </Accordion>
  );
};
