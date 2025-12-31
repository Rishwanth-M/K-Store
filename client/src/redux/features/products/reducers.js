import {
  GET_DATA_ERROR,
  GET_DATA_LOADING,
  GET_DATA_SUCCESS,
  GET_PRICE_RANGE,
  RESET_FILTERS,
  SET_ALL_FILTERS,
  SORT_HIGH_TO_LOW,
  SORT_LOW_TO_HIGH,
} from "./actionTypes";

/* ================= INITIAL STATE ================= */

const initialFilters = {
  category: {},
  productType: {},
  sizes: {},
  colors: {},
};

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  backupData: [],
  filters: initialFilters,
  priceRange: { minPrice: 0, maxPrice: Infinity },
};

/* ================= REDUCER ================= */

export const prodReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DATA_LOADING:
      return { ...state, isLoading: true, isError: false };

    case GET_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        products: Array.isArray(payload) ? payload : [],
        backupData: Array.isArray(payload) ? payload : [],
      };

    case GET_DATA_ERROR:
      return { ...state, isLoading: false, isError: true };

    case SORT_LOW_TO_HIGH:
      return {
        ...state,
        products: [...state.products].sort((a, b) => a.price - b.price),
      };

    case SORT_HIGH_TO_LOW:
      return {
        ...state,
        products: [...state.products].sort((a, b) => b.price - a.price),
      };

    case GET_PRICE_RANGE:
      return {
        ...state,
        priceRange: payload,
        products: applyFilters(state.backupData, state.filters, payload),
      };

    case SET_ALL_FILTERS:
      return {
        ...state,
        filters: payload,
        products: applyFilters(
          state.backupData,
          payload,
          state.priceRange
        ),
      };

    case RESET_FILTERS:
      return {
        ...state,
        filters: initialFilters,
        priceRange: { minPrice: 0, maxPrice: Infinity },
        products: state.backupData,
      };

    default:
      return state;
  }
};

/* ================= FILTER ENGINE ================= */

function applyFilters(data, filters, priceRange) {
  if (!Array.isArray(data)) return [];

  return data.filter((product) => {
    /* ===== PRICE FILTER ===== */
    if (
      product.price < priceRange.minPrice ||
      product.price > priceRange.maxPrice
    ) {
      return false;
    }

    /* ===== CATEGORY FILTER (CASE-SAFE) ===== */
    if (hasActive(filters.category)) {
      const category = product.category?.toLowerCase();
      if (!filters.category[category]) return false;
    }

    /* ===== PRODUCT TYPE FILTER (CRITICAL FIX) ===== */
    if (hasActive(filters.productType)) {
      const type = product.productType?.toLowerCase();
      if (!filters.productType[type]) return false;
    }

    /* ===== COLORS FILTER ===== */
    if (hasActive(filters.colors)) {
      if (!product.colors?.some((c) => filters.colors[c])) {
        return false;
      }
    }

    /* ===== SIZES FILTER ===== */
    if (hasActive(filters.sizes)) {
      if (!product.sizes?.some((s) => filters.sizes[s])) {
        return false;
      }
    }

    return true;
  });
}

/* ================= UTIL ================= */

function hasActive(obj) {
  if (!obj) return false;
  return Object.values(obj).some(Boolean);
}
