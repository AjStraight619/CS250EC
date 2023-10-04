import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  console.log("Received form data:", formData);
  const email = formData.get("email") as unknown as string;
  const password = formData.get("password") as unknown as string;
  const name = formData.get("name") as unknown as string;

  if (!email || !password) {
    return NextResponse.json({ error: "Invalid email or password" });
  }

  const isAlreadyUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!isAlreadyUser) {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
        name: name,
      },
    });

    // Generate a unique token for the session using uuidv4
    const token = uuidv4();

    cookies().set({
      name: "cookie-token",
      value: token,
      httpOnly: true,
      path: "/",
    });

    // Create a new session record in the database with the generated token
    await prisma.session.create({
      data: {
        userId: user.id,
        token: token,
      },
    });

    // Return the session token to the client
    return NextResponse.json({ user, token });
  } else {
    return NextResponse.json({ error: "User already exists" });
  }
}
