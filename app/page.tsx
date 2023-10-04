import Link from "next/link";

export async function getUser() {
  console.log("Getting user...");
  const res = await fetch("http://localhost:3000/api/session", {
    method: "GET",
  });
  console.log("Here is the response", res);

  if (!res.ok) {
    console.error("Response not ok:", await res.text()); // Log the text if not ok
    throw new Error("Failed to fetch user data");
  }

  const data = await res.json();
  console.log("Fetched data:", data);

  return data;
}

export default async function Home() {
  console.log("Home");
  const { name, email } = await getUser();
  console.log("name: " + name);
  console.log("email: " + email);

  return (
    <div className="w-full">
      <nav className="p-4 border-b border-gray-800 flex justify-end">
        <Link className="text-blue-500 hover:underline" href="/sign-up">
          Sign Up
        </Link>
      </nav>

      <div>
        <pre>{JSON.stringify({ name, email })}</pre>
        {/* Displaying name and value from the API response */}
      </div>
    </div>
  );
}
