import { Input, Text, VStack } from "@chakra-ui/react";
import { AuthBtn } from "./AuthBtn";

export const ResetForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack
        w={["95%", "95%", "85%", "85%", "85%"]}
        mx="auto"
        spacing={4}
      >
        <Text color="gray" textAlign="center">
          This feature is not available right now.
          Please create a new account.
        </Text>

        <Input type="email" placeholder="Email address" disabled />

        <AuthBtn value="RESET" />
      </VStack>
    </form>
  );
};
