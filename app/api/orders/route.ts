import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const driverId = searchParams.get("driverId");

    const where: any = {};
    if (userId) where.userId = userId;
    if (status) where.status = status;
    if (driverId) where.driverId = driverId;

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: { include: { product: true } },
        address: true,
        driver: { include: { user: true } },
        payment: true,
        tracking: { orderBy: { createdAt: "asc" } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Orders error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, ...orderData } = body;

    const order = await prisma.order.create({
      data: {
        ...orderData,
        orderNumber: `PA-${Date.now().toString(36).toUpperCase()}`,
        items: {
          create: items,
        },
        tracking: {
          create: { status: "PENDING" },
        },
      },
      include: {
        items: { include: { product: true } },
        address: true,
      },
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status, driverId } = body;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (driverId) updateData.driverId = driverId;
    if (status === "DELIVERED") updateData.deliveredAt = new Date();

    const order = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });

    // Create tracking entry
    if (status) {
      await prisma.orderTracking.create({
        data: {
          orderId,
          status,
        },
      });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
