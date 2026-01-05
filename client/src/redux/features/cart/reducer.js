import {
  ADD_TO_CART_SUCCESS,
  APPLY_COUPON_SUCCESS,
  REMOVE_COUPON_SUCCESS,
  REMOVE_FROM_CART,
  UPDATE_CART_DETAILS,
} from "./actionTypes";

const initState = {
  cartProducts: [],        // 🔥 DB-driven
  orderSummary: {
    subTotal: 0,
    quantity: 0,
    shipping: 0,
    discount: 0,
    total: 0,
  },
  isLoading: false,
};

export const cartReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cartProducts: payload.cartProducts,
        orderSummary: payload.orderSummary,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartProducts: payload.cartProducts,
        orderSummary: payload.orderSummary,
      };

    case APPLY_COUPON_SUCCESS:
    case REMOVE_COUPON_SUCCESS:
      return {
        ...state,
        orderSummary: payload,
      };

    case UPDATE_CART_DETAILS:
      return {
        ...state,
        cartProducts: payload.cartProducts,
        orderSummary: payload.orderSummary,
      };

    default:
      return state;
  }
};
