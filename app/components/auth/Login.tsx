"use client";
import { SubmitButton } from "@/lib/SubmitButton";
import { Box, Flex, Heading, TextFieldInput } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to store the error message

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setError(""); // Reset the error message
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await fetch("api/log-in", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Error logging in"); // Set the error message from the API response
    } else {
      console.log(data);
      router.refresh();
      router.push("/");
    }
  };

  return (
    <>
      <Box>
        <form onSubmit={onSubmit}>
          <Flex
            align={"center"}
            justify={"center"}
            style={{ height: "100vh" }}
            position="relative"
            gap={"2"}
            direction={"column"}
          >
            <Box mb={"3"}>
              <Heading>Login</Heading>
            </Box>
            {error && <p style={{ color: "red" }}>{error}</p>}{" "}
            {/* Display error message */}
            <TextFieldInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextFieldInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <SubmitButton>Log in</SubmitButton>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default LogInForm;
