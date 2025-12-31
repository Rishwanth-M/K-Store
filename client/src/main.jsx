import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import axios from "axios";

import { store } from "./redux/store/store";
import { theme } from "./theme";

/* ================= AXIOS GLOBAL CONFIG ================= */

// Base API URL (Vite environment variable)
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

// Optional: send cookies if needed later (safe default)
axios.defaults.withCredentials = false;

// Log base URL only in development
if (import.meta.env.DEV) {
  console.log("✅ API BASE URL:", import.meta.env.VITE_API_BASE_URL);
}

/* ================= APP RENDER ================= */

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);
