import "./App.css";
import { Router } from "./routes/Router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./redux/features/cart/cart.api";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [token, dispatch]);

  return <Router />;
}

export default App;
