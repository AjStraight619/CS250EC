import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = cookies();
  const token = cookie.get("cookie-token")?.value;

  if (!token) {
    return NextResponse.json({ error: "No token provided" });
  }

  const session = await prisma.session.findUnique({
    where: {
      token: token,
    },
    include: {
      user: {
        include: {
          address: true,
        },
      },
    },
  });

  if (!session || !session.user) {
    return NextResponse.json({ error: "Invalid token or user not found" });
  }

  const { password, ...userWithoutPassword } = session.user;

  // Create a structured object with user and address properties
  const resultObject = {
    user: userWithoutPassword,
    address: session.user.address,
  };

  revalidatePath("/");

  return NextResponse.json(resultObject); // Return the structured object
}
