// Server Component (DELETE handler)
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  console.log(
    "In delete route. this is the userId from the header: ",
    req.url.split("/").pop()
  );

  try {
    const userId = req.url.split("/").pop();
    const token = cookies().get("cookie-token")?.value;

    const isUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (isUser) {
      await prisma.session.deleteMany({
        where: {
          userId: userId,
          token: token,
        },
      });

      const response = NextResponse.json({
        message: "Successfully logged out, deleted cookie",
      });

      // Delete the cookie
      response.headers.delete("cookie-token");
      return response;
    } else {
      return NextResponse.json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
