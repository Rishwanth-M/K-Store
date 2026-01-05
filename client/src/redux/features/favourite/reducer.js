import {
  GET_FAVOURITE_LOADING,
  GET_FAVOURITE_SUCCESS,
  GET_FAVOURITE_ERROR,
  CLEAR_FAVOURITE_ON_LOGOUT,
} from "./actionTypes";

const initState = {
  favourites: [],
  isLoading: false,
  isError: false,
};

export const favouriteReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_FAVOURITE_LOADING:
      return { ...state, isLoading: true };

    case GET_FAVOURITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        favourites: payload,
      };

    case GET_FAVOURITE_ERROR:
      return { ...state, isLoading: false, isError: true };

    case CLEAR_FAVOURITE_ON_LOGOUT:
      return initState;

    default:
      return state;
  }
};
