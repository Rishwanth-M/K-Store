import {
  isCheckoutFormEmpty,
  validateEmail,
  validateMobile,
  validatePinCode
} from "../../utils/formValidator";

import { CheckoutOrderSummary } from "../../components/checkout/CheckoutOrderSummary";
import { CheckoutForm } from "../../components/checkout/CheckoutForm";
import {
  Box,
  Checkbox,
  Flex,
  Text,
  Button,
  useToast
} from "@chakra-ui/react";
import { setToast } from "../../utils/extraFunctions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { initPayment } from "../payment/razorpay";
import { useEffect, useState } from "react";
import axios from "axios";
import { updateCartDetails } from "../../redux/features/cart/actions";
import { useNavigate } from "react-router-dom";

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
  /* ================= AUTH DATA ================= */
  const { token, user } = useSelector((state) => state.authReducer);

  const { orderSummary, cartProducts } = useSelector(
    (state) => state.cartReducer,
    shallowEqual
  );

  /* ================= STATE ================= */
  const [form, setForm] = useState(initState);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [saveAddress, setSaveAddress] = useState(false);
  const [isUsingSavedAddress, setIsUsingSavedAddress] = useState(false);
  const [originalSavedAddress, setOriginalSavedAddress] = useState(null);

  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* =====================================================
     STEP 2: AUTO-FILL EMAIL FROM LOGGED-IN USER
  ===================================================== */
  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({
        ...prev,
        email: user.email,
      }));
    }
  }, [user?.email]);

  /* =====================================================
     FETCH SAVED ADDRESSES
  ===================================================== */
  useEffect(() => {
    if (!token) return;

    axios
      .get("/users/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSavedAddresses(res.data.addresses || []))
      .catch(() => setSavedAddresses([]));
  }, [token]);

  /* =====================================================
     INPUT CHANGE
  ===================================================== */
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

  /* =====================================================
     USE SAVED ADDRESS
  ===================================================== */
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

  /* =====================================================
     STEP 4: SAVE ADDRESS (EMAIL INCLUDED)
  ===================================================== */
  const saveAddressIfNeeded = async () => {
    if (!saveAddress) return;

    try {
      await axios.post("/users/addresses", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: "Address saved successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Failed to save address",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  /* =====================================================
     VALIDATION
  ===================================================== */
  const handleFormValidation = (form) => {
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

  /* =====================================================
     SUBMIT
  ===================================================== */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!handleFormValidation(form)) return;

    await saveAddressIfNeeded();

    try {
      const { data } = await axios.post("/api/payment/order", {
        amount: orderSummary.total,
      });

      if (data.demo) {
        await axios.post(
          "/order",
          {
            cartProducts,
            shippingDetails: form,
            paymentDetails: {
              paymentMode: "DEMO",
              paymentStatus: "SUCCESS",
            },
            orderSummary,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        dispatch(updateCartDetails());
        setToast(toast, "Order placed successfully", "success");
        navigate("/orders");
        return;
      }

      initPayment(
        form,
        data,
        orderSummary,
        cartProducts,
        token,
        toast,
        dispatch,
        navigate
      );
    } catch {
      setToast(toast, "Checkout failed", "error");
    }
  };

  /* =====================================================
     UI
  ===================================================== */
  return (
    <Box
      p="20px"
      my="30px"
      mx="auto"
      maxW="1200px"
      display="grid"
      gap="10%"
      gridTemplateColumns={["100%", "100%", "55% 35%"]}
    >
      <Box>
        <Box mb="6">
          <Text fontSize="20px" fontWeight={600} mb="3">
            Saved Addresses
          </Text>

          {savedAddresses.length > 0 ? (
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
                <Text fontSize="14px">{addr.email}</Text>

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
