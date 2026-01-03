import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Public = ({ children }) => {
  const token = useSelector((state) => state.authReducer.token);

  // If logged in, block auth pages
  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};
