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
  const token = await getData();
  const { name, email, id } = token;

  return (
    <div className="w-full">
      <nav className="p-4 border-b border-gray-800 flex justify-end">
        {token && token.name ? (
          <>
            <Link
              className="text-blue-500 hover:underline mr-4"
              href={`/log-out/${id}`}
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

      {token && token.name ? (
        <div>
          <pre>{JSON.stringify({ name, email })}</pre>
        </div>
      ) : (
        <div>
          <p>
            You are seeing this because you are not logged in. When you log in,
            you will see your name and email address here.
          </p>
        </div>
      )}
    </div>
  );
}
