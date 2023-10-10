"use client";
import * as Form from "@radix-ui/react-form";
import { Button, TextFieldInput } from "@radix-ui/themes";
import { useState } from "react";

const LogIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    const res = await fetch("/api/log-in", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      console.log("Status: " + res.status);
    }
    const data = await res.json();
    const { token } = data;
    console.log(token);
  };

  return (
    <Form.Root onSubmit={onSubmit} className="space-y-4 w-full sm:w-[400px]">
      <Form.Field name="email" className="flex flex-col">
        <Form.Label className="FormLabel">Name</Form.Label>
        <Form.Control asChild>
          <TextFieldInput
            className="Input"
            type="name"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            placeholder="Enter your name..."
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="email" className="flex flex-col">
        <Form.Label className="FormLabel">Email</Form.Label>
        <Form.Control asChild>
          <TextFieldInput
            className="Input"
            type="email"
            required
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            placeholder="Enter your email..."
          />
        </Form.Control>
        <Form.Message match="valueMissing">
          Please enter your email
        </Form.Message>
        <Form.Message match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </Form.Field>

      <Form.Field name="password" className="flex flex-col">
        <Form.Label className="FormLabel">Password</Form.Label>
        <Form.Control asChild>
          <TextFieldInput
            className="Input"
            type="password"
            required
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder="Create a password..."
          />
        </Form.Control>
        <Form.Message match="valueMissing">
          Please enter a password
        </Form.Message>
      </Form.Field>
      <Form.Submit asChild>
        <Button>Sign up</Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default LogIn;
