import { Input, Text, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  loginUser,
  showResetPage,
} from "../../redux/features/auth/actions";

import { isLoginFormEmpty } from "../../utils/formValidator";
import { AuthBtn } from "./AuthBtn";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const validation = isLoginFormEmpty(form);
    if (!validation.status) {
      return toast({
        title: validation.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    dispatch(loginUser(form, toast, navigate));
  };

  const displayReset = () => {
    dispatch(showResetPage());
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <VStack
        w={["95%", "95%", "85%", "85%", "85%"]}
        mx="auto"
        spacing={3}
      >
        <Input
          name="email"
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleInputChange}
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleInputChange}
        />

        <Text
          onClick={displayReset}
          _hover={{ textDecoration: "underline" }}
          w="100%"
          color="#b0a8af"
          textAlign="right"
          my="10px"
          cursor="pointer"
        >
          Forgot your password?
        </Text>

        <AuthBtn value="LOGIN" />
      </VStack>
    </form>
  );
};
