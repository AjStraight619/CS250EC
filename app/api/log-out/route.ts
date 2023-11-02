import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  console.log("these are the headers", req.headers);
  const userId = req.url.split("/").pop();

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
