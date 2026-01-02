import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const Public = ({ children }) => {
  const token = useSelector((state) => state.authReducer.token);
  const location = useLocation();

  // ✅ Allow auth page internal switching (login/signup/reset)
  if (token && location.pathname !== "/auth") {
    return <Navigate to="/" replace />;
  }

  return children;
};
