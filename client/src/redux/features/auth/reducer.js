import {
  GET_TOKEN,
  REMOVE_TOKEN,
  SHOW_LOGIN_PAGE,
  SHOW_RESET_PAGE,
  SHOW_SIGNUP_PAGE,
} from "./actionTypes";

import {
  getItem,
  setItem,
  removeItem,
} from "../../../utils/localstorage";

const initialState = {
  isLogin: true,        // default to login view
  isReset: false,
  token: getItem("token") || null,
  user: getItem("user") || null,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_LOGIN_PAGE:
      return {
        ...state,
        isLogin: true,
        isReset: false,
      };

    case SHOW_RESET_PAGE:
      return {
        ...state,
        isLogin: false,
        isReset: true,
      };

    case SHOW_SIGNUP_PAGE:
      return {
        ...state,
        isLogin: false,
        isReset: false,
      };

    case GET_TOKEN: {
      const { token, user } = payload;

      // Persist securely
      setItem("token", token);
      setItem("user", user);

      return {
        ...state,
        token,
        user,
        isLogin: false,
        isReset: false,
      };
    }

    case REMOVE_TOKEN:
      // Clear storage completely
      removeItem("token");
      removeItem("user");

      return {
        ...state,
        token: null,
        user: null,
        isLogin: true,
        isReset: false,
      };

    default:
      return state;
  }
};
