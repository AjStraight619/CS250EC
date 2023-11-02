import { prisma } from "@/lib/prisma";
import { UserInfo } from "@/types/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const street = formData.get("address.street") as string;
  const city = formData.get("address.city") as string;
  const state = formData.get("address.state") as string;
  const zip = formData.get("address.zip") as string;
  const country = formData.get("address.country") as string;
  const address = {
    street: street,
    city: city,
    state: state,
    zip: zip,
    country: country,
  } as UserInfo["address"];

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
        address: {
          create: address,
        },
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
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        token: token,
      },
    });

    // Return the session token to the client
    return NextResponse.json({ user, token, session });
  } else {
    return NextResponse.json({ error: "User already exists" });
  }
}
