import { Flex, Box } from "@radix-ui/themes";
import SignIn from "../components/auth/Signup";
import { redirect } from "next/navigation";

const LoginPage = () => {
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Box className="p-12 bg-zinc-900 rounded-lg">
        <SignIn />
      </Box>
    </Flex>
  );
};

export default LoginPage;
