import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = formData.get("email") as unknown as string;

  if (!email) {
    return NextResponse.json({ error: "Invalid email" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return NextResponse.json({ user });
}
