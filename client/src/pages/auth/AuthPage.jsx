import { Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import {
  showLoginPage,
  showResetPage,
  showSignupPage,
} from "../../redux/features/auth/actions";

import { LoginForm } from "../../components/auth/LoginForm";
import { ResetForm } from "../../components/auth/ResetForm";
import { SignupForm } from "../../components/auth/SignupForm";

export const AuthPage = () => {
  const { isLogin, isReset } = useSelector(
    (state) => state.authReducer
  );

  const dispatch = useDispatch();

  const handleSwitchAuth = () => {
    if (isLogin || isReset) {
      dispatch(showSignupPage());
    } else {
      dispatch(showLoginPage());
    }
  };

  return (
    <Box w={["95%", "95%", "50%", "37%", "27%"]} m="20px auto">
      {/* HEADER */}
      <Text
        fontWeight="700"
        fontSize="23px"
        my="40px"
        mx="10%"
        textAlign="center"
      >
        {isLogin
          ? "YOUR ACCOUNT FOR EVERYTHING Kreedentials"
          : isReset
          ? "RESET PASSWORD"
          : "BECOME A Kreedentials MEMBER"}
      </Text>

      {/* FORM */}
      {isLogin && <LoginForm />}
      {isReset && <ResetForm />}
      {!isLogin && !isReset && <SignupForm />}

      {/* FOOTER SWITCH */}
      <Box textAlign="center" mt="20px">
        <Text display="inline" color="#b0a8af">
          {isLogin
            ? "Not a Member? "
            : isReset
            ? "Or return to "
            : "Already a Member? "}
        </Text>

        <Text
          display="inline"
          textDecoration="underline"
          cursor="pointer"
          onClick={handleSwitchAuth}
        >
          {isLogin || isReset ? "Signup" : "Login"}
        </Text>
      </Box>
    </Box>
  );
};
