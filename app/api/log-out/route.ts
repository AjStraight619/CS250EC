import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.query);
  const { id } = req.query;
  const userId = id as string;

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
