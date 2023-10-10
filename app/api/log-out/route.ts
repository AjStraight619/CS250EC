import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(req: NextRequest) {
  const { id: userId } = JSON.parse(await req.text());

  const isUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const token = cookies().get("cookie-token")?.value;

  if (isUser) {
    await prisma.session.deleteMany({
      where: {
        userId: userId,
        token: token,
      },
    });
  } else {
    return NextResponse.json({ error: "User not found" });
  }

  const cookieHeader = cookies().delete("cookie-token");
  return NextResponse.json({
    message: "Successfully logged out, deleted cookie",
    cookieHeader: cookieHeader,
  });
}
