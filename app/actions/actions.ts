"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function UserLogout(id: string) {
  try {
    const isUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (isUser) {
      await prisma.session.deleteMany({
        where: {
          userId: id,
        },
      });

      revalidatePath("/");

      return { message: "Successfully logged out, deleted cookie" };
    } else {
      return { error: "User not found" };
    }
  } catch (error) {
    console.error("Logout error:", error);
    return { error: "Internal server error" };
  }
}
