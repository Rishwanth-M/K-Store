import { Input, Select, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signupUser } from "../../redux/features/auth/actions";
import {
  isSignupFormEmpty,
  validateEmail,
  validatePassword,
} from "../../utils/formValidator";

import { AuthBtn } from "./AuthBtn";

export const SignupForm = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
  };

  const [form, setForm] = useState(initialState);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // 1️⃣ Empty check
    const emptyCheck = isSignupFormEmpty(form);
    if (!emptyCheck.status) {
      return toast({
        title: emptyCheck.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    // 2️⃣ Email validation
    const emailCheck = validateEmail(form.email);
    if (!emailCheck.status) {
      return toast({
        title: emailCheck.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    // 3️⃣ Password validation
    const passwordCheck = validatePassword(form.password);
    if (!passwordCheck.status) {
      return toast({
        title: "Password requirements not met",
        description: passwordCheck.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }

    // ✅ 4️⃣ BACKEND-COMPATIBLE PAYLOAD
    const payload = {
      email: form.email,
      password: form.password,
      name: `${form.firstName} ${form.lastName}`, // 🔑 REQUIRED BY BACKEND
    };

    dispatch(signupUser(payload, toast, navigate));
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
          autoComplete="new-password"
        />

        <Input
          name="firstName"
          type="text"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleInputChange}
        />

        <Input
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleInputChange}
        />

        <Select
          name="gender"
          placeholder="Choose Gender"
          value={form.gender}
          onChange={handleInputChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Select>

        <Input
          name="dateOfBirth"
          type="date"
          value={form.dateOfBirth}
          onChange={handleInputChange}
        />

        <AuthBtn value="JOIN US" />
      </VStack>
    </form>
  );
};
