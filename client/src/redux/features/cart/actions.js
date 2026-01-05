import { setToast } from "../../../utils/extraFunctions";
import api from "../../../utils/api";
import { UPDATE_CART_DETAILS } from "./actionTypes";

/* ================= GET CART ================= */
export const fetchCartRequest = () => async (dispatch) => {
  try {
    const res = await api.get("/cart");

    if (!res.data.success) return;

    dispatch({
      type: UPDATE_CART_DETAILS,
      payload: {
        cartProducts: res.data.cartItems,
        orderSummary: {
          subTotal: 0,
          quantity: res.data.cartItems.length,
          shipping: 0,
          discount: 0,
          total: 0,
        },
      },
    });
  } catch (error) {
    console.error("❌ Fetch cart failed:", error.message);
  }
};

/* ================= ADD TO CART ================= */
export const addToCartDB = (data, toast) => async (dispatch) => {
  try {
    await api.post("/cart", data);
    dispatch(fetchCartRequest());

    setToast(toast, "Added to cart", "success");
  } catch (error) {
    setToast(
      toast,
      error?.response?.data?.message || "Add to cart failed",
      "error"
    );
  }
};

/* ================= REMOVE FROM CART ================= */
export const removeFromCartDB = (id, toast) => async (dispatch) => {
  try {
    await api.delete(`/cart/${id}`);
    dispatch(fetchCartRequest());

    setToast(toast, "Removed from cart", "success");
  } catch {
    setToast(toast, "Remove failed", "error");
  }
};

/* ================= CLEAR CART ON LOGOUT ================= */
export const clearCartOnLogout = () => ({
  type: UPDATE_CART_DETAILS,
  payload: {
    cartProducts: [],
    orderSummary: {
      subTotal: 0,
      quantity: 0,
      shipping: 0,
      discount: 0,
      total: 0,
    },
  },
});
