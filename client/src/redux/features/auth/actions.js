import axios from "axios";
import { setToast } from "../../../utils/extraFunctions";
import {
  GET_TOKEN,
  REMOVE_TOKEN,
  SHOW_LOGIN_PAGE,
  SHOW_RESET_PAGE,
} from "./actionTypes";

/* ================= UI ACTIONS ================= */

export const showLoginPage = () => ({ type: SHOW_LOGIN_PAGE });

export const showResetPage = () => ({ type: SHOW_RESET_PAGE });

export const getToken = (payload) => ({ type: GET_TOKEN, payload });

export const removeToken = () => ({ type: REMOVE_TOKEN });

/* ================= AUTH ASYNC ACTIONS ================= */

// SIGNUP
export const signupUser = (data, toast, navigate) => async (dispatch) => {
  try {
    const response = await axios.post("/signup", data);
    const res = response.data;

    if (!res?.token || !res?.user) {
      throw new Error("Invalid signup response");
    }

    dispatch(getToken({ token: res.token, user: res.user }));

    setToast(toast, "Signup successful", "success");
    navigate(-1);
  } catch (error) {
    console.error("❌ Signup error:", error);

    const message =
      error.response?.data?.message ||
      error.message ||
      "Signup failed";

    setToast(toast, message, "error");
  }
};

// LOGIN
export const loginUser = (data, toast, navigate) => async (dispatch) => {
  try {
    const response = await axios.post("/login", data);
    const res = response.data;

    if (!res?.token || !res?.user) {
      throw new Error("Invalid login response");
    }

    dispatch(getToken({ token: res.token, user: res.user }));

    setToast(toast, "Login successful", "success");
    navigate(-1);
  } catch (error) {
    console.error("❌ Login error:", error);

    const message =
      error.response?.data?.message ||
      error.message ||
      "Login failed";

    setToast(toast, message, "error");
  }
};

// LOGOUT
export const logoutUser = (toast) => (dispatch) => {
  try {
    dispatch(removeToken());
    setToast(toast, "Logout successful", "success");
  } catch (error) {
    console.error("❌ Logout error:", error);
    setToast(toast, "Logout failed", "error");
  }
};
