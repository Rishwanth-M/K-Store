import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const Private = ({ children }) => {
  const token = useSelector((state) => state.authReducer.token);
  const location = useLocation();

  // If not authenticated, redirect to auth
  // and remember where user wanted to go
  if (!token) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{ from: location }}
      />
    );
  }

  // Authenticated → allow access
  return children;
};
