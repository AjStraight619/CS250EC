"use client";
import { SubmitButton } from "@/lib/SubmitButton";
import { Box, Flex, Heading, TextFieldInput } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await fetch("api/log-in", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      console.log("Status: " + res.status);
    }
    const data = await res.json();
    console.log(data);
    router.push("/");
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
