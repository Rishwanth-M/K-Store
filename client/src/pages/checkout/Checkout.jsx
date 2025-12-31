import {
  isCheckoutFormEmpty,
  validateEmail,
  validateMobile,
  validatePinCode,
} from "../../utils/formValidator";

import { CheckoutOrderSummary } from "../../components/checkout/CheckoutOrderSummary";
import { CheckoutForm } from "../../components/checkout/CheckoutForm";

import {
  Box,
  Checkbox,
  Flex,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";

import { setToast } from "../../utils/extraFunctions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  /* ================= AUTH ================= */
  const { token, user } = useSelector((state) => state.authReducer);

  /* 🔒 AUTH GUARD */
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  /* ================= CART ================= */
  const { orderSummary, cartProducts = [] } = useSelector(
    (state) => state.cartReducer,
    shallowEqual
  );

  /* 🛒 EMPTY CART GUARD */
  if (!cartProducts.length) {
    return <Navigate to="/allProducts" replace />;
  }

  /* ================= STATE ================= */
  const [form, setForm] = useState(initState);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [saveAddress, setSaveAddress] = useState(false);
  const [isUsingSavedAddress, setIsUsingSavedAddress] = useState(false);
  const [originalSavedAddress, setOriginalSavedAddress] = useState(null);

  /* ================= AUTO-FILL EMAIL ================= */
  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({ ...prev, email: user.email }));
    }
  }, [user?.email]);

  /* ================= FETCH SAVED ADDRESSES ================= */
  useEffect(() => {
    axios
      .get("/users/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSavedAddresses(res.data.addresses || []))
      .catch(() => setSavedAddresses([]));
  }, [token]);

  /* ================= INPUT CHANGE ================= */
  const handleInputChange = ({ target: { name, value } }) => {
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    if (isUsingSavedAddress && originalSavedAddress) {
      const isModified = Object.keys(originalSavedAddress).some(
        (key) => originalSavedAddress[key] !== updatedForm[key]
      );

      if (isModified) {
        setIsUsingSavedAddress(false);
        setSaveAddress(true);
      }
    }
  };

  /* ================= USE SAVED ADDRESS ================= */
  const handleUseAddress = (address) => {
    const filledAddress = {
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

    setForm(filledAddress);
    setOriginalSavedAddress(filledAddress);
    setIsUsingSavedAddress(true);
    setSaveAddress(false);
  };

  /* ================= SAVE ADDRESS ================= */
  const saveAddressIfNeeded = async () => {
    if (!saveAddress) return;

    try {
      await axios.post("/users/addresses", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      setToast(toast, "Failed to save address", "error");
    }
  };

  /* ================= VALIDATION ================= */
  const handleFormValidation = () => {
    const isEmpty = isCheckoutFormEmpty(form);
    if (!isEmpty.status) return setToast(toast, isEmpty.message, "error");

    const isEmail = validateEmail(form.email);
    if (!isEmail.status) return setToast(toast, isEmail.message, "error");

    const isPinCode = validatePinCode(form.pinCode);
    if (!isPinCode.status) return setToast(toast, isPinCode.message, "error");

    const isMobile = validateMobile(form.mobile);
    if (!isMobile.status) return setToast(toast, isMobile.message, "error");

    return true;
  };

  /* ================= SUBMIT ================= */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!handleFormValidation()) return;

    await saveAddressIfNeeded();

    /* ✅ NORMALIZE CART */
    const normalizedCart = cartProducts.map((item) => ({
      _id: item._id,
      quantity: Number(item.quantity),
      size: item.size,
    }));

    try {
      const { data } = await axios.post(
        "/api/payment/order",
        {
          cartProducts: normalizedCart,
          shippingDetails: form,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!data?.redirectUrl) {
        throw new Error("Redirect URL missing");
      }

      window.location.href = data.redirectUrl;
    } catch {
      setToast(toast, "Payment initiation failed", "error");
    }
  };

  /* ================= UI ================= */
  return (
    <Box
      p="20px"
      my="30px"
      mx="auto"
      maxW="1200px"
      display="grid"
      gap="10%"
      gridTemplateColumns={{ base: "100%", md: "55% 35%" }}
    >
      <Box>
        <Box mb="6">
          <Text fontSize="20px" fontWeight={600} mb="3">
            Saved Addresses
          </Text>

          {savedAddresses.length ? (
            savedAddresses.map((addr, i) => (
              <Box
                key={i}
                p="4"
                mb="3"
                border="1px solid #e2e8f0"
                borderRadius="8px"
              >
                <Text fontWeight={600}>
                  {addr.firstName} {addr.lastName}
                </Text>
                <Text fontSize="14px">
                  {addr.addressLine1}, {addr.locality}
                </Text>
                <Text fontSize="14px">
                  {addr.state}, {addr.country} - {addr.pinCode}
                </Text>

                <Button size="sm" mt="2" onClick={() => handleUseAddress(addr)}>
                  Use this address
                </Button>
              </Box>
            ))
          ) : (
            <Text fontSize="14px" color="gray.500">
              No saved addresses found
            </Text>
          )}
        </Box>

        <CheckoutForm form={form} onChange={handleInputChange} />

        <Flex mt="5">
          <Checkbox
            isChecked={saveAddress}
            isDisabled={isUsingSavedAddress}
            onChange={(e) => setSaveAddress(e.target.checked)}
          >
            Save this address to my account
          </Checkbox>
        </Flex>
      </Box>

      <CheckoutOrderSummary
        onClick={handleFormSubmit}
        orderSummary={orderSummary}
      />
    </Box>
  );
};
