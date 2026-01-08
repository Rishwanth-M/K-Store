import {
  isCheckoutFormEmpty,
  validateEmail,
  validateMobile,
  validatePinCode,
} from "../../utils/formValidator";

import { CheckoutForm } from "../../components/checkout/CheckoutForm";
import { CheckoutLayout } from "../../components/checkout/CheckoutLayout";
import { AddressSection } from "../../components/checkout/AddressSection";
import { PaymentMethodSection } from "../../components/checkout/PaymentMethodSection";
import { OrderSummaryCard } from "../../components/checkout/OrderSummaryCard";
import { PlaceOrderButton } from "../../components/checkout/PlaceOrderButton";

import {
  Box,
  Checkbox,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";

import { setToast } from "../../utils/extraFunctions";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Navigate, useNavigate } from "react-router-dom";

/* ================= INITIAL FORM ================= */
const initState = {
  firstName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  locality: "",
  pinCode: "",
  state: "",
  country: "",
  email: "",
  mobile: "",
};

export const Checkout = () => {
  const toast = useToast();
  const navigate = useNavigate();

  /* ================= AUTH ================= */
  const { token, user } = useSelector((state) => state.authReducer);
  if (!token) return <Navigate to="/auth" replace />;

  /* ================= CART ================= */
  const { orderSummary, cartProducts = [] } = useSelector(
    (state) => state.cartReducer,
    shallowEqual
  );

  if (!cartProducts.length) {
    return <Navigate to="/allProducts" replace />;
  }

  /* ================= STATE ================= */
  const [form, setForm] = useState(initState);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [saveAddress, setSaveAddress] = useState(false);
  const [isUsingSavedAddress, setIsUsingSavedAddress] = useState(false);
  const [originalSavedAddress, setOriginalSavedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  /* ================= AUTO-FILL EMAIL ================= */
  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({ ...prev, email: user.email }));
    }
  }, [user?.email]);

  /* ================= FETCH SAVED ADDRESSES ================= */
  useEffect(() => {
    api
      .get("/users/addresses")
      .then((res) => setSavedAddresses(res.data.addresses || []))
      .catch(() => setSavedAddresses([]));
  }, []);

  /* ================= INPUT CHANGE ================= */
  const handleInputChange = ({ target: { name, value } }) => {
    const updated = { ...form, [name]: value };
    setForm(updated);

    if (isUsingSavedAddress && originalSavedAddress) {
      const modified = Object.keys(originalSavedAddress).some(
        (k) => originalSavedAddress[k] !== updated[k]
      );

      if (modified) {
        setIsUsingSavedAddress(false);
        setSaveAddress(true);
      }
    }
  };

  /* ================= USE SAVED ADDRESS ================= */
  const handleUseAddress = (address) => {
    const filled = {
      firstName: address.firstName || "",
      lastName: address.lastName || "",
      addressLine1: address.addressLine1 || "",
      addressLine2: address.addressLine2 || "",
      locality: address.locality || "",
      pinCode: address.pinCode || "",
      state: address.state || "",
      country: address.country || "",
      email: address.email || user?.email || "",
      mobile: address.mobile || "",
    };

    setForm(filled);
    setOriginalSavedAddress(filled);
    setIsUsingSavedAddress(true);
    setSaveAddress(false);
  };

  /* ================= SAVE ADDRESS ================= */
  const saveAddressIfNeeded = async () => {
    if (!saveAddress) return;
    try {
      await api.post("/users/addresses", form);
    } catch {
      setToast(toast, "Failed to save address", "error");
    }
  };

  /* ================= VALIDATION ================= */
  const handleFormValidation = () => {
    const empty = isCheckoutFormEmpty(form);
    if (!empty.status) return setToast(toast, empty.message, "error");

    const email = validateEmail(form.email);
    if (!email.status) return setToast(toast, email.message, "error");

    const pin = validatePinCode(form.pinCode);
    if (!pin.status) return setToast(toast, pin.message, "error");

    const mobile = validateMobile(form.mobile);
    if (!mobile.status) return setToast(toast, mobile.message, "error");

    return true;
  };

  /* ================= SUBMIT ================= */
  const handleFormSubmit = async () => {
    if (!handleFormValidation()) return;

    try {
      await saveAddressIfNeeded();

      const normalizedCart = cartProducts.map((item) => {
        const productId =
          item.product ||
          item.product?._id ||
          item.productId;

        if (!productId) throw new Error("Invalid cart item");

        return {
          _id: productId,
          quantity: Number(item.quantity),
          size: item.size,
        };
      });

      const orderRes = await api.post("/order/cod", {
        cartProducts: normalizedCart,
        shippingDetails: form,
      });

      if (!orderRes.data?.orderId) {
        throw new Error("Order failed");
      }

      setToast(toast, "Order placed successfully (Cash on Delivery)", "success");
      navigate(`/order-success/${orderRes.data.orderId}`);
    } catch (err) {
      console.error(err);
      setToast(toast, err.message || "Order failed", "error");
    }
  };

  /* ================= UI ================= */
  return (
  <CheckoutLayout
    left={
      <>
        {/* ADDRESS + FORM */}
        <AddressSection>
          {savedAddresses.length ? (
            savedAddresses.map((addr, i) => (
              <Box
                key={i}
                mb="4"
                p="4"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="10px"
                _hover={{ borderColor: "green.400" }}
              >
                <Text fontWeight="600">
                  {addr.firstName} {addr.lastName}
                </Text>
                <Text fontSize="14px" color="gray.500">
                  {addr.addressLine1}, {addr.locality}
                </Text>
                <Button
                  size="sm"
                  mt="2"
                  onClick={() => handleUseAddress(addr)}
                >
                  Use this address
                </Button>
              </Box>
            ))
          ) : (
            <Text fontSize="14px" color="gray.500">
              No saved addresses found
            </Text>
          )}

          <CheckoutForm form={form} onChange={handleInputChange} />

          <Checkbox
            mt="5"
            isChecked={saveAddress}
            isDisabled={isUsingSavedAddress}
            onChange={(e) => setSaveAddress(e.target.checked)}
          >
            Save this address
          </Checkbox>
        </AddressSection>
      </>
    }
    right={
  <Box
    position={{ md: "sticky" }}
    top="100px"
    display="flex"
    flexDirection="column"
    gap="24px"
  >
    <OrderSummaryCard orderSummary={orderSummary} />

    <PaymentMethodSection
      value={paymentMethod}
      onChange={setPaymentMethod}
    />

    <PlaceOrderButton
      paymentMethod={paymentMethod}
      onClick={handleFormSubmit}
    />
  </Box>
}

  />
);

};
