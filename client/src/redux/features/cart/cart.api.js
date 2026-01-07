import api from "../../../utils/api";
import { UPDATE_CART_DETAILS } from "./actionTypes";
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
    console.error("❌ Fetch cart failed:", error);
  }
};

/* ================= UPDATE CART (ADD / REDUCE) ================= */
export const updateCartDB = (payload, toast) => async (dispatch) => {
  try {
    await api.post("/cart", payload); // backend uses operation field

    dispatch(fetchCart());
  } catch (error) {
    toast?.({
      title: error?.response?.data?.message || "Cart update failed",
      status: "error",
    });
  }
};

/* ================= REMOVE FROM CART ================= */
export const removeFromCartDB = (id, toast) => async (dispatch) => {
  try {
    await api.delete(`/cart/${id}`);

    dispatch(fetchCart());
  } catch (error) {
    toast?.({
      title: "Failed to remove item",
      status: "error",
    });
  }
};
