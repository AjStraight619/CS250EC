import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  console.log("In Get request");
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
  console.log(userWithoutPassword);

  return NextResponse.json(userWithoutPassword);
}
