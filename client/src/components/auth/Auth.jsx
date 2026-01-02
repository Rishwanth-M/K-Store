import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  showLoginPage,
  showSignupPage,   // ✅ ADD THIS
} from "../../redux/features/auth/actions";

import { LoginForm } from "./LoginForm";
import { ResetForm } from "./ResetForm";
import { SignupForm } from "./SignupForm";

export const Auth = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.authReducer.isLogin);
  const isReset = useSelector((state) => state.authReducer.isReset);

  const displayLogin = () => {
    dispatch(showLoginPage());
  };

  const displaySignup = () => {
    dispatch(showSignupPage());
  };

  return (
    <>
      <Button
        onClick={onOpen}
        bg="transparent"
        size="sm"
        aria-label="Open authentication modal"
      >
        Sign up
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          <ModalHeader
            fontWeight="700"
            fontSize="23px"
            mt="40px"
            mx="10%"
            textAlign="center"
          >
            {isLogin
              ? "YOUR ACCOUNT FOR EVERYTHING Kreedentials"
              : isReset
              ? "RESET PASSWORD"
              : "BECOME A Kreedentials MEMBER"}
          </ModalHeader>

          <ModalBody>
            {isLogin && <LoginForm />}
            {isReset && <ResetForm />}
            {!isLogin && !isReset && <SignupForm />}

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
                onClick={
                  isLogin || isReset
                    ? displaySignup   // ✅ FIX
                    : displayLogin
                }
              >
                {isLogin || isReset ? "Signup" : "Login"}
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
