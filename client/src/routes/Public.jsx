import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const Public = ({ children }) => {
  const token = useSelector((state) => state.authReducer.token);
  const location = useLocation();

  // If user is already logged in,
  // redirect them to where they came from or home
  if (token) {
    const redirectPath = location.state?.from?.pathname || "/";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
