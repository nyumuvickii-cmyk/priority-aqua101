import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db/prisma";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case "register":
        return handleRegister(data);
      case "login":
        return handleLogin(data);
      case "verify-phone":
        return handleVerifyPhone(data);
      case "forgot-password":
        return handleForgotPassword(data);
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function handleRegister(data: any) {
  const { name, phone, email, password, role = "CUSTOMER" } = data;

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ phone }, { email }] },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "User with this phone or email already exists" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      phone,
      email,
      password: hashedPassword,
      role,
      status: "ACTIVE",
    },
  });

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return NextResponse.json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
    },
  });
}

async function handleLogin(data: any) {
  const { phone, email, password } = data;

  const user = await prisma.user.findFirst({
    where: { OR: [{ phone }, { email }] },
  });

  if (!user || !user.password) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return NextResponse.json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
    },
  });
}

async function handleVerifyPhone(data: any) {
  // Simulate OTP verification
  const { phone, otp } = data;

  // In production, verify against stored OTP
  if (otp === "123456") {
    return NextResponse.json({ success: true, verified: true });
  }

  return NextResponse.json(
    { error: "Invalid OTP" },
    { status: 400 }
  );
}

async function handleForgotPassword(data: any) {
  const { phone } = data;

  const user = await prisma.user.findUnique({ where: { phone } });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  // In production, send OTP to phone
  return NextResponse.json({
    success: true,
    message: "Password reset OTP sent to your phone",
  });
}
