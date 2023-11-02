import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

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
    include: {
      address: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" });
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ error: "Invalid password" });
  } else {
    const userId = user?.id;
    const { name, email, address } = user;
    const token = uuidv4();

    cookies().set({
      name: "cookie-token",
      value: token,
      httpOnly: true,
      path: "/",
    });
    await prisma.session.create({
      data: {
        userId: userId,
        token: token,
      },
    });
    revalidatePath("/");
    return NextResponse.json({ name, email, address });
  }
}
