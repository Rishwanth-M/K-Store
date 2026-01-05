import api from "../../../utils/api";
import {
  ADD_TO_CART_SUCCESS,
  REMOVE_FROM_CART,
  UPDATE_CART_DETAILS,
} from "./actionTypes";
import { getCartTotal } from "../../../utils/getCartTotal";

/* ================= GET CART ================= */
export const fetchCart = () => async (dispatch) => {
  try {
    const res = await api.get("/cart");

    const cartProducts = res.data.cartItems || [];
    const orderSummary = getCartTotal(cartProducts);

    dispatch({
      type: UPDATE_CART_DETAILS,
      payload: { cartProducts, orderSummary },
    });
  } catch (error) {
    console.error("❌ Fetch cart failed:", error?.response?.data || error);
  }
};

/* ================= ADD TO CART ================= */
export const addToCartDB = (payload, toast) => async (dispatch) => {
  try {
    await api.post("/cart", payload);

    dispatch(fetchCart());

    toast?.({
      title: "Added to cart",
      status: "success",
    });
  } catch (error) {
    toast?.({
      title: error?.response?.data?.message || "Unauthorized",
      status: "error",
    });
  }
};

/* ================= REMOVE FROM CART ================= */
export const removeFromCartDB = (id, toast) => async (dispatch) => {
  try {
    await api.delete(`/cart/${id}`);

    dispatch(fetchCart());

    toast?.({
      title: "Removed from cart",
      status: "success",
    });
  } catch (error) {
    toast?.({
      title: "Unauthorized",
      status: "error",
    });
  }
};
