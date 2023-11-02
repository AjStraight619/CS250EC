import { Box, Flex } from "@radix-ui/themes";
import SignInForm from "../components/auth/Signup";

const SignUpPage = () => {
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }} gap={"2"}>
      <Box className="p-12 bg-zinc-900 rounded-lg">
        <SignInForm />
      </Box>
    </Flex>
  );
};

export default SignUpPage;
