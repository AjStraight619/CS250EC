"use client";
import { SubmitButton } from "@/lib/SubmitButton";
import { UserInfo } from "@/types/types";
import { Box, Flex, Heading, Text, TextFieldInput } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpForm = () => {
  const router = useRouter();
  const [passwordError, setPasswordError] = useState("");
  const [userData, setUserData] = useState<UserInfo>({
    email: "",
    password: "",
    confirmedPassword: "",
    name: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  const checkPassword = () => {};

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Reset any previous error
    setPasswordError("");

    // Check if passwords match
    if (userData.password !== userData.confirmedPassword) {
      setPasswordError("Passwords do not match");
      return; // Prevent form submission
    }

    const formData = new FormData();
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("confirmedPassword", userData.confirmedPassword);
    formData.append("name", userData.name);
    formData.append("address.street", userData.address.street);
    formData.append("address.city", userData.address.city);
    formData.append("address.state", userData.address.state);
    formData.append("address.zip", userData.address.zip);
    formData.append("address.country", userData.address.country);

    try {
      const res = await fetch("api/sign-up", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        console.log("Status: " + res.status);
      } else {
        const data = await res.json();
        router.back();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit}>
          <Flex
            direction={"column"}
            gap={"2"}
            align={"center"}
            justify={"center"}
          >
            <Box mb={"3"}>
              <Heading>Sign Up</Heading>
            </Box>

            <Box className="flex justify-start">
              <Text>Account Information</Text>
            </Box>

            <TextFieldInput
              value={userData.email}
              name="email"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Email"
              required
              size={"2"}
            />
            <TextFieldInput
              value={userData.name || ""}
              name="name"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Name"
            />
            <TextFieldInput
              value={userData.password}
              name="password"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="Password"
              type="password"
              required
            />
            <TextFieldInput
              value={userData.confirmedPassword}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  confirmedPassword: e.target.value,
                }))
              }
              placeholder="Confirm Password"
              type="password"
              required
            />

            <Box className="flex justify-start w-full">
              <Text>Address</Text>
            </Box>

            <TextFieldInput
              value={userData.address.street}
              name="address.street"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, street: e.target.value },
                }))
              }
              placeholder="Street"
              required
            />
            <TextFieldInput
              value={userData.address.city}
              name="address.city"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, city: e.target.value },
                }))
              }
              placeholder="City"
              required
            />
            <TextFieldInput
              value={userData.address.state}
              name="address.state"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, state: e.target.value },
                }))
              }
              placeholder="State"
              required
            />
            <TextFieldInput
              value={userData.address.zip}
              name="address.zip"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, zip: e.target.value },
                }))
              }
              placeholder="Postal Code"
              required
            />
            <TextFieldInput
              value={userData.address.country}
              name="address.country"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, country: e.target.value },
                }))
              }
              placeholder="Country"
              required
            />
            {passwordError && <Text color="red">{passwordError}</Text>}

            <SubmitButton>Create Account</SubmitButton>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default SignUpForm;
