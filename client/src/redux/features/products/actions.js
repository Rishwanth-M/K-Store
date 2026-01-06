import {
  GET_DATA_ERROR,
  GET_DATA_LOADING,
  GET_DATA_SUCCESS,
  GET_PRICE_RANGE,
  NAME_A_TO_Z,
  NAME_Z_TO_A,
  RATING_HIGH_TO_LOW,
  RATING_LOW_TO_HIGH,
  RESET_FILTERS,
  SET_ALL_FILTERS,
  SORT_HIGH_TO_LOW,
  SORT_LOW_TO_HIGH,
} from "./actionTypes";

import api from "../../../utils/api";

/* ================= ACTION CREATORS ================= */

export const getDataLoading = () => ({
  type: GET_DATA_LOADING,
});

export const getDataSuccess = (payload) => ({
  type: GET_DATA_SUCCESS,
  payload,
});

export const getDataError = (error) => ({
  type: GET_DATA_ERROR,
  payload: error || "Something went wrong",
});

export const sortLowToHigh = () => ({
  type: SORT_LOW_TO_HIGH,
});

export const sortHighToLow = () => ({
  type: SORT_HIGH_TO_LOW,
});

export const ratingLowToHigh = () => ({
  type: RATING_LOW_TO_HIGH,
});

export const ratingHighToLow = () => ({
  type: RATING_HIGH_TO_LOW,
});

export const nameAtoZ = () => ({
  type: NAME_A_TO_Z,
});

export const nameZtoA = () => ({
  type: NAME_Z_TO_A,
});

export const getPriceRange = (payload) => ({
  type: GET_PRICE_RANGE,
  payload,
});

export const setAllFilters = (payload) => ({
  type: SET_ALL_FILTERS,
  payload,
});

export const resetFilters = () => ({
  type: RESET_FILTERS,
});

/* ================= ASYNC ACTION ================= */
/**
 * path examples:
 *  - undefined → all products
 *  - "boys" | "girls" | "unisex" → category filter
 *  - "combo" → productType filter
 */
export const getRequest = (path) => async (dispatch) => {
  dispatch(getDataLoading());

  try {
    let url = "/products";

    if (path) {
      const normalizedPath = path.toLowerCase().trim();

      /* Category filters */
      if (["boys", "girls", "unisex"].includes(normalizedPath)) {
        url = `/products?category=${normalizedPath}`;
      }

      /* Product type filters */
      else if (normalizedPath === "combo") {
        url = `/products?productType=combo`;
      }
    }

    const res = await api.get(url);

    /**
     * Backend response shape:
     * {
     *   success: true,
     *   count: number,
     *   products: [...]
     * }
     */
    const products = Array.isArray(res?.data?.products)
      ? res.data.products
      : [];

    dispatch(getDataSuccess(products));
  } catch (err) {
    console.error("❌ Product fetch failed:", err);
    dispatch(getDataError(err?.message));
  }
};
