import { Box } from "@radix-ui/themes";
import LogInForm from "../components/auth/Login";

const LoginPage = () => {
  return (
    <Box className="p-12 bg-zinc-900 rounded-lg">
      <LogInForm />
    </Box>
  );
};

export default LoginPage;
