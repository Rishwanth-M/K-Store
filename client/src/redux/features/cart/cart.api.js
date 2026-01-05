import {
  ADD_TO_CART_SUCCESS,
  REMOVE_FROM_CART,
  UPDATE_CART_DETAILS,
} from "./actionTypes";
import { getCartTotal } from "../../../utils/getCartTotal";

const API = import.meta.env.VITE_API_BASE_URL;

/* ================= GET CART ================= */
export const fetchCart = () => async (dispatch) => {
  try {
    const res = await fetch(`${API}/cart`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!data.success) return;

    const cartProducts = data.cartItems || [];
    const orderSummary = getCartTotal(cartProducts);

    dispatch({
      type: UPDATE_CART_DETAILS,
      payload: { cartProducts, orderSummary },
    });
  } catch (error) {
    console.error("❌ Fetch cart failed:", error);
  }
};

/* ================= ADD TO CART ================= */
export const addToCartDB = (payload, toast) => async (dispatch) => {
  try {
    await fetch(`${API}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    // re-fetch cart (same pattern as favourite)
    dispatch(fetchCart());

    toast?.({
      title: "Added to cart",
      status: "success",
    });
  } catch (error) {
    console.error("❌ Add to cart failed:", error);
  }
};

/* ================= REMOVE FROM CART ================= */
export const removeFromCartDB = (id, toast) => async (dispatch) => {
  try {
    await fetch(`${API}/cart/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    dispatch(fetchCart());

    toast?.({
      title: "Removed from cart",
      status: "success",
    });
  } catch (error) {
    console.error("❌ Remove cart failed:", error);
  }
};
