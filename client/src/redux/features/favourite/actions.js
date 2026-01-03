import {
  GET_FAVOURITE_ERROR,
  GET_FAVOURITE_LOADING,
  GET_FAVOURITE_SUCCESS,
} from "./actionTypes";

import { setToast } from "../../../utils/extraFunctions";
import api from "../../../utils/api";

/* ================= GET FAVOURITES ================= */
export const getFavouriteRequest = () => async (dispatch) => {
  dispatch({ type: GET_FAVOURITE_LOADING });

  try {
    const res = await api.get("/favourite");

    dispatch({
      type: GET_FAVOURITE_SUCCESS,
      payload: res.data.favourites,
    });
  } catch {
    dispatch({ type: GET_FAVOURITE_ERROR });
  }
};

/* ================= ADD TO FAVOURITE ================= */
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
        setToast(
          toast,
          err?.response?.data?.message || "Unauthorized",
          "error"
        );
      }
    }
  };

/* ================= DELETE FAVOURITE ================= */
export const deleteFavouriteRequest =
  (id, toast) => async (dispatch) => {
    try {
      await api.delete(`/favourite/${id}`);

      setToast(toast, "Removed from favourites", "success");
      dispatch(getFavouriteRequest());
    } catch {
      setToast(toast, "Unauthorized", "error");
    }
  };
