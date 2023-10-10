import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = formData.get("email") as unknown as string;
  const password = formData.get("password") as unknown as string;

  if (!email || !password) {
    return NextResponse.json({ error: "Invalid email or password" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    const { name, email, id } = user;

    return NextResponse.json({ user });
  } else {
    return NextResponse.json({ error: "User not found" });
  }
}
