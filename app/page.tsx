import Link from "next/link";

import { cookies } from "next/headers";

async function getData() {
  const response = await fetch("http://localhost:3000/api/session", {
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
  console.log("Home");
  const token = await getData();
  const { name, email } = token;
  console.log("name: " + name);
  console.log("email: " + email);

  return (
    <div className="w-full">
      <nav className="p-4 border-b border-gray-800 flex justify-end">
        {token ? (
          <>
            <Link
              className="text-blue-500 hover:underline mr-4"
              href="/log-out"
            >
              Log Out
            </Link>
            <span>Hello, {name}</span>
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

      <div>
        <pre>{JSON.stringify({ name, email })}</pre>
        {/* Displaying name and value from the API response */}
      </div>
    </div>
  );
}
