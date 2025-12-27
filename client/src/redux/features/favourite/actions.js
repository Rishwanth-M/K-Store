import {
  ADD_TO_FAVOURITE,
  GET_FAVOURITE_ERROR,
  GET_FAVOURITE_LOADING,
  GET_FAVOURITE_SUCCESS
} from "./actionTypes";

import { setToast } from "../../../utils/extraFunctions";
import axios from "axios";

export const addToFavourite = (payload) => ({
  type: ADD_TO_FAVOURITE,
  payload
});

export const getFavouriteLoading = () => ({
  type: GET_FAVOURITE_LOADING
});

export const getFavouriteSuccess = (payload) => ({
  type: GET_FAVOURITE_SUCCESS,
  payload
});

export const getFavouriteError = () => ({
  type: GET_FAVOURITE_ERROR
});

// ✅ ADD TO FAVOURITE
export const addToFavouriteRequest = (data, token, toast) => async () => {
  try {
    await axios.post(
      "/favourite",
      data, // 🔥 DO NOT delete _id
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setToast(toast, "Item added to favourites", "success");
  } catch (err) {
    console.log(err?.response?.data);

    if (err?.response?.status === 400) {
      setToast(toast, err.response.data.message, "info");
    } else {
      setToast(toast, "Something went wrong", "error");
    }
  }
};

// ✅ GET FAVOURITES
export const getFavouriteRequest = (token) => async (dispatch) => {
  try {
    dispatch(getFavouriteLoading());

    const res = await axios.get("/favourite", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(getFavouriteSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getFavouriteError());
  }
};

// ✅ DELETE FAVOURITE
export const deleteFavouriteRequest = (id, token, toast) => async (dispatch) => {
  try {
    dispatch(getFavouriteLoading());

    axios.delete(`/favourite/${id}`, {
  headers: { Authorization: `Bearer ${token}` }
});


    dispatch(getFavouriteRequest(token));
    setToast(toast, "Product removed from favourites", "success");
  } catch (err) {
    console.log(err);
    dispatch(getFavouriteError());
    setToast(toast, "Something went wrong", "error");
  }
};
