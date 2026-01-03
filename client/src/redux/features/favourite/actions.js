import {
  GET_FAVOURITE_ERROR,
  GET_FAVOURITE_LOADING,
  GET_FAVOURITE_SUCCESS,
} from "./actionTypes";

import { setToast } from "../../../utils/extraFunctions";
import api from "../../../utils/api"; // axios instance with interceptor
import axios from "axios";

/* ================= GET FAVOURITES ================= */
export const getFavouriteRequest = (token) => async (dispatch) => {
  dispatch({ type: GET_FAVOURITE_LOADING });

  try {
    const res = await axios.get("/favourite", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // ✅ BACKEND RETURNS res.data.favourites
    dispatch({
      type: GET_FAVOURITE_SUCCESS,
      payload: res.data.favourites, // ✅ ARRAY
    });
  } catch (err) {
    dispatch({ type: GET_FAVOURITE_ERROR });
  }
};

export const addToFavouriteRequest =
  (data, toast) => async (dispatch) => {
    try {
      await api.post("/favourite", data);

      setToast(toast, "Added to favourites", "success");
      dispatch(getFavouriteRequest());
    } catch (err) {
      if (err?.response?.status === 409) {
        setToast(toast, "Already in favourites", "info");
      } else {
        setToast(toast, "Something went wrong", "error");
      }
    }
  };

/* ================= DELETE FAVOURITE ================= */
export const deleteFavouriteRequest =
  (id, token, toast) => async (dispatch) => {
    try {
      await axios.delete(`/favourite/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setToast(toast, "Removed from favourites", "success");
      dispatch(getFavouriteRequest(token));
    } catch (err) {
      setToast(toast, "Something went wrong", "error");
    }
  };
