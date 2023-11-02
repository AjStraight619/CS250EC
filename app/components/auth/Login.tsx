"use client";
import { SubmitButton } from "@/lib/SubmitButton";
import { Flex, Heading, Text, TextFieldInput } from "@radix-ui/themes";
import Link from "next/link";
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
    <form onSubmit={onSubmit}>
      <Flex direction={"column"} gap={"2"}>
        <Heading align={"center"} mb={"2"}>
          Login
        </Heading>
        {error && <p className="text-red-500">{error}</p>}{" "}
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
        <Flex justify={"center"} mt={"2"}>
          <Text>
            Dont have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </Text>
        </Flex>
      </Flex>
    </form>
  );
};

export default LogInForm;
