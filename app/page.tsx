import LogoutButton from "@/app/components/auth/Logout";
import { Box, Flex, Text } from "@radix-ui/themes";
import { cookies } from "next/headers";
import Link from "next/link";

export async function getData() {
  const response = await fetch("http://localhost:3001/api/session", {
    headers: {
      Cookie: cookies()
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; "),
    },
  });
  return await response.json();
}

export default async function Home() {
  const token = await getData();
  console.log("this is the token: ", token);
  const { user, address } = token;
  console.log("This is the user", user);

  return (
    <div className="w-full">
      <nav className="p-4 border-b border-gray-800 flex justify-end">
        {user ? (
          <>
            <LogoutButton id={user.id} />
            <span>Hello, {user.name}</span>
          </>
        ) : (
          <>
            <Link
              className="text-blue-500 hover:underline mr-4"
              href="/sign-up"
            >
              Sign Up
            </Link>
            <Link className="text-blue-500 hover:underline" href="/log-in">
              Log In
            </Link>
          </>
        )}
      </nav>

      {user ? (
        <Flex direction={"column"} justify={"center"} align={"center"}>
          <Box>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            {address && (
              <>
                <p>Address: {address.street}</p>
                <p>City: {address.city}</p>
                <p>State: {address.state}</p>
                <p>Zip: {address.zip}</p>
                <p>Country: {address.country}</p>
              </>
            )}
          </Box>
        </Flex>
      ) : (
        <Flex justify={"center"} align={"center"}>
          <Text>Please log in or sign up to see your profile.</Text>
        </Flex>
      )}
    </div>
  );
}
