import { Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

import { AuthPage } from "../pages/auth/AuthPage";
import { Cart } from "../pages/cart/Cart";
import { Checkout } from "../pages/checkout/Checkout";
import { Description } from "../pages/description/Description";
import { Favourite } from "../pages/favourite/Favourite";
import { Footer } from "../pages/footer/Footer";
import { Home } from "../pages/home/Home";
import { Navbar } from "../pages/navbar/Navbar";
import { Order } from "../pages/orders/Order";
import { Products } from "../pages/products/Products";
import { PaymentSuccess } from "../pages/payment/PaymentSuccess";

import { Private } from "./Private";
import { Public } from "./Public";

/* 🔐 ADMIN (AUTH ONLY FOR NOW) */
import { AdminProducts } from "../pages/admin/AdminProducts";
import ProductForm from "../pages/admin/ProductForm";

/* ❌ OPTIONAL: create later */
// import { NotFound } from "../pages/NotFound";

export const Router = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />

      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/allProducts" element={<Products />} />
        <Route path="/men" element={<Products />} />
        <Route path="/women" element={<Products />} />
        <Route path="/kids" element={<Products />} />
        <Route path="/description" element={<Description />} />

        <Route path="/payment-success" element={<PaymentSuccess />} />

        <Route
          path="/auth"
          element={
            <Public>
              <AuthPage />
            </Public>
          }
        />

        {/* ================= PRIVATE ================= */}
        <Route
          path="/cart"
          element={
            <Private>
              <Cart />
            </Private>
          }
        />

        <Route
          path="/favourite"
          element={
            <Private>
              <Favourite />
            </Private>
          }
        />

        <Route
          path="/checkout"
          element={
            <Private>
              <Checkout />
            </Private>
          }
        />

        <Route
          path="/orders"
          element={
            <Private>
              <Order />
            </Private>
          }
        />

        {/* ================= ADMIN ================= */}
        {/* ⚠️ Auth-only for now, role-based later */}
        <Route
          path="/admin/products"
          element={
            <Private>
              <AdminProducts />
            </Private>
          }
        />

        <Route
          path="/admin/products/new"
          element={
            <Private>
              <ProductForm />
            </Private>
          }
        />

        <Route
          path="/admin/products/edit/:id"
          element={
            <Private>
              <ProductForm />
            </Private>
          }
        />

        {/* ================= FALLBACK ================= */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      <Footer />
    </>
  );
};
