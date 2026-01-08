import { Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

/* ================= PAGES ================= */
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
import { PaymentFailed } from "../pages/payment/PaymentFailed";
import { OrderSuccess } from "../pages/OrderSuccess";

/* ================= POLICY PAGES ================= */
import TermsConditions from "../pages/policies/TermsConditions";
import PrivacyPolicy from "../pages/policies/PrivacyPolicy";
import RefundPolicy from "../pages/policies/RefundPolicy";
import ReturnPolicy from "../pages/policies/ReturnPolicy";
import ShippingPolicy from "../pages/policies/ShippingPolicy";


/* ================= ROUTE GUARDS ================= */
import { Private } from "./Private";
import { Public } from "./Public";

/* ================= ADMIN ================= */
import { AdminProducts } from "../pages/admin/AdminProducts";
import ProductForm from "../pages/admin/ProductForm";

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
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />

        {/* ================= AUTH (PUBLIC) ================= */}
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

        {/* ================= POLICIES (PUBLIC) ================= */}
        {/* ================= POLICIES (PUBLIC) ================= */}
<Route path="/terms-and-conditions" element={<TermsConditions />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route
  path="/refund-and-cancellation-policy"
  element={<RefundPolicy />}
/>
<Route
  path="/return-and-exchange-policy"
  element={<ReturnPolicy />}
/>
<Route path="/shipping-policy" element={<ShippingPolicy />} />

      </Routes>

      <Footer />
    </>
  );
};
