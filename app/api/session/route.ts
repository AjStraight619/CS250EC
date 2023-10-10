import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("in api route");
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
      user: true,
    },
  });

  if (!session || !session.user) {
    return NextResponse.json({ error: "Invalid token or user not found" });
  }

  // Exclude sensitive fields
  const { password, ...userWithoutPassword } = session.user;

  return NextResponse.json(userWithoutPassword);
}
